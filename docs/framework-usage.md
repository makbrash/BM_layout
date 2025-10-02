# Linee guida di utilizzo del framework CSS

Queste istruzioni servono a guidare sia i designer/sviluppatori sia un futuro modello LLM nella composizione delle pagine usando il nuovo framework.

## Convenzioni generali
- **Prefissi**: `c-` per componenti, `l-` per layout primitives, `u-` per utility, `is-`/`has-` per state class.
- **Naming leggibile**: parole separate da trattino (`c-hero-banner`, `u-text-balance`).
- **Markup semantico**: privilegiare tag nativi (`<header>`, `<nav>`, `<main>`, `<section>`, `<button>`, `<a>`, `<form>`, `<input>`).
- **Attributi di controllo**: usare `data-variant`, `data-size`, `data-theme` per modulare stili senza creare classi duplicate.
- **Demo navigabile**: `docs/framework-demo.html` mostra una pagina completa che consuma solo il framework, utile come reference per l'LLM.

## Struttura di una pagina tipo
```html
<body class="l-page" data-theme="dark">
  <header class="c-site-header">
    <nav class="c-nav" data-variant="glass">
      ...
    </nav>
  </header>
  <main class="l-stack" data-gap="xl">
    <section class="c-hero" data-size="xl">
      ...
    </section>
    <section class="l-container">
      <div class="l-grid" data-columns-md="2">
        <article class="c-card" data-variant="glass">
          ...
        </article>
      </div>
    </section>
  </main>
  <footer class="c-site-footer l-container">
    ...
  </footer>
</body>
```

## Layer CSS
Il file `css/framework.css` è organizzato tramite `@layer` per garantire prevedibilità del cascade:
1. `tokens` – variabili globali.
2. `reset` – normalizzazione base.
3. `base` – stili per tag.
4. `layout` – primitives (`l-container`, `l-stack`, `l-grid`, `l-cluster`).
5. `components` – blocchi riutilizzabili (`c-button`, `c-hero`, `c-card`, `c-nav`).
6. `utilities` – classi atomiche (`u-text-center`, `u-bg-glass`, `u-shadow-lg`).

## Breakpoint & dimensioni
- Breakpoint disponibili: `--bp-sm` (576px), `--bp-md` (768px), `--bp-lg` (1024px), `--bp-xl` (1280px), `--bp-2xl` (1440px).
- Le primitives di layout accettano attributi `data-columns-*` e `data-gap` per controllare la resa responsive senza scrivere CSS aggiuntivo.

## Componenti principali
### Pulsanti (`.c-button`)
```html
<a class="c-button" data-variant="primary" href="/iscrizioni">Iscriviti ora</a>
<button class="c-button" data-variant="ghost" data-size="sm">Scopri di più</button>
```
Varianti disponibili: `primary`, `secondary`, `ghost`, `glass`. Tag supportati: `<a>`, `<button>`, `<input type="submit">`.

### Hero d'azione (`.c-hero`)
- Wrapper `.c-hero` con variante `data-variant="glass"|"gradient"`.
- Interno strutturato con `.c-hero__inner` (grid responsive).
- Contenuti principali dentro una `l-stack` con `.c-hero__kicker`, `.c-hero__badge`, `.c-hero__title`, `.c-hero__subtitle`.
- Area media `.c-hero__media` per immagini/video e `.c-hero__stats` per le KPI (`.c-stat`).
- Call-to-action `.c-hero__actions` composto da `.c-button`.

### Navigazione (`.c-nav`)
- Header `.c-site-header` contiene `.c-nav`.
- Variante `data-variant="glass"` applica blur e sfondo traslucido.
- Trigger mobile `.c-nav__toggle` (`<button>` con `aria-expanded`).
- Pannello mobile `.c-nav__panel` con classe `is-open` quando visibile; collegarlo con `aria-controls` e `body[data-nav-open="true"]` per bloccare lo scroll.
- Lista `.c-nav__list` con orientamento verticale tramite `data-orientation="vertical"`.
- Link `.c-nav__link` con stato attivo `.is-active`.
- Per mostrare la navigazione desktop usare `u-hidden lg:u-flex`.

```html
<header class="c-site-header">
  <nav class="c-nav" data-variant="glass">
    <div class="c-nav__brand">…</div>
    <ul class="c-nav__list u-hidden lg:u-flex">…</ul>
    <button class="c-nav__toggle lg:u-hidden" aria-controls="mainNav" aria-expanded="false">☰</button>
  </nav>
  <div class="c-nav__panel" id="mainNav" hidden>
    <div class="l-stack" data-gap="xl">…</div>
  </div>
</header>
```

### Input & form (`.c-input`)
```html
<label class="c-field">
  <span class="c-field__label">Email</span>
  <input type="email" class="c-input" placeholder="nome@esempio.com">
  <span class="c-field__hint">Usa un indirizzo valido</span>
</label>
```
Stati gestiti: focus visibile, errore con `.is-invalid`, successo con `.is-valid`.

Utility correlate:
- `.c-form-grid` con `data-columns="2"` crea il layout a due colonne su viewport ≥768px.
- `.c-fieldset` racchiude gruppi di checkbox/radio, `data-layout="inline"` per disporli su una riga.

### Titoli sezione (`.c-section-title`)
- Wrapper `.c-section-title` (grid verticale).
- Kicker `.c-section-title__kicker`, heading `.c-section-title__heading`, descrizione `.c-section-title__description`.
- Possono essere combinati con utility `u-text-center`, `u-max-width-md`.

### Statistiche (`.c-stat`)
- Blocco dati con `.c-stat`, variante `data-emphasis="primary"` per enfatizzare.
- Valore `.c-stat__value` utilizza il font display, etichetta `.c-stat__label` uppercase.
- Ideale per countdown, distanze, numero di iscritti.

### Card evento (`.c-card`)
- Layout verticale con padding generoso e varianti `data-variant="glass"`, `data-tone="brand"`.
- Metadati `.c-card__meta` con `c-tag`, titolo `.c-card__title`, testo `.c-card__description`, azioni `.c-card__actions`.
- `data-layout="horizontal"` attiva il layout 60/40 sopra i 768px.

### Footer (`.c-site-footer`)
- Wrapper `footer.c-site-footer` con `.c-site-footer__grid` (3 colonne da 1024px in su).
- Sezione legale `.c-site-footer__legal` allinea copy e diritti.
- Riutilizza layout primitives (`l-stack`, `l-cluster`) e utility `u-text-muted`.

## Utility utili per l'LLM
- Allineamento: `.u-flex-center`, `.u-flex-between`, `.u-items-center`.
- Spaziature rapide: `.u-gap-sm|md|lg|xl`, `.u-mt-lg`, `.u-mx-auto`, `.u-py-xl`.
- Colori: `.u-bg-glass`, `.u-bg-gradient`, `.u-text-accent`.
- Effetti: `.u-shadow-md`, `.u-blur`, `.u-border-glow`.
- Responsive: `md:u-flex`, `lg:u-flex`, `lg:u-hidden` per gestire visibilità a breakpoint prefissati.
- Dimensioni: `.u-w-full`, `.u-max-width-sm|md`, `.u-grid-span-2` per controllare l'estensione nelle griglie.

## Best practice per l'LLM
1. **Iniziare dall'outline semantico** (header, main, section, footer).
2. **Applicare layout primitives** per definire la struttura, poi aggiungere componenti.
3. **Riutilizzare varianti esistenti** tramite `data-variant` invece di creare nuove classi.
4. **Gestire lo stato** con classi `is-*` (`is-expanded`, `is-active`, `is-loading`).
5. **Aggiungere attributi ARIA** nei componenti interattivi secondo quanto documentato.

Seguendo queste regole il modello potrà comporre pagine consistenti sfruttando il framework senza dover analizzare file CSS complessi.
