/**
 * Usage: node scripts/check-post.mjs content/blog/<slug>.md
 * Prints word count and Flesch Reading Ease score using the exact
 * same logic as app/api/_lib/audit-helpers.ts, so results match the
 * live audit dashboard.
 */
import fs from "fs"
import matter from "gray-matter"

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[|>\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const m = word.match(/[aeiouy]{1,2}/g)
  return m ? m.length : 1
}

function calcReadability(cleanText) {
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 3)
  const words = cleanText.split(/\s+/).filter(Boolean)
  if (sentences.length < 2 || words.length < 10) return null
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0)
  const raw = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length))
  const score = Math.max(0, Math.min(100, Math.round(raw)))
  return { score, sentences: sentences.length, words: words.length }
}

const f = process.argv[2]
if (!f) {
  console.error("Usage: node scripts/check-post.mjs content/blog/<slug>.md")
  process.exit(1)
}
const raw = fs.readFileSync(f, "utf8")
const { data, content } = matter(raw)
const clean = stripMarkdown(content)
const wordCount = clean.split(/\s+/).filter(Boolean).length
const r = calcReadability(clean)
console.log(JSON.stringify({
  file: f,
  title: data.title,
  wordCount,
  fleschScore: r?.score ?? null,
  wordCountOk: wordCount >= 1400 && wordCount <= 1550,
  fleschOk: (r?.score ?? 0) >= 70,
}, null, 2))
