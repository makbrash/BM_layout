# Bologna Marathon Design System Roadmap

Questo documento descrive i passi proposti per trasformare il layout Bologna Marathon in un framework CSS modulare, riutilizzabile e facilmente interrogabile da un modello linguistico.

## 1. Fondamenta condivise
- **Token di design**: consolidare colori, tipografie, spaziature, raggi e ombre in un unico layer (`@layer tokens`).
- **Reset e normalizzazione**: introdurre un reset moderno con attenzione ad accessibilità, riduzione animazioni e gestione focus.
- **Base HTML semantico**: definire stili per tag nativi (`body`, `a`, `button`, `input`, heading) mantenendo coerenza tra pagine.

## 2. Sistemi trasversali
- **Tipografia scalabile**: scale predefinite (`.heading-xl`, `.text-sm` ecc.) e varianti con `data-theme` per gestire light/dark mode.
- **Layout primitives**: container (`.l-container`), stack verticali, cluster orizzontali, griglie responsive basate sui breakpoint definiti nei token.
- **Utility atomiche**: classi a responsabilità singola (`.u-bg-glass`, `.u-text-balance`, `.u-flex-center`) per comporre layout complessi senza definire stili inline.

## 3. Libreria di componenti
- **Componenti base**: pulsanti, link azione, input, toggle, card, badge e sezioni hero.
- **Pattern navigazione**: header fisso, menu mobile accessibile (`button` con `aria-expanded`), breadcrumb.
- **Sezioni evento**: hero "haction", card gare, banner iscrizione, moduli contatto.
- **Varianti**: uso di modifier class (`.c-button--primary`, `.c-button--ghost`) e attributi (`[data-variant="glass"]`).

## 4. Documentazione & esempi
- **Catalogo componenti**: pagina demo che mostri markup + snippet CSS/HTML generati automaticamente.
- **Istruzioni per LLM**: linee guida per naming, struttura HTML richiesta, uso dei token e delle utility.
- **Checklist accessibilità**: regole su focus state, contrasto, annunci ARIA e gestione riduzione movimento.
- **Demo interattiva**: `docs/framework-demo.html` funge da prima bozza navigabile solo con il nuovo framework.

## 5. Tooling & governance
- **Linting CSS**: configurare Stylelint/Prettier per mantenere formattazione e naming coerente.
- **Build opzionale**: script npm per concatenare/minimizzare i layer in `dist/bm-framework.css` quando necessario.
- **Versionamento**: introdurre changelog semantico per ogni release del framework.

## 6. Prossimi passi suggeriti
1. Validare i token e il reset presenti in `css/framework.css`.
2. Trasferire gradualmente i componenti esistenti dal vecchio `main.css` al nuovo framework adottando le classi prefissate.
3. Aggiornare le pagine HTML per usare le nuove utility/componenti, sostituendo progressivamente Bootstrap.
4. Arricchire la demo con esempi aggiuntivi (timeline, sponsor, tabelle) o evolvere verso una pagina "Storybook" generata.

Seguendo questi step avremo una base robusta, coerente e pronta per l'integrazione con un generatore di layout basato su LLM.
