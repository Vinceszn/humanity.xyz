# HUMANITY Architecture Overview

## Storage Abstraction

The application now uses a clean storage abstraction layer that allows seamless switching between SQLite and Redis backends.

### Key Components

#### StorageBackend Interface (`packages/core/humanity_core/storage.py`)

- **Purpose**: Defines common interface for all storage operations
- **Implementations**:
  - `SQLiteStorage`: Uses SQLite database with tables for sessions, results, submits
  - `RedisStorage`: Uses Redis with hash keys and TTL for session/result management
- **Runtime Selection**: Automatically selects Redis if available, falls back to SQLite

#### API Layer (`packages/core/humanity_core/api.py`)

- **Refactored**: Removed inline Redis/SQLite branching
- **Clean Separation**: All storage operations go through the `StorageBackend` interface
- **Maintains**: All existing security features (HMAC signing, rate limiting, anomaly detection)

### Benefits

1. **Maintainability**: Single code path for storage operations
2. **Testability**: Easy to mock storage layer for unit tests
3. **Flexibility**: Can add new storage backends (PostgreSQL, etc.) without API changes
4. **Performance**: Redis backend provides better scalability when available

## Test Coverage

### API Flow Tests (`tests/test_api_flow.py`)

- **Full Quiz Flow**: Complete start → submit → retrieve cycle
- **Security**: Invalid token handling and double submission protection
- **Rate Limiting**: Session cooldown and submission rate limit validation
- **Anomaly Detection**: Ultra-fast submission flagging
- **Edge Cases**: Session expiry and invalid session handling

### Existing Tests

- **Scoring Logic**: Core archetype scoring and ranking algorithms
- **Profile Generation**: Top2/Top3 profile creation logic
- **Report Generation**: Markdown report formatting

## Security Features

### Anti-Gaming Measures

- **Session-based Flow**: Server-authoritative quiz sessions with HMAC-signed results
- **Rate Limiting**: Per-IP cooldowns for session creation and submission limits
- **Timing Anomalies**: Detection of ultra-fast or uniform timing patterns
- **Double Submit Protection**: Prevents multiple submissions per session

#### Threat Model

We assume motivated users may attempt to: (1) mass-generate sessions to brute-force scoring combinations, (2) tamper with client-side payloads to fabricate answers or scores, (3) replay or mutate signed result objects, (4) script submissions at inhuman speeds, (5) probe storage backend differences (Redis vs SQLite) for inconsistent enforcement, and (6) enumerate archetype weightings indirectly via timing/response differentials.

Out of scope (for now): distributed botnets with large IP diversity, targeted key exfiltration, and advanced ML-based answer synthesis to mimic organic timing.

#### Attack Vectors & Mitigations

- Payload Manipulation → All result payloads re-derived server-side; client-submitted scores ignored.
- Replay / Forgery → Each session has a nonce + server-side stored canonical question order; HMAC signature binds (session_id, ordered_questions_hash, answers, issued_at).
- Session Spamming → IP rate limits (configurable thresholds) + exponential backoff after threshold breach.
- Automated Speed Runs → Minimum total quiz duration + per-question median deviation checks; flags stored with result.
- Uniform Pattern Gaming → Detects near-zero variance in per-question timing deltas; raises anomaly flag.
- Double Submission → Storage layer marks session terminal state atomically; second write rejected.
- Backend Divergence → Shared `StorageBackend` contract enforces identical logic paths independent of implementation.

#### Timing & Behavioral Anomaly Heuristics (Current)

Collected per question: `start_ts`, `end_ts`, derived `delta_ms`.

Heuristics applied on submit:

1. Total Duration < MIN_TOTAL_MS → flag `too_fast_total`.
2. Mean Delta < MIN_MEAN_DELTA_MS → flag `too_fast_mean`.
3. Std Dev Delta < MIN_STDDEV_MS (overly uniform) → flag `uniform_pattern`.
4. Any Delta < ABS_MIN_QUESTION_MS → increments hard breach counter.
5. Hard Breach Counter > threshold → escalate severity.

Flags are additive; downstream scoring remains unchanged but result metadata includes `anomalies: [...]` enabling later review or exclusion.

#### HMAC Signing Flow

1. Client requests session → server generates `session_id`, randomized question order, stores canonical order.
2. Client submits answers → server validates all IDs + order + completeness.
3. Server computes raw scores, archetype rankings.
4. Server produces canonical JSON result object (stable key ordering) and timestamps it.
5. Server computes `signature = HMAC_SHA256(secret, canonical_json_string)`.
6. Response returns `{ result, signature }` to client; stored server-side for later verification.

Signature invalidation occurs implicitly if any component (answers, order, timestamp) is altered—verification recomputes and compares constant‑time.

#### Rate Limiting Implementation

- Key Dimensions: `ip_address`, `session_create_window`, `submission_window`.
- Counters maintained in selected backend (Redis preferred with TTL; SQLite fallback uses upsert + timestamp pruning).
- Algorithm: Fixed window with optional soft limit → on soft limit exceed, adds cool-off delay before new session issuance; hard limit returns HTTP 429.
- Configuration: All thresholds pulled from environment variables with documented defaults (`HUMANITY_SESSION_RATE_LIMIT`, etc.).
- Observability: TODO—expose counters via metrics endpoint (see Next Steps: Metrics & Observability).

#### Storage Consistency Guarantees

Atomicity of state transitions (e.g., marking a session submitted) is enforced via:

- Redis: `SETNX`-style operations or Lua script wrapping multi-key updates (future enhancement).
- SQLite: Single transaction updating session row + inserting result.

This prevents race conditions where near-simultaneous submissions could both appear valid.

#### Extensibility Points

- Add ML anomaly detection: plug module at post-submit stage reading timing vector + answer entropy.
- Introduce adaptive limits: dynamic thresholds based on rolling IP / ASN behavior.
- Add replay cache: short-term Redis set of recent signatures to detect identical payload replays.

#### Planned Enhancements vs Current State

| Area | Current | Planned |
|------|---------|---------|
| Anomaly Detection | Rule heuristics | Statistical + ML model (isolation forest / z-score ensembles) |
| Rate Limiting | Fixed window | Sliding window / token bucket hybrid |
| Signature Scheme | Single secret HMAC | Dual secret rotation + versioned key IDs |
| Replay Defense | Implicit via session finality | Explicit replay nonce store |
| Metrics | Not yet exposed | Prometheus counters & anomaly gauge |

#### Operational Runbook (Draft)

- On spike of `too_fast_total` flags: verify no frontend regression causing mis-timed events.
- On elevated 429 responses: inspect environment rate limits vs organic traffic growth.
- On suspected key leak: rotate signing secret, invalidate prior sessions (toggle env + restart), add key ID versioning (future feature).

#### Testing Mapping (Traceability)

| Risk | Test Coverage |
|------|---------------|
| Double submit | `tests/test_api_flow.py::test_double_submission` (assumed) |
| Tampered answers | Session validation path in API flow test |
| Fast timing | Anomaly flag assertions (add if missing) |
| Rate limit | Start session repeatedly until threshold (present) |

Gaps to add: explicit uniform timing variance test; signature replay attempt test.

#### Future Documentation Hooks

When adding PostgreSQL backend: document transaction isolation choice (likely READ COMMITTED) and advisory locks for session finalization.

---

### Data Integrity

- **HMAC Signatures**: All results cryptographically signed with server secret
- **Session Validation**: Questions must match session order, all answers validated
- **Cleanup Jobs**: Automatic removal of expired sessions and old results

## Deployment Ready

- **Environment Configuration**: `.env.example` template with all required variables
- **Readiness Endpoint**: `/readiness` checks DB connectivity and configuration
- **Secret Enforcement**: Prevents deployment with default signing secrets
- **Optional Redis**: Graceful fallback to SQLite when Redis unavailable
- **Clean Repository**: No sensitive data or large binaries committed

## Next Steps

1. **Advanced Anomaly Detection**: Machine learning models for sophisticated gaming detection
2. **Metrics & Observability**: Prometheus metrics and structured logging
3. **Admin Dashboard**: Real-time monitoring of submissions and anomalies
4. **Secret Rotation**: Dual-key support for zero-downtime secret updates
5. **Database Migrations**: Versioned schema changes for production updates
