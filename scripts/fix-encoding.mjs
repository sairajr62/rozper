/**
 * Fix UTF-8 mojibake in blog markdown files.
 *
 * These files were originally created with Windows-1252-encoded special chars
 * (em dashes, smart quotes, etc.) that got stored as UTF-8 mojibake.
 *
 * This script re-encodes each character as a Windows-1252 byte, collects
 * sequences, then decodes them as UTF-8 — reversing the double-encoding.
 * It also strips the UTF-8 BOM and normalises CRLF → LF.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = join(__dirname, "..", "content", "blog")

// Windows-1252 special codepoint mapping (0x80–0x9F range only; rest is Latin-1)
const W1252_SPECIAL = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
  0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
  0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
  0x017E: 0x9E, 0x0178: 0x9F,
}

function charToW1252Byte(cp) {
  if (cp <= 0x7F) return cp
  if (W1252_SPECIAL[cp] !== undefined) return W1252_SPECIAL[cp]
  if (cp >= 0xA0 && cp <= 0xFF) return cp
  return null
}

function fixMojibake(text) {
  let result = ""
  let i = 0
  while (i < text.length) {
    let fixed = false
    for (let len = 4; len >= 2; len--) {
      const chunk = text.slice(i, i + len)
      if (chunk.length < len) continue
      const bytes = []
      let ok = true
      for (const ch of chunk) {
        const cp = ch.codePointAt(0)
        const b = charToW1252Byte(cp)
        if (b === null) { ok = false; break }
        bytes.push(b)
      }
      if (!ok) continue
      try {
        const buf = Buffer.from(bytes)
        const decoded = buf.toString("utf8")
        // Valid fix: no replacement chars, and shorter than original span
        if (!decoded.includes("�") && decoded.length < len) {
          result += decoded
          i += len
          fixed = true
          break
        }
      } catch (_) {}
    }
    if (!fixed) {
      result += text[i]
      i++
    }
  }
  return result
}

let fixed = 0
let unchanged = 0

for (const file of readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"))) {
  const filePath = join(BLOG_DIR, file)
  // Read as raw bytes so we can strip BOM and handle CRLF
  const raw = readFileSync(filePath)

  // Strip UTF-8 BOM (EF BB BF)
  const withoutBom = raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF
    ? raw.slice(3)
    : raw

  // Decode as UTF-8
  let text = withoutBom.toString("utf8")

  // Normalise CRLF → LF
  text = text.replace(/\r\n/g, "\n")

  // Fix mojibake
  const fixedText = fixMojibake(text)

  if (fixedText !== text || withoutBom.length !== raw.length) {
    writeFileSync(filePath, fixedText, "utf8")
    console.log(`Fixed: ${file}`)
    fixed++
  } else {
    unchanged++
  }
}

console.log(`\nDone. Fixed: ${fixed}, unchanged: ${unchanged}`)
