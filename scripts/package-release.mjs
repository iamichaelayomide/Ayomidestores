import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const nextDir = path.join(rootDir, ".next");
const standaloneDir = path.join(nextDir, "standalone");
const staticDir = path.join(nextDir, "static");
const publicDir = path.join(rootDir, "public");
const prismaDir = path.join(rootDir, "prisma");
const releaseDir = path.join(rootDir, "release");
const envExampleFile = path.join(rootDir, ".env.example");

async function copyIfExists(source, destination) {
  try {
    await cp(source, destination, {
      recursive: true,
      force: true,
      dereference: true,
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }

  return true;
}

async function main() {
  await rm(releaseDir, { recursive: true, force: true });

  const hasStandaloneBuild = await copyIfExists(standaloneDir, releaseDir);

  if (!hasStandaloneBuild) {
    throw new Error('Standalone build output not found. Run "npm run build" first.');
  }

  await mkdir(path.join(releaseDir, ".next"), { recursive: true });
  await copyIfExists(staticDir, path.join(releaseDir, ".next", "static"));
  await copyIfExists(publicDir, path.join(releaseDir, "public"));
  await rm(path.join(releaseDir, ".env"), { force: true });
  await copyIfExists(envExampleFile, path.join(releaseDir, ".env.example"));

  await rm(path.join(releaseDir, "prisma"), { recursive: true, force: true });
  await mkdir(path.join(releaseDir, "prisma"), { recursive: true });
  await copyIfExists(path.join(prismaDir, "schema.prisma"), path.join(releaseDir, "prisma", "schema.prisma"));
  await copyIfExists(path.join(prismaDir, "seed.ts"), path.join(releaseDir, "prisma", "seed.ts"));

  const releasePackageJson = {
    name: "household-ecommerce-release",
    private: true,
    version: "0.1.0",
    scripts: {
      start: "node server.js",
    },
    engines: {
      node: ">=20.0.0",
    },
  };

  await writeFile(
    path.join(releaseDir, "package.json"),
    `${JSON.stringify(releasePackageJson, null, 2)}\n`,
    "utf8",
  );

  const releaseReadme = `# Release Package

This folder contains the standalone production build for the app.

## Run

1. Copy this folder to the target server.
2. Copy \`.env.example\` to \`.env\` and fill in the production values.
3. Start the app with \`node server.js\`.

## Required environment variables

- \`DATABASE_URL\`
- \`DIRECT_URL\`
- \`NEXTAUTH_URL\`
- \`NEXTAUTH_SECRET\`
- Any payment or email provider keys used in production
`;

  await writeFile(path.join(releaseDir, "README.md"), releaseReadme, "utf8");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
