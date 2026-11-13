---
sidebar_position: 3
title: Testing Your Plugin
description: A short checklist for light and dark compatibility.
---

Test your own components in actual **Light**, **Dark**, and **Auto** appearances. A clean initial screenshot does not cover loading or interactive states.

## Before release

- Reload in Dark and watch the loading shell for white flashes.
- Switch appearances while the page is open, then open menus, dialogs, editors, and dashboard widgets.
- Check hover, focus, selection, checked, disabled, readonly, hidden, and error states.
- Try drag/drop and unsaved rows, including action and checkbox cells.
- Check charts, tooltips, icons, spinners, and status messages for readable colors.
- Check editor menus, source dialogs, date pickers, and inline change highlights.
- Test dashboard widgets outside your plugin’s own section, including asynchronous loading and chart tooltips.
- Test each supported release range separately when an older version uses an adapter and a newer version provides its own appearance support.
- Confirm icon/text centering and matching control heights; include long translations and RTL when changing control layout.
- Preserve images, authored styles, and website/email previews.
- With Auto selected, change the operating system’s appearance.
- Disable darkMode and confirm your plugin still works normally.

Use a test site with synthetic data. Checking a notification preview or resend dialog does not require sending a real message.

## Record the result

Record the plugin version, check date, Craft/darkMode versions, and workflows tested. Record compatibility and adapter requirements separately. Keep separate rows for versions with different adapter requirements, and retain earlier checked versions instead of replacing their results. Mark a version compatible only after checking that specific build. Update the [compatibility table](../users/compatibility.md) only after performing the checks.

If reporting a problem, include steps to reproduce and matching light/dark screenshots with private information removed. Suggest a source-level change where possible, such as using a semantic hover surface or making a monochrome icon inherit `currentColor`. Fixing the component at its source reduces the need for external overrides.
