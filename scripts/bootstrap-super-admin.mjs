import pg from 'pg';
const { Pool } = pg;
const required = ['DATABASE_URL','BOOTSTRAP_ENTRA_OBJECT_ID','BOOTSTRAP_ADMIN_EMAIL','BOOTSTRAP_ADMIN_NAME'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Missing required bootstrap configuration: ${missing.join(', ')}`);
if (process.env.BOOTSTRAP_CONFIRM !== 'CREATE_FIRST_SUPER_ADMIN') throw new Error('Set BOOTSTRAP_CONFIRM=CREATE_FIRST_SUPER_ADMIN to authorize the one-time bootstrap.');
if (!/^[0-9a-f-]{36}$/i.test(process.env.BOOTSTRAP_ENTRA_OBJECT_ID)) throw new Error('BOOTSTRAP_ENTRA_OBJECT_ID must be an Entra object UUID.');
if (!process.env.BOOTSTRAP_ADMIN_EMAIL.toLowerCase().endsWith('@flowthread.space')) throw new Error('Bootstrap administrator must use the approved corporate email domain.');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
try {
  await pool.query('BEGIN');
  const existing = await pool.query('SELECT id FROM admin_users WHERE super_admin = true AND active = true FOR UPDATE');
  if (existing.rowCount) throw new Error('An active Super Administrator already exists; bootstrap is disabled.');
  await pool.query('INSERT INTO admin_users(entra_object_id,email,display_name,roles,permissions,geography_scopes,active,super_admin) VALUES($1,$2,$3,$4,$5,$6,true,true)', [process.env.BOOTSTRAP_ENTRA_OBJECT_ID,process.env.BOOTSTRAP_ADMIN_EMAIL.toLowerCase(),process.env.BOOTSTRAP_ADMIN_NAME,['Super Admin'],['*'],[]]);
  await pool.query('COMMIT');
  console.log('First Super Administrator record created.');
} catch (error) { await pool.query('ROLLBACK'); throw error; } finally { await pool.end(); }
