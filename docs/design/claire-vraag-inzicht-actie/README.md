# Claire: vraag, inzicht, actie (sectieverkenning)

Vier ontwerprichtingen voor een nieuwe sectie op `/claire` die "Bekijk het in
actie" en "Drie manieren om Claire in te zetten" samenvoegt tot een demo van
vraag naar inzicht naar actie. Aanleiding: de wat-kan-het-widget op de
AI/MCP-pagina van iwebdevelopment.com, als vertrekpunt en niet om te kopiëren.

Het canvas met de vier richtingen naast elkaar, inclusief motivatie en
afweging per richting, staat op:
https://claude.ai/code/artifact/fad6c6bc-a943-4e02-b2f8-c880b11807f9

| Artboard | Richting |
| --- | --- |
| `Main.dc.html` | A · Tweeluik: tabs per werkgebied, links inzicht (alleen lezen), rechts actie (na akkoord) |
| `Console.dc.html` | B · Console: donker podium, app-frame met werkgebieden, een gesprek van vraag tot akkoord |
| `DrieSporen.dc.html` | C · Drie sporen: de drie manieren als rijen, de akkoordgrens als verticale lijn |
| `Vraagbalk.dc.html` | D · Vraagbalk: de vraag centraal met suggestiechips, twee kaarten voor lezen en doen |

De artboards volgen palet 0a, Hanken Grotesk en de demo-data van
`src/components/pages/ClairePage.astro`; de bedragen en namen komen uit de
bestaande QA-kaarten. `canvas.json` legt de indeling en de notities vast.
Deze bestanden zijn de bron van het canvas; wie het canvas in de editor
bijwerkt, heeft daar de laatste stand. De gekozen richting wordt daarna
interactief in Astro gebouwd, met de copy in de datastructuur van de pagina.
