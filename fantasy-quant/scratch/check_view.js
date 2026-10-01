const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query("SELECT definition FROM pg_views WHERE viewname = 'player_dfs_salaries'", (err, res) => {
  if (err) console.error(err);
  else console.log(res.rows);
  pool.end();
});
