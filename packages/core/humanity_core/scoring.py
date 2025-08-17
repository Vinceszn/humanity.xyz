from typing import Dict, List, Any, Tuple

ArchetypeId = str
AnswerMap = Dict[int, str]  # question id -> option key


def score_quiz(questions: List[Dict[str, Any]], answers: AnswerMap) -> Dict[ArchetypeId, float]:
    scores: Dict[ArchetypeId, float] = {}
    for q in questions:
        qid = int(q.get("id"))
        chosen = answers.get(qid)
        if not chosen:
            continue
        # find option
        opts = q.get("options", [])
        opt = next((o for o in opts if str(o.get("key")) == str(chosen)), None)
        if not opt:
            continue
        vector = opt.get("vector", {})
        for arch, weight in vector.items():
            scores[arch] = scores.get(arch, 0.0) + float(weight)
    return scores


def normalize_scores(raw: Dict[ArchetypeId, float]) -> Dict[ArchetypeId, float]:
    if not raw:
        return {}
    vals = list(raw.values())
    mx = max(vals)
    mn = min(vals)
    if mx == mn:
        # All same; map to 50
        return {k: 50.0 for k in raw}
    return {k: (v - mn) / (mx - mn) * 100.0 for k, v in raw.items()}


def rank_archetypes(norm: Dict[ArchetypeId, float]) -> List[Tuple[ArchetypeId, float]]:
    return sorted(norm.items(), key=lambda kv: (-kv[1], kv[0]))
