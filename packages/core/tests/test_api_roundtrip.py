import json
from fastapi.testclient import TestClient
from humanity_core.api import app

client = TestClient(app)

def test_health():
    r = client.get('/health')
    assert r.status_code == 200
    assert r.json()['status'] == 'ok'


def test_questions_loaded():
    r = client.get('/data/questions')
    assert r.status_code == 200
    data = r.json()
    assert 'questions' in data
    assert isinstance(data['questions'], list)
    # Expect at least one question
    assert len(data['questions']) > 0


def test_score_roundtrip_minimal():
    # Fetch first question to build a minimal answer payload
    qdata = client.get('/data/questions').json()['questions']
    first = qdata[0]
    first_option_key = first['options'][0]['key'] if first['options'] else None
    payload = {'answers': {first['id']: first_option_key}}
    r = client.post('/score', json=payload)
    assert r.status_code == 200
    body = r.json()
    # Basic shape assertions
    assert 'raw' in body and isinstance(body['raw'], dict)
    assert 'normalized' in body and isinstance(body['normalized'], dict)
    assert 'ranking' in body and isinstance(body['ranking'], list)
    assert 'report_markdown' in body and isinstance(body['report_markdown'], str)
    assert len(body['ranking']) > 0
