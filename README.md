# 3B Infrastructure

[![CI](https://github.com/Three-Bugs-Studio/3binfrastructure/actions/workflows/ci.yml/badge.svg)](https://github.com/Three-Bugs-Studio/3binfrastructure/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A hand-drawn notebook on how software is built. It explains system architecture, databases, scaling on AWS, DevOps, VPS deployment and 16 engineering subjects in plain English, and every topic has an animated doodle demo you can play, pause and step through.

It is a read-only static site, so there is no login, no sign-up and no backend.

## What's inside

- **System Architecture:** foundations, seven architecture styles, how to design a system, and the four levels of the C4 model.
- **Database Concepts:** keys, normalization, ACID, isolation levels, indexes, replication, sharding, CAP and NoSQL.
- **AWS Scaling:** the Well-Architected Framework, load balancing, Auto Scaling, containers, Lambda, queues, RDS and DynamoDB.
- **DevOps:** CI/CD, Docker, Kubernetes, Infrastructure as Code, Dev, Test and Production environments, deployment strategies, GitOps, SRE and incident response.
- **VPS Deploy:** every step after buying a VPS, with commands and a demo of what happens if you skip it.
- **Subjects:** 16 engineering subjects, from maths, C and C++ to requirements, Arduino, Nuvoton NUC140 and real-time Raspberry Pi.
- **Courses:** seven steps from a first programming class to distributed systems.

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

The site uses [SvelteKit](https://svelte.dev/docs/kit) with the static adapter, and every page is prerendered. Content lives in plain data files in [`src/lib`](src/lib), and [`Sketch.svelte`](src/lib/Sketch.svelte) draws the diagrams from lists of nodes and edges, and [`Demo.svelte`](src/lib/Demo.svelte) plays them step by step. The hand-drawn wobble comes from a single SVG filter, so there are no images or drawing libraries.

## Contributing

Corrections and new topics are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md). To report a security problem, follow [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © Three Bugs Studio
