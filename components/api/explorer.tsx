"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronRight, Search } from "lucide-react"

type Param = {
  name: string
  type: string
  required?: boolean
  desc: string
}

type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  title: string
  body: string
  params: Param[]
  samples: Record<string, string>
}

const resources: Record<string, Endpoint[]> = {
  Calls: [
    {
      method: "POST",
      path: "/v2/calls",
      title: "Create a call",
      body: "Originate an outbound PSTN call. Returns immediately with a queued call object — listen on webhooks for state changes.",
      params: [
        { name: "to", type: "string", required: true, desc: "E.164 destination number." },
        { name: "from", type: "string", required: true, desc: "Verified or rented Rozper number." },
        { name: "url", type: "string", desc: "HTTPS endpoint that returns voice instructions when the call connects." },
        { name: "record", type: "boolean", desc: "Record both legs to your storage. Default false." },
        { name: "timeout", type: "integer", desc: "Ring timeout in seconds. Default 60." },
      ],
      samples: {
        cURL: `curl -X POST https://api.rozper.com/v2/calls \\
  -H "Authorization: Bearer $ROZPER_API_KEY" \\
  -d '{ "to": "+14155551234", "from": "+12025550100" }'`,
        Node: `const call = await rozper.calls.create({
  to:   "+14155551234",
  from: "+12025550100",
  url:  "https://your.app/voice/answer",
})`,
        Python: `call = rozper.calls.create(
    to="+14155551234",
    from_="+12025550100",
    url="https://your.app/voice/answer",
)`,
        Go: `call, _ := client.Calls.Create(ctx, &rozper.CallParams{
    To:   "+14155551234",
    From: "+12025550100",
    URL:  "https://your.app/voice/answer",
})`,
      },
    },
    {
      method: "GET",
      path: "/v2/calls/{id}",
      title: "Retrieve a call",
      body: "Fetch a call by its identifier. Includes timeline, recordings, and child resources.",
      params: [
        { name: "id", type: "string", required: true, desc: "The call identifier." },
      ],
      samples: {
        cURL: `curl https://api.rozper.com/v2/calls/call_01HXY7ZQ \\
  -H "Authorization: Bearer $ROZPER_API_KEY"`,
        Node: `const call = await rozper.calls.retrieve("call_01HXY7ZQ")`,
        Python: `call = rozper.calls.retrieve("call_01HXY7ZQ")`,
        Go: `call, _ := client.Calls.Retrieve(ctx, "call_01HXY7ZQ")`,
      },
    },
  ],
  Messages: [
    {
      method: "POST",
      path: "/v2/messages",
      title: "Send a message",
      body: "Send SMS, MMS, or WhatsApp from a Rozper number or sender ID.",
      params: [
        { name: "to", type: "string", required: true, desc: "Recipient in E.164." },
        { name: "from", type: "string", required: true, desc: "Sender number or short code." },
        { name: "body", type: "string", required: true, desc: "Message body (1600 char max)." },
        { name: "media_urls", type: "string[]", desc: "Attachments — JPG, PNG, PDF up to 5MB." },
      ],
      samples: {
        cURL: `curl -X POST https://api.rozper.com/v2/messages \\
  -H "Authorization: Bearer $ROZPER_API_KEY" \\
  -d '{ "to": "+14155551234", "from": "+12025550100", "body": "Hi!" }'`,
        Node: `await rozper.messages.create({
  to:   "+14155551234",
  from: "+12025550100",
  body: "Hi from Rozper!",
})`,
        Python: `rozper.messages.create(
    to="+14155551234",
    from_="+12025550100",
    body="Hi from Rozper!",
)`,
        Go: `_, err := client.Messages.Create(ctx, &rozper.MessageParams{
    To: "+14155551234", From: "+12025550100", Body: "Hi!",
})`,
      },
    },
  ],
  Numbers: [
    {
      method: "GET",
      path: "/v2/numbers/available",
      title: "Search available numbers",
      body: "Search by country, region, type, and capability. Buy with a follow-up POST.",
      params: [
        { name: "country", type: "string", required: true, desc: "ISO 3166-1 alpha-2." },
        { name: "type", type: "enum", desc: "local · tollfree · mobile" },
        { name: "contains", type: "string", desc: "Pattern match (e.g. *800*)." },
      ],
      samples: {
        cURL: `curl "https://api.rozper.com/v2/numbers/available?country=US&type=local" \\
  -H "Authorization: Bearer $ROZPER_API_KEY"`,
        Node: `const list = await rozper.numbers.available({ country: "US", type: "local" })`,
        Python: `rozper.numbers.available(country="US", type="local")`,
        Go: `client.Numbers.Available(ctx, &rozper.NumberSearch{Country: "US"})`,
      },
    },
  ],
  Agents: [
    {
      method: "POST",
      path: "/v2/agents",
      title: "Create an AI agent",
      body: "Spin up a voice or chat agent with a persona, knowledge base, and tools.",
      params: [
        { name: "name", type: "string", required: true, desc: "Internal identifier." },
        { name: "voice", type: "string", desc: "Voice id from the voices catalog." },
        { name: "knowledge_base_id", type: "string", desc: "Attach a KB to ground responses." },
        { name: "tools", type: "object[]", desc: "Functions the agent can call." },
      ],
      samples: {
        cURL: `curl -X POST https://api.rozper.com/v2/agents \\
  -H "Authorization: Bearer $ROZPER_API_KEY" \\
  -d '{ "name": "support-bot", "voice": "vx_amelia" }'`,
        Node: `const agent = await rozper.agents.create({
  name:  "support-bot",
  voice: "vx_amelia",
})`,
        Python: `rozper.agents.create(name="support-bot", voice="vx_amelia")`,
        Go: `client.Agents.Create(ctx, &rozper.AgentParams{
    Name: "support-bot", Voice: "vx_amelia",
})`,
      },
    },
  ],
}

const methodColors: Record<Endpoint["method"], string> = {
  GET: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30",
  POST: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  DELETE: "bg-rose-500/15 text-rose-400 border-rose-500/30",
}

export function ApiExplorer() {
  const [activeResource, setActiveResource] = useState<string>("Calls")
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [activeLang, setActiveLang] = useState<string>("Node")

  const endpoint = resources[activeResource][activeIdx]
  const langs = Object.keys(endpoint.samples)

  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#22D3EE] mb-3">
            §02 · Reference
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Explore every endpoint.
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F1A2E]/40 backdrop-blur-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Resource sidebar */}
          <aside className="lg:col-span-3 border-r border-white/5 bg-[#070B14]/50 p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                placeholder="Filter resources…"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#046BD2]/50"
              />
            </div>

            {Object.entries(resources).map(([resource, endpoints]) => (
              <div key={resource} className="mb-4">
                <div className="px-2 text-[10px] uppercase tracking-[0.22em] font-mono text-white/30 mb-1.5">
                  {resource}
                </div>
                <ul className="space-y-0.5">
                  {endpoints.map((ep, i) => {
                    const isActive =
                      activeResource === resource && activeIdx === i
                    return (
                      <li key={ep.path + i}>
                        <button
                          onClick={() => {
                            setActiveResource(resource)
                            setActiveIdx(i)
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${
                            isActive
                              ? "bg-[#046BD2]/15 border border-[#046BD2]/30"
                              : "border border-transparent hover:bg-white/[0.04]"
                          }`}
                        >
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${methodColors[ep.method]}`}
                          >
                            {ep.method}
                          </span>
                          <span className="font-mono text-[11px] text-white/70 truncate">
                            {ep.path}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </aside>

          {/* Detail panel */}
          <motion.div
            key={`${activeResource}-${activeIdx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-5 p-6 md:p-8 border-r border-white/5"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/40 mb-4">
              <span>{activeResource.toLowerCase()}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70">{endpoint.title}</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              {endpoint.title}
            </h3>
            <p className="mt-2 text-sm text-[#9AA8BC] leading-relaxed">
              {endpoint.body}
            </p>

            <div className="mt-5 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#070B14] border border-white/10 font-mono text-xs">
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${methodColors[endpoint.method]}`}
              >
                {endpoint.method}
              </span>
              <span className="text-white">{endpoint.path}</span>
            </div>

            {/* Params table */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-white/40 mb-3">
                Parameters
              </div>
              <div className="rounded-xl border border-white/10 overflow-hidden divide-y divide-white/5">
                {endpoint.params.map((p) => (
                  <div key={p.name} className="px-4 py-3 bg-white/[0.015]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="font-mono text-sm text-white">
                        {p.name}
                      </code>
                      <span className="font-mono text-[10px] text-[#22D3EE]">
                        {p.type}
                      </span>
                      {p.required && (
                        <span className="font-mono text-[10px] text-rose-400 uppercase tracking-wider">
                          required
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#9AA8BC] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Code panel */}
          <div className="lg:col-span-4 p-5 bg-[#070B14]/50">
            <div className="flex items-center gap-1 mb-4 flex-wrap">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLang(l)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-colors ${
                    activeLang === l
                      ? "bg-[#046BD2]/20 text-white border border-[#046BD2]/40"
                      : "text-white/40 hover:text-white/70 border border-transparent"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <motion.div
              key={activeLang + activeResource + activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-white/10 bg-[#040711] overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40">
                  Request · {activeLang.toLowerCase()}
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  ● live
                </span>
              </div>
              <pre className="px-4 py-4 text-[11px] font-mono text-[#CCD6DF] overflow-x-auto leading-relaxed">
                <code>{endpoint.samples[activeLang]}</code>
              </pre>
            </motion.div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#040711] overflow-hidden">
              <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40">
                  Response · 201 created
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  84 ms
                </span>
              </div>
              <pre className="px-4 py-4 text-[11px] font-mono text-[#9AA8BC] overflow-x-auto leading-relaxed">
                <code>{`{
  "id": "${endpoint.path.includes("calls") ? "call" : endpoint.path.includes("messages") ? "msg" : endpoint.path.includes("agents") ? "ag" : "num"}_01HXY7ZQ9V3J3X8K5N",
  "object": "${endpoint.path.split("/")[2].slice(0, -1)}",
  "created_at": "2026-05-12T14:23:01Z"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
