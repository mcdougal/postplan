import { defineConfig } from 'drizzle-kit';

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error(`Missing environment variable: POSTGRES_URL`);
}

export default defineConfig({
  dbCredentials: { url: POSTGRES_URL },
  dialect: `postgresql`,
  schema: `./src/schema.ts`,
  out: `./drizzle`,
});
