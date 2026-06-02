---
name: rozper-content-auditor
description: "Pre-publish content audit skill for Rozper. Scores written content against competitor pages, keyword coverage, topic completeness, and SEO best practices. Run AFTER writing any Rozper page. Checks: keyword optimization, competitor topic coverage, content gap analysis, SEO scoring 0-100, fix list with exact rewrites. Trigger on: 'audit this content', 'check my content', 'score this page', 'compare to competitors', 'keyword check', 'content review', 'pre-publish check', 'gap analysis', or any request to evaluate written Rozper content."
---

# Rozper Content Auditor — Pre-Publish Quality Gate

Final check before any Rozper page goes live. Answers three questions:

1. **Keyword question:** Is the page optimized for the right keywords in the right places?
2. **Competitor question:** Does this page cover everything the top 5 competitors cover (and more)?
3. **Quality question:** Will this page rank?

---

## PHASE 1: KEYWORD COVERAGE AUDIT

### Primary Keyword Placement Check (9 locations)

| Location | Required? | Pass Condition |
|----------|-----------|----------------|
| H1 | YES | Natural, not stuffed |
| Meta title | YES | First 30 characters |
| Meta description | YES | First 10 words |
| First paragraph | YES | Within first 50 words |
| URL slug | YES | Keyword in URL |
| At least 1 H2 | YES | Natural phrasing |
| Body text | YES | 4-6 total mentions |
| Image alt text | YES | 1-2 times |
| FAQ question | YES | At least 1 |

**Scoring:** 9/9 = perfect. Below 7/9 = rewrite needed.

---

## PHASE 2: COMPETITOR TOPIC COVERAGE

Search Google for the primary keyword. Open top 5 results. Build coverage table:

```
| Topic | Comp1 | Comp2 | Comp3 | Comp4 | Comp5 | Rozper Page |
|-------|-------|-------|-------|-------|-------|---------|
```

- Topics in 4+ competitor pages that Rozper page MISSING = CRITICAL GAP → fix before publish
- Topics in 2-3 competitor pages that Rozper page MISSING = MODERATE GAP → fix if easy

---

## PHASE 3: ROZPER-SPECIFIC CONTENT GAPS

| Rozper Differentiator | On Page? | If Missing |
|---------------------------|----------|------------|
| 99.999% uptime SLA | ✓/✗ | Add to trust bar or hero |
| 150+ countries coverage | ✓/✗ | Add to hero or coverage section |
| Partnership model — genuine human support, 99.999% uptime, 1... | ✓/✗ | Add to features section |
| Start a No-Pressure Conversation CTA | ✓/✗ | Add to ALL CTA blocks |
| 24/7 support mention | ✓/✗ | Add to support/trust section |
| Trust stats | ✓/✗ | Add to above-the-fold section |

**Threshold:** At least 5 of 6 differentiators must appear on every page.

---

## PHASE 4: SEO SCORE (0-100)

| Dimension | Max Score | Scoring Guide |
|-----------|-----------|---------------|
| Primary keyword placement | 20 | 9/9 locations = 20pts |
| Secondary keyword coverage | 15 | All covered = 15pts |
| Meta title optimization | 10 | Keyword in first 30 chars + under 60 chars |
| Meta description | 10 | Keyword + CTA + under 155 chars |
| H-tag structure | 10 | H1 + 3+ H2s + FAQ H3s |
| Content depth vs competitors | 15 | More topics + more depth than avg |
| Rozper differentiators present | 10 | 5+ of 6 = 10pts |
| FAQ section | 5 | 5+ questions |
| Internal links | 5 | 2+ links to Rozper pages |

**Interpretation:**
- 90-100: Publish-ready
- 75-89: Fix 1-2 issues then publish
- 60-74: Moderate revision needed
- Below 60: Major rewrite required

---

## PHASE 5: FIX LIST OUTPUT

```
AUDIT COMPLETE — ROZPER CONTENT AUDIT
Page: [URL or title]
Keyword: [primary keyword]
SEO Score: [X]/100
Status: [Publish-ready / Fix before publish / Major rewrite]

CRITICAL FIXES:
1. [Issue] → Fix: [Exact replacement or addition]

MODERATE FIXES:
2. [Issue] → Fix: [Exact replacement]

LOW PRIORITY:
3. [Issue] → Fix: [Suggestion]
```

---

## COMMON ROZPER CONTENT ISSUES

1. **Missing Start a No-Pressure Conversation CTA** — Every page needs it in hero, mid-page, and close
2. **Vague uptime claim** — "reliable service" → "99.999% uptime SLA"
3. **Generic coverage** — "global coverage" → "150+ countries"
4. **No differentiator** — Partnership model — genuine human support, 99.999% uptime, 150+ countries
5. **Missing FAQ** — Every page needs 4-5 FAQ questions for schema markup
6. **Blog-style landing page** — Story opener means restructure to bullet format
7. **Keyword stuffing** — Primary keyword more than 6 times = flag for rewrite
