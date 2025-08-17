import { useState, useMemo, useEffect, useRef } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Question } from '../types';

interface HomeProps {
  questions: Question[];
}

const Home: NextPage<HomeProps> = ({ questions }) => {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const questionStartRef = useRef<number>(Date.now());
  const [timings, setTimings] = useState<Record<number, number>>({}); // ms per question
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [restored, setRestored] = useState(false);
  const restoredRef = useRef(false);

  const handleAnswer = (questionId: number, answer: string) => {
    // Record time spent on current question before advancing
    const now = Date.now();
    const delta = now - questionStartRef.current;
    setTimings(prev => ({ ...prev, [questionId]: (prev[questionId] ?? 0) + delta }));
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      questionStartRef.current = Date.now();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [canRetryAt, setCanRetryAt] = useState<number>(0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Ensure we have a session (start if missing)
      let sid = sessionId;
      if (!sid) {
        const startResp = await fetch(`${API_BASE}/quiz/start`, { method: 'POST' });
        if (!startResp.ok) throw new Error('Failed to start session');
        const startJson = await startResp.json();
        sid = startJson.session_id;
        setSessionId(sid);
      }
      // Submit answers via authoritative endpoint
      const submitResp = await fetch(`${API_BASE}/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ session_id: sid, answers, timings }),
      });
      if (!submitResp.ok) {
        let friendly = 'Submission failed. Please try again.';
        try {
          const ct = submitResp.headers.get('content-type') || '';
          const rawTxt = await submitResp.text();
          if (ct.includes('application/json')) {
            try {
              const js = JSON.parse(rawTxt);
              if (js.detail) {
                const detail: string = js.detail;
                if (/too fast/i.test(detail)) {
                  friendly = 'Looks like the quiz was submitted unusually fast. Take a little more time with each question and resubmit.';
                } else {
                  friendly = detail;
                }
              }
            } catch {
              // fall back to raw text
              if (rawTxt) friendly = rawTxt;
            }
          } else if (rawTxt) {
            friendly = rawTxt;
          }
        } catch {}
        throw new Error(friendly);
      }
      const submitJson = await submitResp.json();
      // Store only identifiers & token; results page will fetch securely
      try {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('resultMeta', JSON.stringify(submitJson));
          sessionStorage.setItem('quizPendingReset', '1');
        }
      } catch {}
      await router.replace(`/results?rid=${submitJson.result_id}&token=${encodeURIComponent(submitJson.token)}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
      const msg = error instanceof Error ? error.message : 'An error occurred while submitting answers';
      setSubmitError(msg);
      if (/unusually fast/i.test(msg)) {
        setCanRetryAt(Date.now() + 4000); // enforce short pause before retry
      } else {
        setCanRetryAt(Date.now());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const question = questions[currentQuestion];
  const allAnswered = useMemo(() => questions.length > 0 && questions.every(q => answers[q.id] !== undefined), [questions, answers]);
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const [progressMsg, setProgressMsg] = useState('');

  // Update aria-live progress message (debounced slight delay to avoid rapid chatter)
  useEffect(() => {
    const id = setTimeout(() => {
      if (questions.length > 0) {
        setProgressMsg(`Answered ${answeredCount} of ${questions.length} questions.`);
      }
    }, 150);
    return () => clearTimeout(id);
  }, [answeredCount, questions.length]);

  // Restore progress from sessionStorage once on mount
  useEffect(() => {
    if (typeof window === 'undefined' || restoredRef.current) return;
    try {
      const raw = sessionStorage.getItem('quizProgress');
      const storedMeta = sessionStorage.getItem('resultMeta');
      if (raw) {
        const parsed = JSON.parse(raw) as { answers?: Record<number, string>; current?: number };
        if (parsed.answers) {
          // Filter to valid question ids only
          const validIds = new Set(questions.map(q => q.id));
            const filtered: Record<number, string> = {};
          Object.entries(parsed.answers).forEach(([k,v]) => {
            const idNum = Number(k);
            if (validIds.has(idNum)) filtered[idNum] = v as string;
          });
          setAnswers(filtered);
        }
        if (typeof parsed.current === 'number' && parsed.current >= 0 && parsed.current < questions.length) {
          setCurrentQuestion(parsed.current);
        }
        setRestored(true);
      }
      if (storedMeta) {
        try { const meta = JSON.parse(storedMeta); if (meta.session_id) setSessionId(meta.session_id); } catch {}
      }
    } catch {}
    restoredRef.current = true;
  // run only once after questions ready
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length]);

  // Persist progress whenever answers or currentQuestion change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
    const payload = JSON.stringify({ answers, current: currentQuestion, ts: Date.now(), timings });
      sessionStorage.setItem('quizProgress', payload);
    } catch {}
  }, [answers, currentQuestion, timings]);

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('quizProgress');
    }
  };

  return (
  <div className="min-h-screen flex flex-col relative overflow-hidden">
    {/* Looping gradient blob background */}
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="bg-loop h-full w-full">
        <span className="blob blob-a"></span>
        <span className="blob blob-b"></span>
        <span className="blob blob-c"></span>
      </div>
    </div>
      <Head>
        <title key="title">HUMANITY Test</title>
        <meta key="description" name="description" content="Discover your archetype combination" />
        <link key="favicon" rel="icon" href="/favicon.ico" />
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

  <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 flex-1 relative z-10">
        <h1 className="text-3xl font-semibold text-center mb-8 tracking-tight">HUMANITY Assessment</h1>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-gray-500 text-right mt-1">
            {currentQuestion + 1} / {questions.length} answered
          </div>
          {/* Visually hidden live region for screen readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">{progressMsg}</div>
        </div>

        {questions.length === 0 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg border shadow-sm p-8 text-center">
            <p className="text-gray-600">Questions are unavailable right now. Please refresh or try again later.</p>
          </div>
        )}

        {question && questions.length > 0 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg border shadow-sm p-8">
            {restored && Object.keys(answers).length > 0 && (
              <div className="mb-4 flex items-center justify-between text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-2" aria-live="polite">
                <span>Progress restored.</span>
                <button onClick={handleReset} className="underline hover:text-gray-900" type="button">Reset</button>
              </div>
            )}
            <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
        <p className="text-lg md:text-xl text-gray-700">{question.text}</p>
            </div>

            <div className="space-y-4">
              {question.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleAnswer(question.id, option.key)}
          className={`w-full p-4 text-left rounded-md border shadow-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                    answers[question.id] === option.key
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                  aria-pressed={answers[question.id] === option.key}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation before submit */}
        {currentQuestion === questions.length - 1 && !showConfirm && questions.length > 0 && (
      <div className="max-w-2xl mx-auto mt-8 text-center">
            <button
              onClick={() => setShowConfirm(true)}
        className="w-full py-3 rounded-md font-medium bg-gray-900 hover:bg-black text-white text-lg shadow-sm transition-all duration-200"
              disabled={isSubmitting || !allAnswered}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answers'}
            </button>
            {submitError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-left">
                <p className="font-semibold mb-1">Submission Issue</p>
                <p className="text-sm mb-3">{submitError}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={Date.now() < canRetryAt || isSubmitting}
                    className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors border ${Date.now() < canRetryAt || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200' : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-300'}`}
                  >Retry Submit</button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-black shadow-sm"
                  >Review Answers</button>
                </div>
                {Date.now() < canRetryAt && (
                  <p className="text-xs text-gray-500 mt-2" aria-live="polite">Retry enabled in {Math.ceil((canRetryAt - Date.now())/1000)}s…</p>
                )}
              </div>
            )}
            {!allAnswered && (
              <div className="mt-4 text-sm text-gray-500">Answer all questions before submitting.</div>
            )}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border shadow-xl p-8 max-w-md w-full text-center">
              <h3 className="text-2xl font-semibold mb-4">Ready to submit?</h3>
              <p className="mb-6 text-gray-600">You’ve answered all questions. Submit to see your results.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 rounded-md font-medium bg-gray-900 hover:bg-black text-white text-lg shadow-sm transition-all duration-200"
                  disabled={isSubmitting || !allAnswered}
                >
                  {isSubmitting ? 'Submitting...' : 'Yes, show my results'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-3 rounded-md font-medium bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-lg shadow-sm transition-all duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-left">
                  <p className="font-semibold mb-1">Submission Issue</p>
                  <p className="text-sm mb-3">{submitError}</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={handleSubmit}
                      disabled={Date.now() < canRetryAt || isSubmitting}
                      className={`px-5 py-2 rounded-md text-sm font-medium shadow-sm transition-colors border ${Date.now() < canRetryAt || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200' : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-300'}`}
                    >Retry Submit</button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-5 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-black shadow-sm"
                    >Change Answers</button>
                  </div>
                  {Date.now() < canRetryAt && (
                    <p className="text-xs text-gray-500 mt-2" aria-live="polite">Retry enabled in {Math.ceil((canRetryAt - Date.now())/1000)}s…</p>
                  )}
                </div>
              )}
              <div className="mt-4 text-xs text-gray-400" aria-live="polite">
                {isSubmitting ? 'Submitting your answers...' : 'Press enter on the primary button to submit.'}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // In production, this should use environment variables for the API URL
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  let data: any = { questions: [] };
  try {
    const response = await fetch(`${API_BASE}/data/questions`);
    data = await response.json();
  } catch (e) {
    // Build should still succeed; runtime submit uses API_BASE
  }

  return {
    props: {
      questions: data.questions,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};

export default Home;
