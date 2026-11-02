import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Orders, enquiries and subscribers are JSON files on disk — no database.
// Swap this module for a real one (Supabase, Postgres) and nothing else changes.
// shortcut: lost on read-only hosts (Vercel serverless), self-host or mount a volume
const storePath = (file: string) => path.join(process.cwd(), "data", file);

const FILE = /^[a-z-]+\.json$/;

// Writes are chained so two simultaneous submissions can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve();

export async function readAll<T>(file: string): Promise<T[]> {
  if (!FILE.test(file)) throw new Error(`bad store file: ${file}`);
  try {
    const rows: unknown = JSON.parse(await readFile(storePath(file), "utf8"));
    return Array.isArray(rows) ? (rows as T[]) : [];
  } catch {
    return []; // no file yet, or unreadable — start empty
  }
}

export async function append<T>(file: string, row: T): Promise<T> {
  if (!FILE.test(file)) throw new Error(`bad store file: ${file}`);
  const run = async () => {
    const rows = await readAll<T>(file);
    rows.push(row);
    await mkdir(path.join(process.cwd(), "data"), { recursive: true });
    await writeFile(storePath(file), `${JSON.stringify(rows, null, 2)}\n`, "utf8");
    return row;
  };
  const next = queue.then(run, run);
  queue = next.catch(() => {});
  return next;
}
