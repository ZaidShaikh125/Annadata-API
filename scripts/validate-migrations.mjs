import { readdirSync, readFileSync } from 'node:fs';
const files = readdirSync('database/migrations').filter((file) => file.endsWith('.sql')).sort();
if (!files.length) throw new Error('No migrations found');
for (const file of files) { if (!/^\d{3}_[a-z0-9_]+\.sql$/.test(file)) throw new Error(`Invalid migration filename: ${file}`); if (!readFileSync(`database/migrations/${file}`, 'utf8').trim()) throw new Error(`Empty migration: ${file}`); }
console.log(`Validated ${files.length} migration(s).`);
