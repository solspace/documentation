# darkMode documentation draft

Local review branch: `codex/dark-mode-docs`, based on `feat/fc_5.18`.

This branch adds a Docusaurus docs instance at `/craft/dark-mode/v1/`, using the existing shared sidebar, product navigation, logo, metadata, and card components. It is a review draft; no deployment or publication is part of this work. The source pages intentionally remain buildable so the complete area can be previewed and link-checked.

## Preview

Use Node 24. Follow the repository README to install its pinned dependencies before starting development:

```sh
pnpm start --host 127.0.0.1 --port 3100 --no-open
```

Open `http://127.0.0.1:3100/craft/dark-mode/v1/`. Switch the documentation site's own light/dark toggle to review both appearances.

## Editorial scope

Seven pages following a standard getting-started and developer flow:

- **Getting Started:** choosing an appearance, installation/update/removal for site admins, and a dated compatibility table. Technical integration details stay out of the user guide.
- **Developer:** concrete native-control, semantic-color, icon, and state examples; optional chart/editor and asset-bundle integration; a short release checklist.

The compatibility dates/versions come from the darkMode repository’s 2026-11-07 local QA record, cross-checked against the QA site's Composer lockfile. This documentation edit is not a fresh plugin audit. Compatibility and adapter requirements are separate columns. Each checked build has its own result; versions with different adapter needs should have separate rows. At the user’s request, Calendar 6.x is shown as the compatible parent row without an adapter to preview the version hierarchy. It is an unreleased, assumed-compatible draft entry, not a completed QA result; its check date is intentionally blank. Calendar 5.0.33 is the indented earlier-version row with its included adapter and recorded date. Verify Calendar 6 and replace the placeholder version/date before publication.

## Before publication

- Confirm the release version and package distribution; replace local-checkout installation instructions when public distribution exists.
- Review the beta API examples against the release tag.
- Confirm supported plugin versions with recorded workflow checks; the current table is an adapter inventory, not a version certification.
- Keep the opt-in comparison helper out of public documentation; its environment flag is documented only in the plugin’s development notes.
- Replace the generic Solspace social image if a darkMode social asset is available.
- Configure and run the hosted search crawler for `docs-craft-dark-mode-current`; adding the tag mapping does not create an Algolia index.
- Review the full branch against its base before merging into the publication branch. No remote changelog fetch was added for the unpublished package.

## Validation notes

- Production Docusaurus build passed. All seven pages, headings, internal links, and anchors were checked. The existing HTML-minifier warnings are limited to archived Freeform v3/v4 and ExpressionEngine Classic pages.
- TypeScript (`tsc --noEmit`) passed.
- PHP asset-bundle/event examples passed `php -l`; the JavaScript integration function passed `node --check`. This checks syntax, not execution inside a Craft project.
- Browser review covered the overview, compatibility table, and developer guide in the documentation site's actual light and dark themes, including navigation, tables, and icon/text alignment. The new content reuses existing site components; the two audience cards use the existing responsive layout utilities. No shared stylesheet was changed.
- The existing security suite reports 9 passes and 15 failures with this machine's current installed dependencies. Its tests, package manifests, lockfile, and workspace dependency policy are unchanged from the branch base. Installed Joi (17.13.8), minimatch (3.1.5), and follow-redirects (1.16.1) do not match the repository's pinned overrides; deepmerge's patch tests also fail. This draft does not update dependencies or claim those checks passed. Refresh the pinned dependency installation and rerun the suite before a publication release.

The review preview was served from the generated production output on loopback only. Hosted search indexing and publication have not been performed.
