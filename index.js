const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/waitdb';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

