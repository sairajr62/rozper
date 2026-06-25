"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import type ReCAPTCHAType from "react-google-recaptcha"
import Link from "next/link"
import { motion } from "framer-motion"

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false })
import {
  PhoneOutgoing,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Globe2,
  ShieldCheck,
  DollarSign,
  HeadphonesIcon,
  BarChart3,
  ChevronDown,
  Search,
} from "lucide-react"

const ALL_COUNTRIES = [
  { name: "Afghanistan",                        iso: "af", code: "+93"   },
  { name: "Albania",                            iso: "al", code: "+355"  },
  { name: "Algeria",                            iso: "dz", code: "+213"  },
  { name: "Andorra",                            iso: "ad", code: "+376"  },
  { name: "Angola",                             iso: "ao", code: "+244"  },
  { name: "Antigua and Barbuda",                iso: "ag", code: "+1"    },
  { name: "Argentina",                          iso: "ar", code: "+54"   },
  { name: "Armenia",                            iso: "am", code: "+374"  },
  { name: "Australia",                          iso: "au", code: "+61"   },
  { name: "Austria",                            iso: "at", code: "+43"   },
  { name: "Azerbaijan",                         iso: "az", code: "+994"  },
  { name: "Bahamas",                            iso: "bs", code: "+1"    },
  { name: "Bahrain",                            iso: "bh", code: "+973"  },
  { name: "Bangladesh",                         iso: "bd", code: "+880"  },
  { name: "Barbados",                           iso: "bb", code: "+1"    },
  { name: "Belarus",                            iso: "by", code: "+375"  },
  { name: "Belgium",                            iso: "be", code: "+32"   },
  { name: "Belize",                             iso: "bz", code: "+501"  },
  { name: "Benin",                              iso: "bj", code: "+229"  },
  { name: "Bhutan",                             iso: "bt", code: "+975"  },
  { name: "Bolivia",                            iso: "bo", code: "+591"  },
  { name: "Bosnia and Herzegovina",             iso: "ba", code: "+387"  },
  { name: "Botswana",                           iso: "bw", code: "+267"  },
  { name: "Brazil",                             iso: "br", code: "+55"   },
  { name: "Brunei",                             iso: "bn", code: "+673"  },
  { name: "Bulgaria",                           iso: "bg", code: "+359"  },
  { name: "Burkina Faso",                       iso: "bf", code: "+226"  },
  { name: "Burundi",                            iso: "bi", code: "+257"  },
  { name: "Cambodia",                           iso: "kh", code: "+855"  },
  { name: "Cameroon",                           iso: "cm", code: "+237"  },
  { name: "Canada",                             iso: "ca", code: "+1"    },
  { name: "Cape Verde",                         iso: "cv", code: "+238"  },
  { name: "Central African Republic",           iso: "cf", code: "+236"  },
  { name: "Chad",                               iso: "td", code: "+235"  },
  { name: "Chile",                              iso: "cl", code: "+56"   },
  { name: "China",                              iso: "cn", code: "+86"   },
  { name: "Colombia",                           iso: "co", code: "+57"   },
  { name: "Comoros",                            iso: "km", code: "+269"  },
  { name: "Congo (DRC)",                        iso: "cd", code: "+243"  },
  { name: "Congo (Republic)",                   iso: "cg", code: "+242"  },
  { name: "Costa Rica",                         iso: "cr", code: "+506"  },
  { name: "Croatia",                            iso: "hr", code: "+385"  },
  { name: "Cuba",                               iso: "cu", code: "+53"   },
  { name: "Cyprus",                             iso: "cy", code: "+357"  },
  { name: "Czech Republic",                     iso: "cz", code: "+420"  },
  { name: "Denmark",                            iso: "dk", code: "+45"   },
  { name: "Djibouti",                           iso: "dj", code: "+253"  },
  { name: "Dominica",                           iso: "dm", code: "+1"    },
  { name: "Dominican Republic",                 iso: "do", code: "+1"    },
  { name: "Ecuador",                            iso: "ec", code: "+593"  },
  { name: "Egypt",                              iso: "eg", code: "+20"   },
  { name: "El Salvador",                        iso: "sv", code: "+503"  },
  { name: "Equatorial Guinea",                  iso: "gq", code: "+240"  },
  { name: "Eritrea",                            iso: "er", code: "+291"  },
  { name: "Estonia",                            iso: "ee", code: "+372"  },
  { name: "Eswatini",                           iso: "sz", code: "+268"  },
  { name: "Ethiopia",                           iso: "et", code: "+251"  },
  { name: "Fiji",                               iso: "fj", code: "+679"  },
  { name: "Finland",                            iso: "fi", code: "+358"  },
  { name: "France",                             iso: "fr", code: "+33"   },
  { name: "Gabon",                              iso: "ga", code: "+241"  },
  { name: "Gambia",                             iso: "gm", code: "+220"  },
  { name: "Georgia",                            iso: "ge", code: "+995"  },
  { name: "Germany",                            iso: "de", code: "+49"   },
  { name: "Ghana",                              iso: "gh", code: "+233"  },
  { name: "Greece",                             iso: "gr", code: "+30"   },
  { name: "Grenada",                            iso: "gd", code: "+1"    },
  { name: "Guatemala",                          iso: "gt", code: "+502"  },
  { name: "Guinea",                             iso: "gn", code: "+224"  },
  { name: "Guinea-Bissau",                      iso: "gw", code: "+245"  },
  { name: "Guyana",                             iso: "gy", code: "+592"  },
  { name: "Haiti",                              iso: "ht", code: "+509"  },
  { name: "Honduras",                           iso: "hn", code: "+504"  },
  { name: "Hungary",                            iso: "hu", code: "+36"   },
  { name: "Iceland",                            iso: "is", code: "+354"  },
  { name: "India",                              iso: "in", code: "+91"   },
  { name: "Indonesia",                          iso: "id", code: "+62"   },
  { name: "Iran",                               iso: "ir", code: "+98"   },
  { name: "Iraq",                               iso: "iq", code: "+964"  },
  { name: "Ireland",                            iso: "ie", code: "+353"  },
  { name: "Israel",                             iso: "il", code: "+972"  },
  { name: "Italy",                              iso: "it", code: "+39"   },
  { name: "Ivory Coast",                        iso: "ci", code: "+225"  },
  { name: "Jamaica",                            iso: "jm", code: "+1"    },
  { name: "Japan",                              iso: "jp", code: "+81"   },
  { name: "Jordan",                             iso: "jo", code: "+962"  },
  { name: "Kazakhstan",                         iso: "kz", code: "+7"    },
  { name: "Kenya",                              iso: "ke", code: "+254"  },
  { name: "Kiribati",                           iso: "ki", code: "+686"  },
  { name: "Kuwait",                             iso: "kw", code: "+965"  },
  { name: "Kyrgyzstan",                         iso: "kg", code: "+996"  },
  { name: "Laos",                               iso: "la", code: "+856"  },
  { name: "Latvia",                             iso: "lv", code: "+371"  },
  { name: "Lebanon",                            iso: "lb", code: "+961"  },
  { name: "Lesotho",                            iso: "ls", code: "+266"  },
  { name: "Liberia",                            iso: "lr", code: "+231"  },
  { name: "Libya",                              iso: "ly", code: "+218"  },
  { name: "Liechtenstein",                      iso: "li", code: "+423"  },
  { name: "Lithuania",                          iso: "lt", code: "+370"  },
  { name: "Luxembourg",                         iso: "lu", code: "+352"  },
  { name: "Madagascar",                         iso: "mg", code: "+261"  },
  { name: "Malawi",                             iso: "mw", code: "+265"  },
  { name: "Malaysia",                           iso: "my", code: "+60"   },
  { name: "Maldives",                           iso: "mv", code: "+960"  },
  { name: "Mali",                               iso: "ml", code: "+223"  },
  { name: "Malta",                              iso: "mt", code: "+356"  },
  { name: "Marshall Islands",                   iso: "mh", code: "+692"  },
  { name: "Mauritania",                         iso: "mr", code: "+222"  },
  { name: "Mauritius",                          iso: "mu", code: "+230"  },
  { name: "Mexico",                             iso: "mx", code: "+52"   },
  { name: "Micronesia",                         iso: "fm", code: "+691"  },
  { name: "Moldova",                            iso: "md", code: "+373"  },
  { name: "Monaco",                             iso: "mc", code: "+377"  },
  { name: "Mongolia",                           iso: "mn", code: "+976"  },
  { name: "Montenegro",                         iso: "me", code: "+382"  },
  { name: "Morocco",                            iso: "ma", code: "+212"  },
  { name: "Mozambique",                         iso: "mz", code: "+258"  },
  { name: "Myanmar",                            iso: "mm", code: "+95"   },
  { name: "Namibia",                            iso: "na", code: "+264"  },
  { name: "Nauru",                              iso: "nr", code: "+674"  },
  { name: "Nepal",                              iso: "np", code: "+977"  },
  { name: "Netherlands",                        iso: "nl", code: "+31"   },
  { name: "New Zealand",                        iso: "nz", code: "+64"   },
  { name: "Nicaragua",                          iso: "ni", code: "+505"  },
  { name: "Niger",                              iso: "ne", code: "+227"  },
  { name: "Nigeria",                            iso: "ng", code: "+234"  },
  { name: "North Korea",                        iso: "kp", code: "+850"  },
  { name: "North Macedonia",                    iso: "mk", code: "+389"  },
  { name: "Norway",                             iso: "no", code: "+47"   },
  { name: "Oman",                               iso: "om", code: "+968"  },
  { name: "Pakistan",                           iso: "pk", code: "+92"   },
  { name: "Palau",                              iso: "pw", code: "+680"  },
  { name: "Palestine",                          iso: "ps", code: "+970"  },
  { name: "Panama",                             iso: "pa", code: "+507"  },
  { name: "Papua New Guinea",                   iso: "pg", code: "+675"  },
  { name: "Paraguay",                           iso: "py", code: "+595"  },
  { name: "Peru",                               iso: "pe", code: "+51"   },
  { name: "Philippines",                        iso: "ph", code: "+63"   },
  { name: "Poland",                             iso: "pl", code: "+48"   },
  { name: "Portugal",                           iso: "pt", code: "+351"  },
  { name: "Qatar",                              iso: "qa", code: "+974"  },
  { name: "Romania",                            iso: "ro", code: "+40"   },
  { name: "Russia",                             iso: "ru", code: "+7"    },
  { name: "Rwanda",                             iso: "rw", code: "+250"  },
  { name: "Saint Kitts and Nevis",              iso: "kn", code: "+1"    },
  { name: "Saint Lucia",                        iso: "lc", code: "+1"    },
  { name: "Saint Vincent and the Grenadines",   iso: "vc", code: "+1"    },
  { name: "Samoa",                              iso: "ws", code: "+685"  },
  { name: "San Marino",                         iso: "sm", code: "+378"  },
  { name: "São Tomé and Príncipe",              iso: "st", code: "+239"  },
  { name: "Saudi Arabia",                       iso: "sa", code: "+966"  },
  { name: "Senegal",                            iso: "sn", code: "+221"  },
  { name: "Serbia",                             iso: "rs", code: "+381"  },
  { name: "Seychelles",                         iso: "sc", code: "+248"  },
  { name: "Sierra Leone",                       iso: "sl", code: "+232"  },
  { name: "Singapore",                          iso: "sg", code: "+65"   },
  { name: "Slovakia",                           iso: "sk", code: "+421"  },
  { name: "Slovenia",                           iso: "si", code: "+386"  },
  { name: "Solomon Islands",                    iso: "sb", code: "+677"  },
  { name: "Somalia",                            iso: "so", code: "+252"  },
  { name: "South Africa",                       iso: "za", code: "+27"   },
  { name: "South Korea",                        iso: "kr", code: "+82"   },
  { name: "South Sudan",                        iso: "ss", code: "+211"  },
  { name: "Spain",                              iso: "es", code: "+34"   },
  { name: "Sri Lanka",                          iso: "lk", code: "+94"   },
  { name: "Sudan",                              iso: "sd", code: "+249"  },
  { name: "Suriname",                           iso: "sr", code: "+597"  },
  { name: "Sweden",                             iso: "se", code: "+46"   },
  { name: "Switzerland",                        iso: "ch", code: "+41"   },
  { name: "Syria",                              iso: "sy", code: "+963"  },
  { name: "Taiwan",                             iso: "tw", code: "+886"  },
  { name: "Tajikistan",                         iso: "tj", code: "+992"  },
  { name: "Tanzania",                           iso: "tz", code: "+255"  },
  { name: "Thailand",                           iso: "th", code: "+66"   },
  { name: "Timor-Leste",                        iso: "tl", code: "+670"  },
  { name: "Togo",                               iso: "tg", code: "+228"  },
  { name: "Tonga",                              iso: "to", code: "+676"  },
  { name: "Trinidad and Tobago",                iso: "tt", code: "+1"    },
  { name: "Tunisia",                            iso: "tn", code: "+216"  },
  { name: "Turkey",                             iso: "tr", code: "+90"   },
  { name: "Turkmenistan",                       iso: "tm", code: "+993"  },
  { name: "Tuvalu",                             iso: "tv", code: "+688"  },
  { name: "Uganda",                             iso: "ug", code: "+256"  },
  { name: "Ukraine",                            iso: "ua", code: "+380"  },
  { name: "United Arab Emirates",               iso: "ae", code: "+971"  },
  { name: "United Kingdom",                     iso: "gb", code: "+44"   },
  { name: "United States",                      iso: "us", code: "+1"    },
  { name: "Uruguay",                            iso: "uy", code: "+598"  },
  { name: "Uzbekistan",                         iso: "uz", code: "+998"  },
  { name: "Vanuatu",                            iso: "vu", code: "+678"  },
  { name: "Vatican City",                       iso: "va", code: "+39"   },
  { name: "Venezuela",                          iso: "ve", code: "+58"   },
  { name: "Vietnam",                            iso: "vn", code: "+84"   },
  { name: "Yemen",                              iso: "ye", code: "+967"  },
  { name: "Zambia",                             iso: "zm", code: "+260"  },
  { name: "Zimbabwe",                           iso: "zw", code: "+263"  },
]

function FlagImg({ iso, name }: { iso: string; name: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt={name}
      width={20}
      height={15}
      className="w-5 h-[15px] object-cover rounded-[2px] shrink-0"
    />
  )
}

const BENEFITS = [
  { icon: Globe2,         title: "200+ Countries",    desc: "A-Z termination with direct carrier interconnects across every major destination." },
  { icon: ShieldCheck,    title: "99.99% Uptime SLA", desc: "Carrier-grade reliability with automated failover and 24/7 NOC monitoring." },
  { icon: DollarSign,     title: "Volume Pricing",    desc: "Competitive per-minute rates with committed-use discounts — no aggregator markup." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "A real account manager and NOC engineer assigned to your account from day one." },
]

function Label({ text, required, optional }: { text: string; required?: boolean; optional?: boolean }) {
  return (
    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
      {text}
      {required && <span className="ml-1 text-[#22D3EE]">*</span>}
      {optional && <span className="ml-1.5 normal-case tracking-normal text-[10px] font-normal text-white/30">(optional)</span>}
    </label>
  )
}

const inputCls =
  "w-full h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.09] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/70 focus:bg-white/[0.07] transition"

/* ── Country picker dropdown ── */
function CountryPicker({
  selected,
  onChange,
}: {
  selected: (typeof ALL_COUNTRIES)[0]
  onChange: (c: (typeof ALL_COUNTRIES)[0]) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return ALL_COUNTRIES
    return ALL_COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.includes(q)
    )
  }, [query])

  /* close on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery("")
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  /* focus search when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])

  return (
    <div ref={ref} className="relative shrink-0">
      {/* trigger */}
      <button
        type="button"
        onClick={() => { setOpen(!open); setQuery("") }}
        className="h-full flex items-center gap-1.5 px-3 border-r border-white/[0.09] text-white/80 hover:text-white transition whitespace-nowrap"
      >
        <FlagImg iso={selected.iso} name={selected.name} />
        <span className="font-mono text-xs text-white/60">{selected.code}</span>
        <ChevronDown className={`h-3 w-3 text-white/30 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-28 rounded-xl border border-white/[0.09] bg-[#0D1627] shadow-2xl overflow-hidden flex flex-col">
          {/* search */}
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-white/[0.07]">
            <Search className="h-3 w-3 text-white/30 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 min-w-0 bg-transparent text-xs text-white placeholder-white/25 focus:outline-none"
            />
          </div>

          {/* list */}
          <div className="overflow-y-auto max-h-52 overscroll-contain">
            {filtered.length === 0 ? (
              <div className="px-2 py-2 text-xs text-white/30 text-center">No results</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => { onChange(c); setOpen(false); setQuery("") }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-left hover:bg-white/[0.05] transition ${
                    selected.name === c.name ? "bg-white/[0.04]" : ""
                  }`}
                >
                  <FlagImg iso={c.iso} name={c.name} />
                  <span className="font-mono text-xs text-white/75 shrink-0">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ */

export function WholesaleVoiceContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cc, setCc] = useState(ALL_COUNTRIES.find((c) => c.name === "United States")!)
  const recaptchaRef = useRef<ReCAPTCHAType>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA check.")
      return
    }
    setSending(true)
    setError(null)
    const form = e.currentTarget
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value ?? ""

    const phoneRaw     = get("phone")
    const minutes      = get("minutes")
    const destinations = get("destinations")
    const help         = get("help")

    const parts = [
      phoneRaw     ? `Phone: ${cc.code} ${phoneRaw}` : "",
      minutes      ? `Est. monthly minutes: ${minutes}` : "",
      destinations ? `Top destinations: ${destinations}` : "",
      help         ? `How can we help: ${help}` : "",
    ].filter(Boolean)

    const data = {
      firstName:      get("name"),
      lastName:       "",
      email:          get("email"),
      company:        "",
      companySize:    minutes ? `${minutes} min/month` : "—",
      interests:      ["Wholesale Voice"],
      message:        parts.join("\n"),
      recaptchaToken,
    }

    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) setSubmitted(true)
      else setError(json.error ?? "Something went wrong. Please try again.")
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setSending(false)
      recaptchaRef.current?.reset()
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 pb-24 sm:px-6">
      <div className="mb-14 text-center">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0086F9]/60">// get.started</div>
        <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Get a Custom Rate Card</h2>
        <p className="mt-4 text-base text-white/50 leading-relaxed max-w-xl mx-auto">
          Share your traffic details — we&apos;ll respond within one business day with a tailored A-Z rate deck.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left: benefits */}
        <div className="lg:col-span-4 space-y-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5 hover:border-[#046BD2]/30 transition"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#046BD2]/25 bg-[#046BD2]/15">
                <b.icon className="h-5 w-5 text-[#0086F9]" />
              </div>
              <div>
                <div className="font-semibold text-sm text-white mb-0.5">{b.title}</div>
                <div className="text-xs text-white/50 leading-relaxed">{b.desc}</div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.42 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Live network</span>
            </div>
            <div className="space-y-2">
              {[["10M+","calls routed daily"],["< 50ms","avg post-dial delay"],["99.2%","average ASR across A-Z"]].map(([v,l]) => (
                <div key={l} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-white/50">{l}</span>
                  <span className="font-mono text-xs font-bold text-white whitespace-nowrap">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="lg:col-span-8 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-br from-[#046BD2]/15 via-[#22D3EE]/8 to-transparent blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative rounded-2xl border border-white/[0.09] bg-[#0D1627]/95 backdrop-blur-xl shadow-2xl overflow-hidden">

            {/* card header */}
            <div className="flex items-center gap-3 px-5 sm:px-7 py-5 border-b border-white/[0.06]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#046BD2] to-[#22D3EE]">
                <PhoneOutgoing className="h-4 w-4 text-white" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#2D98F1] font-semibold">
                Request a Rate Card
              </span>
            </div>

            <div className="px-5 sm:px-7 py-6 sm:py-7">
              {submitted ? (
                <div className="py-14 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h2 className="font-display mt-5 text-2xl sm:text-3xl font-bold text-white">Request received!</h2>
                  <p className="mt-2 text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                    Our wholesale team will send your custom rate card within one business day.
                  </p>
                  <Link href="/wholesale-voice" className="mt-7 inline-flex items-center gap-2 text-sm text-[#22D3EE] hover:text-white transition-colors">
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Back to Wholesale Voice
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* NAME */}
                  <div>
                    <Label text="Name" required />
                    <input type="text" name="name" required placeholder="Your full name" className={inputCls} />
                  </div>

                  {/* WORK EMAIL */}
                  <div>
                    <Label text="Work Email" required />
                    <input type="email" name="email" required placeholder="you@company.com" className={inputCls} />
                  </div>

                  {/* PHONE */}
                  <div>
                    <Label text="Phone" />
                    <div className="flex h-11 rounded-lg border border-white/[0.09] bg-white/[0.04] focus-within:border-[#046BD2]/70 transition overflow-visible">
                      <CountryPicker selected={cc} onChange={setCc} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="555 000 0000"
                        className="flex-1 min-w-0 h-full px-3 bg-transparent text-sm text-white placeholder-white/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* EST. MONTHLY MINUTES */}
                  <div>
                    <Label text="Estimated Monthly Minutes" optional />
                    <input type="text" name="minutes" placeholder="e.g. 500,000" className={inputCls} />
                  </div>

                  {/* TOP DESTINATIONS */}
                  <div>
                    <Label text="Top Destinations" optional />
                    <input type="text" name="destinations" placeholder="e.g. US, UK, India, UAE" className={inputCls} />
                  </div>

                  {/* HOW CAN WE HELP */}
                  <div>
                    <Label text="How Can We Help?" optional />
                    <textarea
                      name="help"
                      rows={4}
                      placeholder="Tell us what you need and we'll tailor your quote."
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.09] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#046BD2]/70 focus:bg-white/[0.07] transition resize-none"
                    />
                  </div>

                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Lf5zjMtAAAAAGAU-oWDPa9j_7PJ9RzWWU4HatED"
                      theme="dark"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                      {error}
                    </p>
                  )}

                  {/* submit */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                    <p className="text-[11px] text-white/30 leading-relaxed">
                      By submitting, you agree to our{" "}
                      <Link href="/legal/privacy" className="underline hover:text-white/55 transition-colors">Privacy Policy</Link>.
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-7 h-11 rounded-full bg-gradient-to-r from-[#046BD2] to-[#0086F9] hover:from-[#0086F9] hover:to-[#22D3EE] text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_-4px_rgba(4,107,210,0.55)]"
                    >
                      {sending ? "Sending…" : "Get my quote"}
                      {!sending && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

