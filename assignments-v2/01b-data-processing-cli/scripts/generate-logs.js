#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const idx = args.indexOf(name);
  if (idx === -1 || idx + 1 >= args.length) return fallback;
  return args[idx + 1];
};

const output = getArg('--output');
const lines = Number(getArg('--lines', '100000'));
const seed = Number(getArg('--seed', '123456'));

if (!output || !Number.isFinite(lines) || lines <= 0) {
  process.stderr.write('Usage: node scripts/generate-logs.js --output <path> --lines <count> [--seed <number>]\n');
  process.exit(1);
}

const levels = ['INFO', 'WARN', 'ERROR'];
const services = ['user-service', 'order-service', 'payment-service', 'search-service', 'email-service'];
const methods = ['GET', 'POST', 'PUT', 'DELETE'];
const paths = [
  '/api/users',
  '/api/users/:id',
  '/api/orders',
  '/api/orders/:id',
  '/api/payments',
  '/api/search',
  '/api/login',
  '/api/logout',
  '/api/health'
];

let state = seed >>> 0;
const rand = () => {
  // LCG: deterministic pseudo-random generator
  state = (1664525 * state + 1013904223) >>> 0;
  return state / 0xffffffff;
};

const pick = (arr) => arr[Math.floor(rand() * arr.length)];

const start = Date.parse('2026-01-01T00:00:00.000Z');
let current = start;

const outPath = path.resolve(process.cwd(), output);
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const stream = fs.createWriteStream(outPath, { encoding: 'utf8' });

let written = 0;
const writeBatch = () => {
  let ok = true;
  while (written < lines && ok) {
    const dt = Math.floor(rand() * 5000); // up to 5s
    current += dt;
    const iso = new Date(current).toISOString();
    const level = pick(levels);
    const service = pick(services);
    const method = pick(methods);
    const pathVal = pick(paths);
    const statusBase = level === 'ERROR' ? 500 : level === 'WARN' ? 400 : 200;
    const status = statusBase + Math.floor(rand() * 50);
    const responseTime = 5 + Math.floor(rand() * 2000);
    const line = `${iso} ${level} ${service} ${status} ${responseTime} ${method} ${pathVal}\n`;
    ok = stream.write(line);
    written += 1;
  }

  if (written < lines) {
    stream.once('drain', writeBatch);
  } else {
    stream.end();
  }
};

stream.on('finish', () => {
  process.stdout.write(`Generated ${lines} lines at ${outPath}\n`);
});

stream.on('error', (err) => {
  process.stderr.write(`Failed to write logs: ${err.message}\n`);
  process.exit(1);
});

writeBatch();
