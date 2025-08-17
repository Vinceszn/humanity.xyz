#!/usr/bin/env node
// Lightweight Lighthouse CI runner for local diagnostics.
// Requires: npm i -D lighthouse chrome-launcher
// Usage: npm run lighthouse (runs against localhost:3000)

import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const url = process.env.LH_URL || 'http://localhost:3000';

(async () => {
  const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  const opts = { port: chrome.port, output: 'json', logLevel: 'error' };
  const config = undefined; // default config
  const runnerResult = await lighthouse(url, opts, config);
  const cats = runnerResult.lhr.categories;
  console.log('Lighthouse scores:', Object.fromEntries(Object.entries(cats).map(([k,v]) => [k, v.score])));
  await chrome.kill();
})();
