---
name: rozper-style-router
description: "Style selector for Rozper content. Routes to the correct writing tone based on keyword, competitor analysis, or user preference. Trigger when choosing a writing approach for Rozper content."
---

# Rozper Style Router

Pick the right writing style for any Rozper keyword. Feed it keyword + competitor analysis → outputs which style to use and why.

## THE 5 STYLES

| Style | File | Best For |
|-------|------|---------|
| Neil Style | `01-rozper-neil-style.md` | Commercial/transactional, punchy comparisons |
| Storyteller | `02-rozper-storyteller-style.md` | Pain-point keywords, before/after scenarios |
| Authority | `03-rozper-authority-style.md` | Technical keywords, enterprise/carrier audience |
| Friendly | `04-rozper-friendly-style.md` | SMB/startup, non-technical decision-makers |
| Closer | `05-rozper-closer-style.md` | High-intent, buying keywords, free trial pages |

## ROUTING LOGIC

**→ NEIL STYLE:** Competitors use bullet-heavy punchy copy; "best X", "top X" keywords; readers scan quickly; comparison tables common

**→ STORYTELLER:** Keywords signal pain ("struggling with", "problems with"); case studies in top results; mid-funnel emotional connection needed

**→ AUTHORITY:** Technical keywords (CLI routes, SIP signaling, wholesale termination); carrier/engineer audience; data-heavy specs tables in top results

**→ FRIENDLY:** Non-technical keywords ("virtual phone number", "business phone system"); SMB/startup buyer; plain-language top results

**→ CLOSER:** Transactional keywords ("buy", "pricing", "free trial", "get started"); conversion pages; competitors lead with price + CTA

## FLOWCHART
```
Most top results are blog posts?
├── Technical specs → AUTHORITY
├── Pain narrative → STORYTELLER
├── Beginner guide → FRIENDLY
└── Data/listicle → NEIL

Most top results are landing pages?
├── Pricing/comparison tables → CLOSER
├── Feature explanations → NEIL or FRIENDLY
└── Technical product specs → AUTHORITY
```

## SIGNATURE GAP PLAY PER STYLE

| Style | Rozper's Signature Gap |
|-------|--------------------------|
| Neil | Add 99.999% uptime stat + 150+ countries coverage data |
| Storyteller | Add before/after scenario featuring Partnership model — genuine human support, 99.999% |
| Authority | Add technical specs table with Rozper-specific numbers |
| Friendly | Add "3-step setup" walkthrough in plain English |
| Closer | Add Start a No-Pressure Conversation CTA + no-risk framing + trust stats |
