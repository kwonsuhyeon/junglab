// .env.local의 PORT로 next dev를 띄운다 (기본 3100, web_site의 3000과 겹치지 않게)
import { readFileSync, existsSync } from "node:fs"
import { spawn } from "node:child_process"

const DEFAULT_PORT = "3100"

function readPort() {
  if (process.env.PORT) return process.env.PORT
  if (!existsSync(".env.local")) return DEFAULT_PORT
  const line = readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((l) => /^\s*PORT\s*=/.test(l))
  const value = line?.split("=")[1]?.trim()
  return value || DEFAULT_PORT
}

const port = readPort()
const child = spawn("npx", ["next", "dev", "-p", port], { stdio: "inherit", shell: true })
child.on("exit", (code) => process.exit(code ?? 0))
