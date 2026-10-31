# 3B Infrastructure

[![CI](https://github.com/Three-Bugs-Studio/3binfrastructure/actions/workflows/ci.yml/badge.svg)](https://github.com/Three-Bugs-Studio/3binfrastructure/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A hand-drawn notebook on how software is built. It explains system architecture and database concepts in plain English with doodle diagrams, and gives a learning path of software engineering courses.

It is a read-only static site, so there is no login, no sign-up and no backend.

## What's inside

- **System Architecture:** layers, monoliths and microservices, scaling, load balancing, caching, queues, APIs, reliability and observability.
- **Database Concepts:** keys, normalization, ACID, isolation levels, indexes, replication, sharding, CAP and NoSQL.
- **Courses:** six steps from a first programming class to distributed systems.

## Run it locally

You need Node.js 24 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

| Command           | What it does                               |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the dev server                       |
| `npm run build`   | Build the static site into `build/`        |
| `npm run preview` | Serve the production build                 |
| `npm run lint`    | Check formatting and lint rules            |
| `npm run format`  | Fix formatting                             |
| `npm run check`   | Type-check the project                     |
| `npm test`        | Check the content and the diagram geometry |

The contents of `build/` can be hosted on any static host.

## How it is built

The site uses [SvelteKit](https://svelte.dev/docs/kit) with the static adapter, and every page is prerendered. Content lives in plain data files in [`src/lib`](src/lib), and [`Sketch.svelte`](src/lib/Sketch.svelte) draws the diagrams from lists of nodes and edges. The hand-drawn wobble comes from a single SVG filter, so there are no images or drawing libraries.

## Contributing

Corrections and new topics are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md). To report a security problem, follow [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © Three Bugs Studio
