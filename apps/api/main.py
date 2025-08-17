from typing import Dict, List, Tuple, Optional
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import sys

# Ensure core package is importable
ROOT = Path(__file__).resolve().parents[2]
CORE_PATH = (ROOT / "packages" / "core").resolve()
if str(CORE_PATH) not in sys.path:
    sys.path.append(str(CORE_PATH))

from humanity_core import score_quiz, normalize_scores, rank_archetypes, build_markdown_report  # type: ignore

DATA_DIR = (ROOT / "packages" / "data").resolve()

app = FastAPI(title="HUMANITY API", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost",
        "http://127.0.0.1",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScoreRequest(BaseModel):
    answers: Dict[int, str] | Dict[str, str]


class RankedItem(BaseModel):
    archetype: str
    letter: str
    score: float
    description: str


class ScoreResponse(BaseModel):
    ranked: List[RankedItem]
    scores: Dict[str, float]
    top2_profile: Optional[Dict[str, str]] = None
    top3_profile: Optional[Dict[str, str]] = None


class ReportRequest(ScoreRequest):
    title: Optional[str] = None


class ReportResponse(BaseModel):
    markdown: str


def _load_json(p: Path):
    if not p.exists():
        raise HTTPException(status_code=500, detail=f"Missing data file: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


def _parse_md_table(md_path: Path) -> List[Dict[str, str]]:
    if not md_path.exists():
        return []
    rows: List[Dict[str, str]] = []
    lines = md_path.read_text(encoding="utf-8").splitlines()
    headers: List[str] = []
    for line in lines:
        line = line.strip()
        if not line.startswith("|"):
            continue
        parts = [p.strip() for p in line.strip("|").split("|")]
        if not headers:
            headers = parts
            continue
        if set(parts) == {"--"} or parts[0] in ("--", "---"):
            # separator row
            continue
        if len(parts) != len(headers):
            # Skip malformed
            continue
        row = {headers[i]: parts[i] for i in range(len(headers))}
        if headers[0].lower() in ("id",):
            if row[headers[0]].lower() in ("id", "--", "---"):
                continue
        rows.append(row)
    return rows


def _triples_lookup() -> Dict[Tuple[str, str, str], Dict[str, str]]:
    rows = _parse_md_table(DATA_DIR / "triples.md")
    name_to_letter = {
        "Visionary": "V",
        "Dreamer": "I",
        "Architect": "E",
        "Catalyst": "P",
        "Realist": "C",
        "Maverick": "R",
        "Connector": "S",
        "Sage": "M",
        "Builder": "L",
        "Harmonizer": "A",
    }
    out: Dict[Tuple[str, str, str], Dict[str, str]] = {}
    for r in rows:
        triple_txt = r.get("Triple (Archetypes)") or r.get("(Archetypes)")
        if not triple_txt:
            continue
        names = [n.strip() for n in triple_txt.split("+")]
        letters: List[str] = []
        valid = True
        for n in names:
            if n not in name_to_letter:
                valid = False
                break
            letters.append(name_to_letter[n])
        if not valid or len(letters) != 3:
            continue
        key = tuple(sorted(letters))  # type: ignore[assignment]
        out[key] = r
    return out


def _doubles_lookup() -> Dict[Tuple[str, str], Dict[str, str]]:
    rows = _parse_md_table(DATA_DIR / "doubles.md")
    name_to_letter = {
        "Visionary": "V",
        "Dreamer": "I",
        "Architect": "E",
        "Catalyst": "P",
        "Realist": "C",
        "Maverick": "R",
        "Connector": "S",
        "Sage": "M",
        "Builder": "L",
        "Harmonizer": "A",
    }
    out: Dict[Tuple[str, str], Dict[str, str]] = {}
    for r in rows:
        pair_txt = r.get("(Archetypes)")
        if not pair_txt:
            continue
        names = [n.strip() for n in pair_txt.split("+")]
        letters: List[str] = []
        valid = True
        for n in names:
            if n not in name_to_letter:
                valid = False
                break
            letters.append(name_to_letter[n])
        if not valid or len(letters) != 2:
            continue
        key = tuple(sorted(letters))  # type: ignore[assignment]
        out[key] = r
    return out


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/data/questions")
def get_questions():
    return _load_json(DATA_DIR / "questions.json")


@app.get("/data/archetypes")
def get_archetypes():
    return _load_json(DATA_DIR / "archetypes.json")


@app.get("/data/doubles")
def get_doubles():
    rows = _parse_md_table(DATA_DIR / "doubles.md")
    return {"doubles": rows}


@app.get("/data/triples")
def get_triples():
    rows = _parse_md_table(DATA_DIR / "triples.md")
    return {"triples": rows}


@app.post("/score", response_model=ScoreResponse)
def post_score(req: ScoreRequest):
    # Normalize answers dict keys to int ids and option keys to uppercase
    answers_any = req.answers
    answers: Dict[int, str] = {}
    for k, v in answers_any.items():  # type: ignore[attr-defined]
        try:
            qid = int(k)
        except Exception:
            raise HTTPException(status_code=400, detail=f"Invalid question id: {k}")
        answers[qid] = str(v).upper()

    questions = get_questions()["questions"]
    archetypes = get_archetypes()["archetypes"]
    arc_by_letter = {a.get("letter"): a for a in archetypes}

    raw = score_quiz(questions, answers)
    norm = normalize_scores(raw)
    ranked = rank_archetypes(norm)

    triples = _triples_lookup()
    doubles = _doubles_lookup()

    # Top 3 (normalize fields for UI)
    top3_profile: Optional[Dict[str, str]] = None
    if len(ranked) >= 3:
        key3 = tuple(sorted([ranked[0][0], ranked[1][0], ranked[2][0]]))  # type: ignore[assignment]
        row3 = triples.get(key3)
        if row3:
            top3_profile = {
                "profile": row3.get("Profile Name", ""),
                "class": row3.get("Class", ""),
                "triple": row3.get("Triple (Archetypes)") or row3.get("(Archetypes)") or "",
            }

    # Top 2 (normalize fields for UI)
    top2_profile: Optional[Dict[str, str]] = None
    if len(ranked) >= 2:
        key2 = tuple(sorted([ranked[0][0], ranked[1][0]]))  # type: ignore[assignment]
        row2 = doubles.get(key2)
        if row2:
            top2_profile = {
                "profile": row2.get("Profile Name", ""),
                "class": row2.get("Class", ""),
                "pair": row2.get("Double (Archetypes)") or row2.get("(Archetypes)") or "",
            }
    # Enrich ranked for UI: include name/description
    enriched_ranked: List[Dict[str, object]] = []
    for letter, score in ranked:
        a = arc_by_letter.get(letter, {})
        enriched_ranked.append({
            "archetype": a.get("name", letter),
            "letter": letter,
            "score": float(score),
            "description": a.get("notes", ""),
        })

    return {
        "ranked": enriched_ranked,
        "scores": norm,
        "top2_profile": top2_profile,
        "top3_profile": top3_profile,
    }


@app.post("/report", response_model=ReportResponse)
def post_report(req: ReportRequest):
    answers_any = req.answers
    answers: Dict[int, str] = {int(k): str(v).upper() for k, v in answers_any.items()}

    questions = get_questions()["questions"]
    archetypes = get_archetypes()["archetypes"]

    triples = _triples_lookup()
    doubles = _doubles_lookup()

    raw = score_quiz(questions, answers)
    norm = normalize_scores(raw)
    ranked = rank_archetypes(norm)

    md = build_markdown_report(
        ranked,
        archetypes,
        answers,
        questions,
        title=req.title or "HUMANITY Archetype Report",
        triples_lookup=triples,
        doubles_lookup=doubles,
    )
    return {"markdown": md}
