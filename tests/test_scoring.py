import os
import sys
import unittest

# Ensure the core package is importable when running tests from repo root
ROOT = os.path.dirname(os.path.abspath(__file__))
CORE_PATH = os.path.join(os.path.dirname(ROOT), "packages", "core")
if CORE_PATH not in sys.path:
    sys.path.insert(0, CORE_PATH)

from humanity_core import score_quiz, normalize_scores, rank_archetypes
from humanity_core.report import build_markdown_report


class TestHumanityCore(unittest.TestCase):
    def setUp(self):
        # Minimal question data with vectors toward archetypes A and B
        self.questions = [
            {
                "id": 1,
                "text": "You prefer to work...",
                "options": [
                    {"key": "a", "text": "Alone", "vector": {"A": 2.0}},
                    {"key": "b", "text": "In teams", "vector": {"B": 1.5}},
                ],
            },
            {
                "id": 2,
                "text": "When making decisions...",
                "options": [
                    {"key": "a", "text": "Analytical", "vector": {"A": 1.0}},
                    {"key": "b", "text": "Intuitive", "vector": {"B": 2.0}},
                ],
            },
        ]
        self.answers_a = {1: "a", 2: "a"}  # favors A overall
        self.answers_mixed = {1: "a", 2: "b"}  # mixed A/B

    def test_score_and_rank(self):
        raw = score_quiz(self.questions, self.answers_mixed)
        # Expect A: 2.0 (from Q1) + 0 (Q2 picked b), B: 0 (Q1) + 2.0 (Q2)
        self.assertAlmostEqual(raw.get("A", 0.0), 2.0, places=6)
        self.assertAlmostEqual(raw.get("B", 0.0), 2.0, places=6)

        norm = normalize_scores(raw)
        # When both equal, normalize_scores maps to 50 for all
        self.assertEqual(norm.get("A"), 50.0)
        self.assertEqual(norm.get("B"), 50.0)

        ranked = rank_archetypes(norm)
        # When equal, secondary sort by key asc => A before B
        self.assertEqual(ranked[0][0], "A")
        self.assertEqual(ranked[1][0], "B")

    def test_report_generation(self):
        # Build ranked scores for a deterministic report
        raw = score_quiz(self.questions, self.answers_a)  # A should be higher
        norm = normalize_scores(raw)
        ranked = rank_archetypes(norm)

        archetypes = [
            {"letter": "A", "name": "Analyst", "notes": "Thinks systematically."},
            {"letter": "B", "name": "Balancer", "notes": "Harmonizes teams."},
        ]
        md = build_markdown_report(
            ranked=ranked,
            archetypes=archetypes,
            answers=self.answers_a,
            questions=self.questions,
        )
        self.assertIn("# HUMANITY Archetype Report", md)
        self.assertIn("## Top 3 Archetypes", md)
        self.assertIn("## Full Ranking", md)
        self.assertIn("## Your Answers", md)
        # Ensure chosen answers are summarized
        self.assertIn("Q1", md)
        self.assertIn("Chosen a", md)


if __name__ == "__main__":
    unittest.main()
