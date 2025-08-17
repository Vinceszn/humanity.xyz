import json
from pathlib import Path
import sys

# Resolve repo root and ensure apps/api and packages/core are importable
ROOT = Path(__file__).resolve().parents[2]
APPS_DIR = (ROOT / "apps").resolve()
CORE_DIR = (ROOT / "packages" / "core").resolve()
for p in (APPS_DIR, CORE_DIR):
    if str(p) not in sys.path:
        sys.path.append(str(p))

from api.main import app  # type: ignore

schema = app.openapi()
out_path = Path(__file__).resolve().parent / "openapi.json"
out_path.write_text(json.dumps(schema, indent=2), encoding="utf-8")
print(f"Wrote {out_path}")

