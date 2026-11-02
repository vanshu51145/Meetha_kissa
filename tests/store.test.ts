import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

// The store writes to <cwd>/data, so chdir into a temp dir before importing it.
const cwd = process.cwd();
let store: typeof import("../src/lib/store.ts");
let dir: string;

before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "meetha-kissa-"));
  process.chdir(dir);
  store = await import("../src/lib/store.ts");
});

after(async () => {
  process.chdir(cwd);
  await rm(dir, { recursive: true, force: true });
});

test("appends are written and read back", async () => {
  await store.append("orders.json", { id: 1 });
  await store.append("orders.json", { id: 2 });
  assert.deepEqual(await store.readAll("orders.json"), [{ id: 1 }, { id: 2 }]);
});

test("concurrent appends lose no rows", async () => {
  await Promise.all(
    Array.from({ length: 10 }, (_, index) => store.append("messages.json", { id: index })),
  );
  assert.equal((await store.readAll("messages.json")).length, 10);
});

test("a missing or corrupt file reads as empty", async () => {
  assert.deepEqual(await store.readAll("nope.json"), []);
});

test("file names that escape the store are rejected", async () => {
  await assert.rejects(() => store.append("../evil.json", {}));
  await assert.rejects(() => store.readAll("nested/evil.json"));
});
