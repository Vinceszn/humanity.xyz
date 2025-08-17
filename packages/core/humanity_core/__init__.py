from .scoring import score_quiz, normalize_scores, rank_archetypes
from .report import build_markdown_report
from .api import app  # expose FastAPI app for `uvicorn humanity_core:app`

__all__ = [
    "score_quiz",
    "normalize_scores",
    "rank_archetypes",
    "build_markdown_report",
    "app",
]
