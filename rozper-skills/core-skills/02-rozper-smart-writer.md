---
name: rozper-smart-writer
description: "The ONE skill for writing Rozper content that ranks. Takes a keyword, searches Google, analyzes top 5 competitors, auto-picks the best writing style, then writes content designed to outrank them. Works for landing pages AND blog posts. ALWAYS trigger when user says: write content for Rozper, create a landing page, write a blog, Rozper content, or any content task for rozper.com. Also trigger on: rozper content, Rozper blog, Rozper landing page, write for this keyword for Rozper."
---

# Rozper Smart Writer — Competitor-First Content Engine

This skill does NOT ask you to pick a tone. It researches what's winning for your keyword and writes content designed to outrank competitors — for Rozper.

## How It Works (5 Steps)

```
Step 1: Get keyword from user
Step 2: Search Google → analyze top 5 results
Step 3: Auto-detect content type + winning tone
Step 4: Load matching Rozper style rules
Step 5: Write content that beats what's ranking
```

---

## STEP 1: Get the Keyword

Ask the user ONE question: "What keyword do you want to rank for?"

No style questions. No format questions. The research decides everything.

---

## STEP 2: Research Competitors (MANDATORY — NEVER SKIP)

For each of the top 5 ranking pages, fetch the URL and note:

| What to Check | Why It Matters |
|---------------|----------------|
| Page type (landing page, blog, comparison?) | Tells you what FORMAT Google prefers |
| Word count | Tells you minimum length to compete |
| Heading style | Tells you what heading format works |
| Tone (formal/casual/technical?) | Tells you which STYLE to use |
| First 100 words lead-with | Tells you what hook works |
| CTA style | Tells you what conversion approach works |
| Competitor differentiators | Tells you what Rozper can counter |

```
KEYWORD: [keyword]
TOP 5 RESULTS:
| # | URL | Type | Words | Tone | Lead-With | CTA |
|---|-----|------|-------|------|-----------|-----|
[fill in]

PATTERN: [what most have in common]
GAP: [what NONE cover well — Rozper's opportunity]
```

---

## STEP 3: Auto-Detect Content Type + Style

```
IF 4+ of top 5 are blog posts → Write BLOG POST (1200-2000 words)
IF 4+ of top 5 are landing pages → Write LANDING PAGE (500-800 words)
IF mixed → check search intent:
  - "what is", "how to", "best", "guide" → BLOG POST
  - "buy", "pricing", "provider", "service" → LANDING PAGE
  - "[A] vs [B]" → COMPARISON PAGE
```

**Style selection:**
```
Competitors lead with PRICE/SAVINGS → CLOSER STYLE
Competitors lead with DATA/SPECS → AUTHORITY STYLE
Competitors lead with STORIES/SCENARIOS → STORYTELLER STYLE
Competitors use SHORT PUNCHY sentences + questions → NEIL STYLE
Competitors use PLAIN ENGLISH for non-technical buyers → FRIENDLY STYLE
Competitors are WEAK (thin/generic) → AUTHORITY + CLOSER hybrid
```

**Gap plays for Rozper:**
| Gap Found | Add This |
|-----------|----------|
| No Partnership model angle | Feature Rozper's unique positioning |
| No uptime stats | Add "99.999% uptime SLA" |
| No global reach | Add "150+ countries" |
| No free trial/demo | Add "Start a No-Pressure Conversation" CTA |
| No AI/technology angle | Highlight Rozper's AI/automation capabilities |
| No FAQ | Add 5-7 FAQ with schema markup |

Apply at least 2 gap plays on top of the base style.

---

## STEP 4: Load Rozper Identity

### Key Facts (NON-NEGOTIABLE)

| Fact | Correct |
|------|---------|
| Website | rozper.com |
| HQ | Hong Kong |
| Uptime | 99.999% uptime SLA |
| Coverage | 150+ countries |
| Price anchor | Custom Quote |
| Differentiator | Human-first partnership, 99.999% uptime, 150+ countries, custom pricing |

### Style files to load:
- `../writing-styles/01-rozper-neil-style.md`
- `../writing-styles/02-rozper-storyteller-style.md`
- `../writing-styles/03-rozper-authority-style.md`
- `../writing-styles/04-rozper-friendly-style.md`
- `../writing-styles/05-rozper-closer-style.md`

---

## STEP 5: Write the Content

### Announce the plan first:
```
KEYWORD: [keyword]
CONTENT TYPE: [landing page / blog / comparison]
WORD COUNT: [target]
STYLE: [which style and WHY]
GAP PLAYS: [what competitors miss]
INSIGHT: [1-2 sentence competitor summary]
```

### Writing Rules (ALL Styles):
1. Primary keyword in H1, first paragraph, 2+ H2s
2. Rozper trust stats in first 200 words
3. Start a No-Pressure Conversation CTA within first 300 words + middle + end
4. FAQ section with 5-7 questions
5. Meta title + meta description at end
6. 100% unique — never reuse structures from previous Rozper pages

---

## QUALITY GATES

- [ ] Competitor research actually done (not skipped)
- [ ] Style choice justified by competitor data
- [ ] At least 2 gap plays applied
- [ ] Rozper trust stats in first 200 words
- [ ] Primary keyword in H1 + intro + 2 H2s
- [ ] CTA appears 3 times (top, middle, bottom)
- [ ] FAQ section included (5-7 questions)
- [ ] Meta title + description provided
- [ ] Zero banned words from selected style
