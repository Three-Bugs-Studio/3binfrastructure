# Contributing

Thanks for helping improve 3B Infrastructure. Fixing a wrong explanation is just as valuable as adding a new topic.

## Getting started

You need Node.js 24 or newer.

```bash
npm install
npm run dev
```

The site runs at <http://localhost:5173>.

## Changing the content

Everything on the site lives in plain TypeScript data files, so most changes need no Svelte at all.

| To change                        | Edit                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------- |
| A System Architecture topic      | [`src/lib/architecture.ts`](src/lib/architecture.ts)                                               |
| A Database Concepts topic        | [`src/lib/databases.ts`](src/lib/databases.ts)                                                     |
| The course list                  | [`src/lib/courses.ts`](src/lib/courses.ts)                                                         |
| How diagrams or topics are drawn | [`src/lib/Sketch.svelte`](src/lib/Sketch.svelte), [`src/lib/Topics.svelte`](src/lib/Topics.svelte) |

Diagrams are lists of nodes and edges. Node `x` and `y` are the centre of the shape, on a canvas 480 wide and `h` tall. `npm test` fails if a node leaves the canvas, overlaps another node, or an edge points at a node that does not exist.

Please keep the writing plain and accurate, and link course pages that are free to open.

## Before opening a pull request

```bash
npm run format
npm run lint
npm run check
npm test
npm run build
```

CI runs all of these on every pull request.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), because the release bot reads them to choose the next version and write the changelog.

| Prefix                                      | Effect on the release |
| ------------------------------------------- | --------------------- |
| `feat: add a topic on event sourcing`       | minor version bump    |
| `fix: correct the isolation levels table`   | patch version bump    |
| `docs:`, `chore:`, `ci:`, `test:`, `style:` | no release            |

Add `!` after the prefix (`feat!:`) for a breaking change.

## Releases

Releases are automatic. When changes land on `main`, [release-please](https://github.com/googleapis/release-please) opens or updates a release pull request with the new version and changelog. Merging that pull request creates the Git tag and the GitHub release.

## Code of conduct

By taking part you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
