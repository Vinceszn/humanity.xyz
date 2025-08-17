from typing import Dict, List, Any, Tuple, Optional
from datetime import datetime, UTC


def format_top3_profile(
    ranked: List[Tuple[str, float]],
    archetypes: List[Dict[str, str]],
    triples_lookup: Optional[Dict[Tuple[str, str, str], Dict[str, str]]] = None,
) -> List[str]:
    lines: List[str] = []
    if not ranked:
        return lines
    if triples_lookup is None:
        return lines
    # Identify top 3 letters (by score order)
    top3 = tuple(letter for letter, _ in ranked[:3])
    if len(top3) < 3:
        return lines
    key = tuple(sorted(top3))  # normalize order for lookup
    triple = triples_lookup.get(key)
    if not triple:
        return lines
    lines.append("## Top 3 Profile")
    lines.append("")
    lines.append(f"- Profile: {triple.get('Profile Name')}")
    lines.append(f"- Class: {triple.get('Class')}")
    # Fallback label keys in either triples or doubles tables
    triple_label = triple.get('Triple (Archetypes)') or triple.get('(Archetypes)')
    if triple_label:
        lines.append(f"- Triple: {triple_label}")
    lines.append("")
    return lines


def format_top2_profile(
    ranked: List[Tuple[str, float]],
    doubles_lookup: Optional[Dict[Tuple[str, str], Dict[str, str]]] = None,
) -> List[str]:
    lines: List[str] = []
    if not ranked or doubles_lookup is None:
        return lines
    top2 = tuple(letter for letter, _ in ranked[:2])
    if len(top2) < 2:
        return lines
    key = tuple(sorted(top2))
    double = doubles_lookup.get(key)
    if not double:
        return lines
    lines.append("## Top 2 Profile")
    lines.append("")
    lines.append(f"- Profile: {double.get('Profile Name')}")
    lines.append(f"- Class: {double.get('Class')}")
    # Fallback label keys as used in doubles tables
    pair_label = double.get('Double (Archetypes)') or double.get('(Archetypes)')
    if pair_label:
        lines.append(f"- Pair: {pair_label}")
    lines.append("")
    return lines


def build_markdown_report(
    ranked: List[Tuple[str, float]],
    archetypes: List[Dict[str, str]],
    answers: Dict[int, str],
    questions: List[Dict[str, Any]],
    title: str = "HUMANITY Archetype Report",
    triples_lookup: Optional[Dict[Tuple[str, str, str], Dict[str, str]]] = None,
    doubles_lookup: Optional[Dict[Tuple[str, str], Dict[str, str]]] = None,
) -> str:
    arc_by_letter = {a["letter"]: a for a in archetypes}
    lines: List[str] = []
    lines.append(f"# {title}")
    lines.append("")
    lines.append(f"Generated: {datetime.now(UTC).isoformat()}")
    lines.append("")

    # Top 3
    lines.append("## Top 3 Archetypes")
    lines.append("")
    for i, (letter, score) in enumerate(ranked[:3], start=1):
        a = arc_by_letter.get(letter, {"name": letter, "notes": ""})
        lines.append(f"{i}. {a.get('name', letter)} ({letter}) — {score:.1f}")
        notes = a.get("notes")
        if notes:
            lines.append(f"   - {notes}")
    lines.append("")

    # Optional: Top 3 Profile section from triples
    lines.extend(format_top3_profile(ranked, archetypes, triples_lookup))

    # Optional: Top 2 Profile section from doubles
    lines.extend(format_top2_profile(ranked, doubles_lookup))

    # Full ranking
    lines.append("## Full Ranking")
    lines.append("")
    lines.append("| Rank | Archetype | Letter | Score |")
    lines.append("| ---: | :-- | :--: | ---: |")
    for i, (letter, score) in enumerate(ranked, start=1):
        a = arc_by_letter.get(letter, {"name": letter})
        lines.append(f"| {i} | {a.get('name', letter)} | {letter} | {score:.1f} |")
    lines.append("")

    # Answers summary
    lines.append("## Your Answers")
    lines.append("")
    q_by_id = {int(q["id"]): q for q in questions}
    for qid in sorted(answers.keys()):
        q = q_by_id.get(qid)
        if not q:
            continue
        key = answers[qid]
        opt = next((o for o in q.get("options", []) if str(o.get("key")) == str(key)), None)
        text = opt.get("text") if opt else "(unknown option)"
        lines.append(f"- Q{qid}: {q.get('text')}\n  - Chosen {key}: {text}")

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("This report is for personal insight and reflection.")

    return "\n".join(lines)
