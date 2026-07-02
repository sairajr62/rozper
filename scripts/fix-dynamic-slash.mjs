import fs from "fs"

const files = [
  "components/area-codes/hub.tsx",
  "components/area-codes/page-content.tsx",
  "components/area-codes/state-page.tsx",
  "components/area-codes/us-map.tsx",
  "components/country-code/country-page.tsx",
  "components/country-code/hub.tsx",
  "components/country-code/page-content.tsx",
  "components/docs/explorer.tsx",
]

let totalFixed = 0
for (const file of files) {
  let content = fs.readFileSync(file, "utf8")
  const original = content

  // Fix bare /area-codes/${var} without a second segment
  content = content.replace(
    /`\/area-codes\/\$\{([^}]+)\}`/g,
    (_, s) => `\`/area-codes/\${${s}}/\``
  )
  // Fix bare /country-code/${var} (catch-all, already done but re-run for safety)
  content = content.replace(
    /`\/country-code\/\$\{([^}]+)\}`/g,
    (_, s) => `\`/country-code/\${${s}}/\``
  )
  // Fix docs dynamic links without trailing slash
  content = content.replace(
    /`\/docs\/([^`]*[^`/])`/g,
    (_, p) => `\`/docs/${p}/\``
  )

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8")
    totalFixed++
    console.log("Fixed: " + file)
  }
}
console.log("Total: " + totalFixed)
