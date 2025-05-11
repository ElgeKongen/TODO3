# TaskMaster

TaskMaster er en enkel todo-app bygget med React og TypeScript. Applikasjonen fokuserer på funksjonalitet, brukervennlighet og en moderne frontend-stack.

## Teknologistack

Dette er teknologiene som brukes:

- **React** – Komponentbasert frontend
- **TypeScript** – Sikrere og mer forutsigbar kode
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Animasjoner og overganger
- **Lucide React** – Ikoner
- **React Hot Toast** – Tilbakemeldinger til bruker
- **Context API** – Enkel state management uten eksterne biblioteker

## Prosjektstruktur

```bash
src/
├── App.tsx             # Hovedlayout og providers
├── main.tsx            # Inngangspunkt
├── index.css           # Globale stiler
├── components/         # UI-komponenter
│   ├── ui/             # Generiske UI-elementer
│   ├── Header.tsx      
│   ├── TodoList.tsx    
│   ├── TodoItem.tsx    
│   ├── TodoForm.tsx    
│   ├── TodoFilters.tsx 
│   ├── CreateTodoButton.tsx 
│   └── TodoStats.tsx   
├── context/            # React Contexts
│   ├── TodoContext.tsx
│   └── ThemeContext.tsx
└── types/              # TypeScript-typer
```

## Design- og Arkitekturvalg

### State Management med Context API

- `TodoContext` håndterer todos, filtrering, søk og CRUD-funksjoner
- `ThemeContext` styrer lys/mørk modus

### Komponentstruktur

- Oppdelt i funksjonelle komponenter (liste, item, skjema, filtre osv.)
- Generiske komponenter i `ui/` for gjenbruk

### Styling med Tailwind CSS

- Effektiv styling direkte i JSX
- Innebygd støtte for dark mode

### Animasjoner med Framer Motion

- Brukt for å animere skjemaer, listeelementer og UI-effekter

### Dark Mode

- Implementert via `ThemeContext` og Tailwinds `dark:`-variant

### Todo-funksjonalitet

- CRUD-operasjoner
- Status: Not Started / In Progress / Done
- Prioritet: Lav, Medium, Høy
- Inline redigering
- Hover-baserte handlinger (edit/slett)

### Filtrering og Søk

- Filtrering etter status
- Søkefunksjon for tittel

### Statistikk

- Antall todos per status
- Fremdriftsbar

### Responsivt Design

- Tilpasset ulike skjermstørrelser med Tailwind breakpoints

## Forbedringer

- Ha funksjonalitet for å opprette brukere.
- RLS ved operasjoner basert på type bruker.
- Deadlines og varslinger på hver todo item.
- Bedre validering
- Drag and drop for å prioritere enda mer.
- Tags og kategorier for bedre organisering
- Dele lister med venner/brukere eller multiplayer som figma/miro gjør
