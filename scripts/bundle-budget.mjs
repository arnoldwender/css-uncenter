import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Measure emitted assets; compressed sizes must not hide an oversized route.
const directory = resolve(process.argv[2] ?? 'dist');
const html = readFileSync(join(directory, 'index.html'), 'utf8');
const paths = [...new Set([...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)].map(match => match[1]))];
if (!paths.some(path => path.endsWith('.js')) || !paths.some(path => path.endsWith('.css'))) {
  throw new Error('No initial JavaScript/CSS found: refusing an empty measurement');
}
const initial = paths.map(path => ({ path, bytes: statSync(join(directory, path)).size }));
const chunks = readdirSync(join(directory, 'assets')).filter(path => path.endsWith('.js'))
  .map(path => ({ path, bytes: statSync(join(directory, 'assets', path)).size }));
const initialBytes = initial.reduce((sum, asset) => sum + asset.bytes, 0);
const passed = initialBytes <= 300_000 && chunks.every(chunk => chunk.bytes <= 200_000);
console.log(JSON.stringify({ directory, initial, initialBytes, chunks, passed }, null, 2));
if (!passed) process.exitCode = 1;
