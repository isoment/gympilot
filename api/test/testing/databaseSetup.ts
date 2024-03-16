import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

async function migrate() {
  try {
    const { stdout, stderr } = await execAsync("npm run db:migrate");
  } catch (error) {
    console.error("Error migrating database for tests:", error);
  }
}

async function rollback() {
  try {
    const { stdout, stderr } = await execAsync("npm run db:migrate:rollback:all");
  } catch (error) {
    console.error("Error rolling back migrations for tests:", error);
  }
}

export { migrate, rollback };
