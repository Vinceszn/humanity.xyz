"""
Entrypoint that exposes the core FastAPI app for deployment.

Usage with Uvicorn:
  uvicorn apps.api.core_main:app --host 0.0.0.0 --port $PORT
"""
from pathlib import Path
import sys

# Ensure packages/core is importable
ROOT = Path(__file__).resolve().parents[2]
CORE_PATH = (ROOT / "packages" / "core").resolve()
if str(CORE_PATH) not in sys.path:
    sys.path.append(str(CORE_PATH))

from humanity_core.api import app  # noqa: E402
