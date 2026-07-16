# Guide til Middelfart

## Fase 1: Keramikruten

**Version 0.1 – Den første gåtur**

En mobil-først, personlig kulturguide til Middelfart. Første fase er en keramisk byvandring fra CLAY gennem byen.

## Produktretning

Guiden skal være intuitiv og give følelsen af at stå foran en kort, men eventyrlig rejse.

Den er:

- uformel
- humoristisk, når det falder naturligt
- imødekommende
- hjælpsom
- nysgerrig på kunst og kultur

Primær målgruppe er seniorpar med tid til at tage byen ind. Det overordnede mål er at give besøgende lyst til at blive en dag ekstra.

## Låste designprincipper

1. **Mobile first.** Siden udvikles først til en telefon i hånden på gaden.
2. **Kortet er et redskab.** Det hjælper brugeren med at finde vej, men er ikke selve oplevelsen.
3. **Kig op.** Hvert værk har en kort tekst, der sender blikket væk fra telefonen.
4. **Mit tip.** Hvert værk kan have en personlig lokal anbefaling.
5. **Roligt tempo.** Få valg, tydeligt hierarki og masser af luft.
6. **Næste værk.** Hvert værk afsluttes med en enkel vejvisning videre.

Hvis en funktion får brugeren til at kigge mere på telefonen end på Middelfart, skal den ændres eller fjernes.

## Teknologi

- HTML
- CSS
- JavaScript
- Leaflet
- OpenStreetMap
- JSON
- GitHub Pages

Der bruges ikke WordPress, database eller JavaScript-framework i første fase.

## Projektstruktur

```text
guide-til-middelfart/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── app.js
├── data/
│   └── skulpturer.json
└── images/
    └── skulpturer/
```

## Redaktionel datakilde

Excel-arket er den redaktionelle hovedkilde. JSON-filen genereres fra arket, når indholdet er opdateret.

Datafilen til hjemmesiden er:

```text
data/skulpturer.json
```

Felter pr. værk:

- `id`
- `nummer`
- `titel`
- `kunstner`
- `aar`
- `placering`
- `lat`
- `lng`
- `introduktion`
- `kig_op`
- `historien_bag`
- `mit_tip`
- `billede`
- `maps_url`
- `naeste_vaerk_tekst`
- `status`
- `kilder`

## Kendte punkter i version 0.1

- Start: CLAY Keramikmuseum
- Per Ahlmann: *Altings tøven*
- Gunhild Rudjord: *Krukke*
- Magne Furuholmen: *Rook takes Bishop*
- Betty Engholm: *Skulpturgruppe*

Kortlinjen er foreløbig og må ikke opfattes som præcis fodgængerrouting.

## Arbejdsgang med GitHub Desktop

1. Redigér eller erstat filer i den lokale repository-mappe.
2. Åbn GitHub Desktop.
3. Kontrollér ændringerne under **Changes**.
4. Skriv en kort commit-besked, fx `Ny mobilversion af Keramikruten`.
5. Klik **Commit to main**.
6. Klik **Push origin**.
7. Kontrollér den offentliggjorte side på GitHub Pages.

## Live-adresse

```text
https://miswebp.github.io/guide-til-middelfart/
```

## Næste opgaver

- Kontrollér design og interaktion på telefon.
- Gå ruten og skriv de endelige **Kig op**-tekster.
- Tilføj billeder med korte filnavne.
- Tilføj de resterende værker.
- Erstat den foreløbige forbindelseslinje med en gennemgået rute.
- Test læsbarhed, kontrast, knapper og positionsvisning udendørs.

## Produktmanifest

Guide til Middelfart hjælper mennesker med at opleve byen – ikke bare finde rundt i den.

Vi viser ikke alt. Vi viser det, vi selv ville vise en god ven.

Telefonen er guiden. Oplevelsen foregår i byen.
