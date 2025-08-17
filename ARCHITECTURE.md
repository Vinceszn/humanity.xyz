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
