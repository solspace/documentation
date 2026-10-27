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
