import os
import sys
import unittest
import json
from pathlib import Path

# Ensure the core package is importable
ROOT = Path(__file__).resolve().parents[1]
CORE_PATH = (ROOT / "packages" / "core").resolve()
if str(CORE_PATH) not in sys.path:
    sys.path.append(str(CORE_PATH))

# Add path to humanity_core package
CORE_PATH = (ROOT / "packages" / "core" / "humanity_core").resolve()
if str(CORE_PATH) not in sys.path:
    sys.path.append(str(CORE_PATH))

from humanity_core.report import build_markdown_report

class TestProfiles(unittest.TestCase):
    def setUp(self):
        # Define test archetypes
        self.archetypes = [
            {"letter": "A", "name": "Analyst", "notes": "Thinks systematically"},
            {"letter": "T", "name": "Teacher", "notes": "Shares knowledge"},
            {"letter": "B", "name": "Builder", "notes": "Creates solutions"},
            {"letter": "L", "name": "Leader", "notes": "Guides teams"}
        ]
        
        # Create test double/triple lookups
        self.doubles_lookup = {
            ('A', 'T'): {
                'Profile Name': 'Analytical Teacher',
                'Class': 'Educator',
                'Double (Archetypes)': 'AT - Analytical Teacher'
            }
        }
        
        self.triples_lookup = {
            ('A', 'B', 'T'): {
                'Profile Name': 'Technical Leader',
                'Class': 'Builder',
                'Triple (Archetypes)': 'ABT - Technical Leader'
            }
        }
        
        # Sample rankings that should form known doubles/triples
        self.sample_triple = [
            ("A", 95.0),  # Analyst
            ("T", 85.0),  # Teacher
            ("B", 80.0),  # Builder
            ("L", 40.0),  # Leader
        ]
        
        self.sample_double = [
            ("A", 90.0),  # Analyst
            ("T", 85.0),  # Teacher
            ("L", 45.0),  # Leader
            ("B", 40.0),  # Builder
        ]

    def test_top3_profile_generation(self):
        """Test that top 3 profiles are correctly identified and included in report"""
        lines = build_markdown_report(
            ranked=self.sample_triple,
            archetypes=self.archetypes,
            answers={},  # Empty answers for this test
            questions=[],  # Empty questions for this test
            triples_lookup=self.triples_lookup
        ).split("\n")
        
        # Find the Top 3 Profile section
        top3_section = []
        in_section = False
        for line in lines:
            if line.startswith("## Top 3 Profile"):
                in_section = True
            elif in_section and line.startswith("##"):
                break
            elif in_section:
                top3_section.append(line)
                
        # Verify top 3 section content
        section_text = "\n".join(top3_section)
        self.assertIn("Technical Leader", section_text)
        self.assertIn("Builder", section_text)
        self.assertIn("ABT", section_text)

    def test_top2_profile_generation(self):
        """Test that top 2 profiles are correctly identified and included in report"""
        lines = build_markdown_report(
            ranked=self.sample_double,
            archetypes=self.archetypes,
            answers={},  # Empty answers for this test
            questions=[],  # Empty questions for this test
            doubles_lookup=self.doubles_lookup
        ).split("\n")
        
        # Find the Top 2 Profile section
        top2_section = []
        in_section = False
        for line in lines:
            if line.startswith("## Top 2 Profile"):
                in_section = True
            elif in_section and line.startswith("##"):
                break
            elif in_section:
                top2_section.append(line)
                
        # Verify top 2 section content
        section_text = "\n".join(top2_section)
        self.assertIn("Analytical Teacher", section_text)
        self.assertIn("Educator", section_text)
        self.assertIn("AT", section_text)

    def test_profile_class_assignment(self):
        """Test that profile classes are correctly assigned based on archetype combinations"""
        report = build_markdown_report(
            ranked=self.sample_triple,
            archetypes=self.archetypes,
            answers={},
            questions=[],
            doubles_lookup=self.doubles_lookup,
            triples_lookup=self.triples_lookup
        )
        
        # Both profiles should be included when requested
        self.assertIn("## Top 3 Profile", report)
        self.assertIn("## Top 2 Profile", report)
        
        # Verify class assignments are included
        self.assertIn("Class:", report)
        
        # Count profile sections
        profile_sections = report.count("Profile:")
        self.assertEqual(profile_sections, 2, "Should have both Top 2 and Top 3 profile sections")

if __name__ == "__main__":
    unittest.main()
