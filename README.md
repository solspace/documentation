# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

### Dependency security

Run `pnpm audit` to check the lockfile for known vulnerabilities. Security overrides in
`pnpm-workspace.yaml` keep Docusaurus's transitive dependencies on patched releases;
retain them until the upstream dependency ranges include those fixes.

`deepmerge` 4.3.1 has no published fix for
[CVE-2026-93753 / GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4).
The pnpm patch in `patches/deepmerge@4.3.1.patch` rejects `__proto__` keys before
copying either input, including null-prototype targets and nested primitive
placeholders. It covers the source, CommonJS and browser distributions, following
the narrowly scoped change proposed in [upstream PR #274](https://github.com/TehShrike/deepmerge/pull/274).
`pnpm install --frozen-lockfile` applies it automatically. Run `pnpm test:security`
to check the regression cases and SVG/video configuration compatibility.
Keep the patch until a verified upstream fix replaces it. Package audits and
Dependabot may continue flagging version 4.3.1 because they do not evaluate local
patches; the advisory is not suppressed or dismissed.

The previous `braces` advisory,
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), was withdrawn
on October 23, 2026, and is no longer reported by the package audit.

### Local Development

```
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true pnpm deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Update Changelogs

```
$ pnpm fetch-github-remote-content
```
