# Jonnywik — Portfolio Command Center

An interactive, source-first portfolio for full-stack operational software. The site showcases two flagship systems—**Code for Resilience** and **Employee Management Dashboard**—through real project links, architectural context, documented boundaries, and accessible interaction.

## Design direction

The interface uses a dark technical editorial system: near-black ink surfaces, signal teal for primary interaction, warm orange for decisions, and a visual motif of route grids and connected system nodes. The experience is designed to be useful before it is decorative.

## Local development

```bash
pnpm install
pnpm dev
```

Quality checks and production build:

```bash
pnpm check
pnpm build
```

## Interaction and accessibility

The site includes project filters, case-study selection, a build-principles stepper, responsive navigation, and a light/dark theme control. It provides visible focus states and respects reduced-motion preferences. Every portfolio destination links to the relevant public GitHub source.

## Deployment

The included GitHub Actions workflow builds the static site and deploys the Pages artifact from the `main` branch once GitHub Pages is enabled for the repository. No database, authentication, personal-data collection, or external tracking is used.

## Featured sources

- [Code for Resilience — Command Center](https://github.com/Jonnywik/EnvScie-CommandCenter)
- [Employee Management Dashboard](https://github.com/Jonnywik/employee-management-dashboard)
- [Jonnywik GitHub profile](https://github.com/Jonnywik)
