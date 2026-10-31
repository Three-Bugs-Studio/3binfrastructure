# Contributing

Thanks for helping improve 3B Infrastructure. Fixing a wrong explanation is just as valuable as adding a new topic.

## How to contribute

The `main` branch is protected, so all changes arrive through a fork:

1. [Fork this repository](https://github.com/Three-Bugs-Studio/3binfrastructure/fork) to your own account.
2. Clone your fork and create a branch for your change.
3. Push the branch to your fork and open a pull request against `main`.
4. A maintainer reviews it. CI must pass and the pull request needs one approval before a maintainer merges it.

For your first contribution, a maintainer has to approve the CI run before it starts.

## Getting started

You need Node.js 24 or newer.

```bash
git clone https://github.com/YOUR-USERNAME/3binfrastructure.git
cd 3binfrastructure
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
| An AWS topic                     | [`src/lib/aws.ts`](src/lib/aws.ts)                                                                 |
| A DevOps topic                   | [`src/lib/devops.ts`](src/lib/devops.ts)                                                           |
| A VPS deployment step            | [`src/lib/vps.ts`](src/lib/vps.ts)                                                                 |
| An engineering subject           | [`src/lib/subjects/`](src/lib/subjects/)                                                           |
| The course list                  | [`src/lib/courses.ts`](src/lib/courses.ts)                                                         |
| How diagrams or topics are drawn | [`src/lib/Sketch.svelte`](src/lib/Sketch.svelte), [`src/lib/Topics.svelte`](src/lib/Topics.svelte) |
| How demos play                   | [`src/lib/Demo.svelte`](src/lib/Demo.svelte)                                                       |

Diagrams are lists of nodes and edges. Node `x` and `y` are the centre of the shape, on a canvas 480 wide and `h` tall.

Every topic needs an animated demo. Each entry in `steps` describes one whole picture: `say` is the caption, `send` moves dots between nodes, and `light`, `down`, `hide` and `set` circle, cross out, hide or relabel nodes for that step. A caption starting `SKIPPED:` or `SET UP:` gets a coloured stamp.

`npm test` fails if a topic has no demo, a node leaves the canvas or overlaps another, or a step mentions a node that does not exist.

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
