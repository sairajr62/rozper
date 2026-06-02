---
name: rozper-ranking-content-engine
description: "Execution skill for writing Rozper content that ranks on Google and reads like a human. Use AFTER rozper-landing-page-creator or rozper-blog-creator. Handles: 6-step pre-writing research, AI humanization rules, E-E-A-T signal injection, schema markup templates, Google AI Overview optimization, sentence-level variation, content freshness, and post-writing audit. Trigger when: 'write this page', 'make it rank', 'humanize', 'SEO content', 'ranking content', or when executing any Rozper page."
---

# Rozper Ranking Content Engine

Turns the Rozper content plan into content that actually ranks and converts.

**Use ALONGSIDE writing skills.** Those define voice and structure. THIS handles research, humanization, SEO execution, and QA.

---

## 6-STEP PRE-WRITING RESEARCH PROTOCOL

### Step 1: Search the Primary Keyword
Top 5 organic results. For each note: H1 angle, word count, structure, unique angle, what's MISSING.

### Step 2: Check People Also Ask
5-8 PAA questions → use 3-4 in FAQ, 1-2 as H2s.

### Step 3: Analyze Search Intent
| Intent | Page Type | Approach |
|--------|-----------|----------|
| Informational | Blog | Teach first, mention Rozper second |
| Commercial | Landing page | Show value, prove with stats |
| Transactional | Landing page | CTA, trial/demo, remove friction |

### Step 4: Identify Competitor Weaknesses
Common gaps in Rozper's market:
- Partnership model — genuine human support, 99.999% uptime, 150+ countries not mentioned
- 99.999% uptime specifics missing
- 150+ countries context not provided
- No human/support quality discussion

### Step 5: Collect Supporting Data
- 2-3 industry statistics (telecom/UCaaS/VoIP market data)
- Rozper-specific stats: 99.999% uptime, 150+ countries
- Customer result references where available

### Step 6: Build Content Map (5 lines before drafting)
```
KEYWORD: [keyword]
INTENT: [informational/commercial/transactional]
FORMAT: [landing page/blog/comparison]
ANGLE: [what makes this different from what's ranking]
GAP PLAYS: [2-3 things competitors don't cover]
```

---

## AI HUMANIZATION RULES

### Sentence-Level Variation
Mix deliberately:
- Short punches (4-8 words): "That's the Rozper difference."
- Medium (10-15 words): "99.999% isn't a marketing claim — it's a contractual guarantee."
- Complex (18-25 words): "When a provider covers 150+ countries and maintains 99.999% uptime, the engineering behind that level of reliability is anything but accidental."

**Never three consecutive sentences of similar length.**

### Human Signal Injectors (1-2 per 1,000 words)
1. Casual qualifier: "Here's the thing — most [competitors] overcomplicate this."
2. Honest admission: "Will Rozper work for every use case? No. But for [specific case], it's hard to beat."
3. Reader address: "If you've ever [experienced pain point], you'll appreciate this."
4. Conversational aside: "(Yes, that includes [specific scenario].)"
5. Direct challenge: "Don't take our word for it — [start trial/book demo]."

---

## E-E-A-T SIGNAL INJECTION

### Experience Signals
- Reference Rozper's Hong Kong base and industry depth
- Include real customer result references
- Cite specific platform capabilities with numbers

### Expertise Signals
- Use technical terms correctly for the Rozper market
- Define terms when introducing them (expertise + reader service)
- Include a technical specs table or callout box

### Authority Signals
- Cite industry data with sources
- Reference Rozper's specific network stats
- FAQ with schema markup

### Trust Signals
- 99.999% SLA — contractual guarantee
- 24/7 support (where applicable)
- 150+ countries coverage with specific numbers
- Customer results where available

---

## SCHEMA MARKUP TEMPLATES

### FAQ Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer]"
      }
    }
  ]
}
</script>
```

### Service Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service] by Rozper",
  "provider": {
    "@type": "Organization",
    "name": "Rozper",
    "url": "https://www.rozper.com"
  },
  "description": "[Service description]",
  "areaServed": "Worldwide",
  "serviceType": "[e.g., Wholesale VoIP, UCaaS]"
}
</script>
```

---

## POST-WRITING AUDIT CHECKLIST

- [ ] Competitor research done
- [ ] PAA questions captured and used
- [ ] Search intent confirmed
- [ ] 2-3 supporting stats collected
- [ ] Primary keyword in H1, intro, 1 H2, FAQ, meta
- [ ] Secondary keywords distributed naturally
- [ ] Sentence lengths vary (short/medium/complex mixed)
- [ ] Zero banned AI phrases
- [ ] At least 1 human signal injector
- [ ] Contractions used throughout
- [ ] Rozper differentiators included: 99.999%, 150+ countries
- [ ] FAQ with schema markup
- [ ] Meta title under 60 chars; meta description under 155 chars
- [ ] Internal links to 2+ Rozper product pages
