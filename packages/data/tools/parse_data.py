import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT
ARC_MD = DATA_DIR / "archetypes.md"
Q_MD = DATA_DIR / "questions.md"
ARC_JSON = DATA_DIR / "archetypes.json"
Q_JSON = DATA_DIR / "questions.json"


def strip_line_prefixes(s: str) -> str:
    # Remove leading line-number and pipe prefixes like "123|" or "123||"
    return re.sub(r"^\s*\d+\|+\s?", "", s, flags=re.MULTILINE)


def parse_archetypes_md(md: str):
    md = strip_line_prefixes(md)
    lines = [ln.strip() for ln in md.splitlines()]
    table_rows = []
    in_table = False
    for ln in lines:
        if ln.startswith("| Letter ") or ln.startswith("Letter |"):
            in_table = True
            continue
        if in_table:
            if not ln or ln.startswith("|") and set(ln.replace("|", "").strip()) == set("-"):
                # separator row
                continue
            if ln.startswith("|"):
                parts = [p.strip() for p in ln.strip().strip('|').split('|')]
                # Expect Letter | Full Name | Flavor Notes
                if len(parts) >= 3 and len(parts[0]) <= 2:
                    letter = parts[0]
                    name = parts[1]
                    notes = parts[2]
                    table_rows.append({"letter": letter, "name": name, "notes": notes})
                else:
                    # end of this table
                    if table_rows:
                        break
            else:
                # not a table row
                if table_rows:
                    break
    return {"archetypes": table_rows}


def extract_json_blocks(text: str):
    # Remove line-number prefixes and code fences
    text = strip_line_prefixes(text)
    text = re.sub(r"```+json?|```", "", text)
    # Find all occurrences of JSON-like blocks that contain \"questions\"
    blocks = []
    # Strategy: find indices where '"questions"' appears, then expand to matching braces
    for m in re.finditer(r"\"questions\"\s*:\s*\[", text):
        start = text.rfind('{', 0, m.start())
        if start == -1:
            continue
        # balance braces from start
        depth = 0
        end = None
        for i in range(start, len(text)):
            ch = text[i]
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        if end is not None:
            candidate = text[start:end]
            blocks.append(candidate)
    return blocks


def merge_questions(blocks):
    by_id = {}
    for raw in blocks:
        try:
            obj = json.loads(raw)
        except json.JSONDecodeError:
            # Try to fix trailing commas or comments
            cleaned = re.sub(r"//.*", "", raw)
            cleaned = re.sub(r",\s*([}\]])", r"\1", cleaned)
            try:
                obj = json.loads(cleaned)
            except Exception:
                continue
        if not isinstance(obj, dict) or "questions" not in obj or not isinstance(obj["questions"], list):
            continue
        for q in obj["questions"]:
            try:
                qid = int(q["id"])  # ensure int
            except Exception:
                continue
            by_id[qid] = q  # last one wins on duplicates
    # Return questions sorted by id
    questions = [by_id[k] for k in sorted(by_id.keys())]
    return {"questions": questions}


def main():
    if ARC_MD.exists():
        arc = parse_archetypes_md(ARC_MD.read_text(encoding='utf-8'))
        ARC_JSON.write_text(json.dumps(arc, ensure_ascii=False, indent=2), encoding='utf-8')
        print(f"Wrote {ARC_JSON}")
    else:
        print("archetypes.md not found; skipping")

    if Q_MD.exists():
        blocks = extract_json_blocks(Q_MD.read_text(encoding='utf-8'))
        merged = merge_questions(blocks)
        Q_JSON.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding='utf-8')
        print(f"Wrote {Q_JSON} with {len(merged.get('questions', []))} questions")
    else:
        print("questions.md not found; skipping")


if __name__ == "__main__":
    main()
