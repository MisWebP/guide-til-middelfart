# Guide til Middelfart

## Keramikruten — version 0.3

En personlig, mobilvenlig kulturguide til Middelfart. Første rute begynder ved CLAY Keramikmuseum og fører brugeren forbi fem keramiske værker i byen.

**Live:** https://miswebp.github.io/guide-til-middelfart/

## Formål

Guide til Middelfart hjælper mennesker med at opleve byen — ikke bare finde rundt i den.

Guiden er personlig og kurateret. Den er ikke en officiel turistguide.

## Designprincipper

- Mobile first
- Intro før kort
- Kortet støtter oplevelsen; det er ikke selve oplevelsen
- Roligt tempo og tydeligt hierarki
- **Kig op** sender blikket væk fra telefonen
- **Mit tip** giver en personlig lokal anbefaling
- **Næste værk** gør det enkelt at fortsætte
- De fem turkise fliser refererer til Keramikrutens fysiske fliser i fortovet

## Teknologi

- HTML
- CSS
- JavaScript
- Leaflet 1.9.4
- OpenStreetMap
- JSON
- GitHub Pages

Der bruges ikke database, CMS eller JavaScript-framework.

## Projektstruktur

```text
guide-til-middelfart/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── app.js
├── data/
│   └── skulpturer.json
└── images/
    └── ...
```

## Redaktionel datakilde

Excel-filen er den redaktionelle hovedkilde. `data/skulpturer.json` genereres fra Excel, når indholdet ændres.

Ret derfor indhold i Excel først — ikke direkte i JSON-filen.

## Rækkefølge i version 0.3

1. CLAY Keramikmuseum
2. Altings tøven
3. Krukke
4. Rook takes Bishop
5. Skulpturgruppe
6. Livsnyderne

## Arbejdsgang

1. Opdatér tekster og data i Excel.
2. Generér og validér `data/skulpturer.json`.
3. Kontrollér ændringerne lokalt eller på GitHub Pages.
4. Commit kun de filer, der faktisk er ændret.
5. Push til `main`.
6. Test siden på både telefon og desktop.

Eksempler på små commits:

- `Ret tekster til Krukke`
- `Opdater billeder til værkkort`
- `Ret kortets fejlvisning`
- `Udgiv version 0.3`

## Kontrol før udgivelse

- Kortet indlæses uden fejl i browserens konsol
- Alle fem værker vises
- Alle billeder indlæses
- Dialogerne kan åbnes og lukkes
- "Vis min placering" giver en forståelig status
- Alle kortlinks åbner korrekt
- JSON-filen er gyldig
- Ingen `.DS_Store`- eller `~$`-filer er committed

## Version 0.3

Version 0.3 er en stabiliseringsrelease:

- fungerende Leaflet-kort
- gyldig JSON-datafil
- billeder i 4:5-format
- lys hero og turkis ruteidentitet
- tydelig fejlbesked, hvis kort eller data ikke indlæses
- opdateret projektdokumentation
- `.gitignore` til system- og midlertidige filer

## Kendte begrænsninger

- Den turkise linje mellem punkterne er en visuel forbindelseslinje, ikke præcis fodgængerrouting.
- Billeder og tekster vedligeholdes manuelt via Excel-workflowet.
- Projektet indeholder foreløbig kun Keramikruten.

## Produktmanifest

Vi viser ikke alt. Vi viser det, vi selv ville vise en god ven.

Telefonen er guiden. Oplevelsen foregår i byen.
