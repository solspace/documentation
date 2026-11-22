---
sidebar_position: 3
title: Plugin Compatibility
description: Versions last checked and how their appearance is supported.
slug: /compatibility
---

import CompatibilityTable from '@site/src/components/docs/CompatibilityTable';
import compatibility from './_compatibility.json';


darkMode applies its built-in styles to the Craft CMS control panel and includes adapters for plugins that needed styling adjustments during compatibility testing. Adapters load automatically and require no configuration. The **Adapter included** column shows whether darkMode supplies styling for the listed version or release line. For Craft CMS, this refers to the built-in control panel styles.

**Latest checked** records the exact release included in a compatibility review, which may cover upgrade and release-note checks or browser testing. **Since** shows the earliest reviewed release in the same major version. Compatibility is expected between that release and the latest one reviewed. A comma-separated list identifies individually reviewed releases across major versions. Nearby patch and minor releases may also work. A release line such as `6.x` describes compatibility across that line, with any dated review tied to an exact version.

<CompatibilityTable rows={compatibility} />

## Need help?

If a screen looks wrong, [switch to Light and report it](index.md#if-something-looks-wrong). Include the affected plugin’s version and screenshots in both appearances.
