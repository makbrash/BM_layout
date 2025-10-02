# Layout Bologna Marathon 2026

Questo layout contiene tutti i file necessari per il funzionamento autonomo del sito Bologna Marathon 2026.

## Struttura del Layout

```
layout/
├── index.html              # Homepage principale
├── maratona.html           # Pagina dedicata alla maratona
├── css/
│   └── main.css           # Stili principali
├── js/
│   └── main.js            # JavaScript principale
├── img/                   # Immagini e media
│   ├── maratona/          # Immagini specifiche maratona
│   └── favicon/           # Icone e favicon
├── font/
│   └── Gloss_And_Bloom.ttf # Font personalizzato
└── sponsor/               # Loghi sponsor
    ├── main sponsor/
    ├── official beer/
    ├── official car/
    ├── official whater/
    ├── sponsor/
    ├── sponsor 2/
    ├── thecnical sponsor/
    └── title sponsor/
```

## Dipendenze Esterne

Il layout utilizza le seguenti librerie esterne tramite CDN:

- **Bootstrap 5.3.0** - Framework CSS
- **Font Awesome 6.5.1** - Icone
- **AOS 2.3.4** - Animazioni
- **Swiper 11** - Carousel
- **GSAP 3.12.2** - Animazioni avanzate
- **Leaflet 1.9.4** - Mappe interattive
- **Leaflet Elevation** - Profili altimetrici

## Funzionalità

- ✅ Layout completamente autonomo
- ✅ Navigazione tra le pagine
- ✅ Mappa interattiva con percorso maratona
- ✅ Animazioni e transizioni
- ✅ Design responsive
- ✅ Carousel sponsor
- ✅ Countdown timer
- ✅ Menu mobile

## Utilizzo

1. Aprire `index.html` nel browser per la homepage
2. Navigare tra le pagine tramite i link di navigazione
3. Tutte le risorse sono incluse localmente (eccetto CDN esterni)

## Note Tecniche

- I percorsi sono configurati per funzionare in modo relativo
- Le immagini sono ottimizzate per il web
- Il layout è compatibile con tutti i browser moderni
- Supporto completo per dispositivi mobili
