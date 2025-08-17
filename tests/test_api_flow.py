from fastapi.testclient import TestClient
import sys, pathlib, os
os.environ['HUMANITY_SIGNING_SECRET'] = 'test-secret'
root = pathlib.Path(__file__).resolve().parents[1] / 'packages' / 'core'
sys.path.append(str(root))
from humanity_core.api import app  # type: ignore

def test_full_quiz_flow():
    with TestClient(app) as client:
        # Start session
        r = client.post('/quiz/start')
        assert r.status_code == 200, r.text
        data = r.json()
        session_id = data['session_id']
        order = data['question_order']
        assert isinstance(order, list) and order, 'question order should be non-empty'

        # Fetch questions to craft minimal valid answers (choose first option each)
        qr = client.get('/data/questions')
        assert qr.status_code == 200
        questions = qr.json()['questions']
        answers = {}
        for q in questions:
            qid = int(q['id'])
            # choose first option key
            opt = q['options'][0]
            answers[qid] = str(opt['key'])

        # Wait minimal time to avoid ultra fast (simulate by adjusting timings > 500ms)
        timings = {qid: 600 for qid in answers.keys()}
        # Ensure we pass server-side MIN_COMPLETION_SECONDS (2s)
        import time as _t
        _t.sleep(2.1)
        submit = client.post('/quiz/submit', json={
            'session_id': session_id,
            'answers': answers,
            'timings': timings,
        })
        assert submit.status_code == 200, submit.text
        result_meta = submit.json()

        rid = result_meta['result_id']
        token = result_meta['token']

        # Retrieve result
        gr = client.get(f'/results/{rid}?token={token}')
        assert gr.status_code == 200, gr.text
        result_payload = gr.json()
        assert 'ranking' in result_payload and result_payload['ranking'], 'ranking missing'
        assert result_payload['anomalies']['ultra_fast'] is False


def test_invalid_token():
    import time as _t
    _t.sleep(16)  # Wait longer than SESSION_START_COOLDOWN (15 seconds)
    with TestClient(app) as client:
        r = client.post('/quiz/start')
        assert r.status_code == 200, r.text
        session_id = r.json()['session_id']
        qr = client.get('/data/questions')
        questions = qr.json()['questions']
        answers = {int(q['id']): str(q['options'][0]['key']) for q in questions}
        timings = {int(q['id']): 600 for q in questions}
        _t.sleep(2.1)  # Wait longer than MIN_COMPLETION_SECONDS (2 seconds)
        submit = client.post('/quiz/submit', json={'session_id': session_id, 'answers': answers, 'timings': timings})
        assert submit.status_code == 200, submit.text
        rid = submit.json()['result_id']
        bad = client.get(f'/results/{rid}?token=badtoken')
        assert bad.status_code == 403


def test_session_expiry():
    """Test that expired sessions are rejected"""
    with TestClient(app) as client:
        # Mock an expired session by checking error message
        import time as _t
        _t.sleep(16)  # Wait for cooldown
        r = client.post('/quiz/start')
        session_id = r.json()['session_id']
        
        # Try to submit with invalid session (non-existent)
        fake_submit = client.post('/quiz/submit', json={
            'session_id': 'fake-session-id',
            'answers': {1: 'A'},
            'timings': {1: 600}
        })
        assert fake_submit.status_code == 400
        assert "Invalid session" in fake_submit.text


def test_double_submit():
    """Test that submitting twice to same session fails"""
    with TestClient(app) as client:
        import time as _t
        _t.sleep(16)  # Wait for cooldown
        
        r = client.post('/quiz/start')
        session_id = r.json()['session_id']
        
        qr = client.get('/data/questions')
        questions = qr.json()['questions']
        answers = {int(q['id']): str(q['options'][0]['key']) for q in questions}
        timings = {int(q['id']): 600 for q in questions}
        
        _t.sleep(2.1)  # Wait for completion time
        
        # First submit should succeed
        submit1 = client.post('/quiz/submit', json={
            'session_id': session_id,
            'answers': answers,
            'timings': timings
        })
        assert submit1.status_code == 200
        
        # Second submit should fail
        submit2 = client.post('/quiz/submit', json={
            'session_id': session_id,
            'answers': answers,
            'timings': timings
        })
        assert submit2.status_code == 400
        assert "already submitted" in submit2.text


def test_ultra_fast_submission():
    """Test that ultra-fast submissions are flagged in anomalies"""
    with TestClient(app) as client:
        import time as _t
        _t.sleep(16)  # Wait for cooldown
        
        r = client.post('/quiz/start')
        session_id = r.json()['session_id']
        
        qr = client.get('/data/questions')
        questions = qr.json()['questions']
        answers = {int(q['id']): str(q['options'][0]['key']) for q in questions}
        # Set ultra-fast timings (< 500ms average)
        timings = {int(q['id']): 100 for q in questions}
        
        _t.sleep(2.1)  # Wait for completion time
        
        submit = client.post('/quiz/submit', json={
            'session_id': session_id,
            'answers': answers,
            'timings': timings
        })
        assert submit.status_code == 200
        result_meta = submit.json()
        
        # Check result has ultra_fast flag
        rid = result_meta['result_id']
        token = result_meta['token']
        result = client.get(f'/results/{rid}?token={token}')
        assert result.status_code == 200
        assert result.json()['anomalies']['ultra_fast'] is True
