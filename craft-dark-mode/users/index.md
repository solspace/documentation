---
sidebar_position: 1
title: Using darkMode
description: Choose your appearance and know what to expect.
slug: /users
---

import { FaqCards } from '@site/src/components/docs';

## Choose your appearance

Click the appearance icon beside your account avatar in Craft’s top bar. Each click cycles **Auto → Light → Dark → Auto**. Hover over the icon to see the current choice.

| Option | What it does |
| --- | --- |
| **Auto** | Follows your computer’s light or dark appearance. This is the default. |
| **Light** | Keeps Craft in its usual light appearance. |
| **Dark** | Keeps the control panel dark. |

Your choice applies immediately and saves to your Craft account. It also stays in sync across open tabs on the same site. You can change it any time, and it does not affect anyone else’s preference.

If you do not see the icon, ask your site administrator to [install darkMode](installation.md).

## What to expect

Craft’s layout and controls stay familiar. darkMode adjusts their colors, along with supported plugin interfaces. Any included compatibility adjustments load automatically; there is nothing extra for you to configure.

Your public website, uploaded images, and authored content keep their own styling. A website or email preview may therefore look different from the surrounding control panel.

See [Plugin Compatibility](compatibility.md) for the versions last checked.

## Frequently asked questions

<FaqCards
  items={[
    {
        "title": "Does darkMode change Craft’s regular Light appearance?",
        "description": "<strong>No.</strong> Light uses Craft’s regular appearance, without darkMode’s color overrides. You can switch back to Light at any time."
    },
    {
        "title": "Does my choice affect anyone else?",
        "description": "No. Each person chooses their own appearance. Your choice is saved to your Craft account and does not change your colleagues’ preferences."
    },
    {
        "title": "Will it change my website, images, or content?",
        "description": "No. darkMode changes the control panel’s appearance. It does not recolor your uploaded images or change your website’s design or saved content."
    },
    {
        "title": "Why are some previews still light?",
        "description": "Website and email previews keep their own styling so you can see the content as designed. Some email editors offer a dark editing view without changing the saved design or outgoing email."
    },
    {
        "title": "Do I need to configure each plugin separately?",
        "description": "No. Included adapters load automatically. See <a href=\"../compatibility/\">Plugin Compatibility</a> for the versions checked and which include an adapter."
    },
    {
        "title": "Why does the appearance change with my computer’s settings?",
        "description": "<strong>Auto</strong> follows your computer’s light or dark appearance. Choose <strong>Light</strong> or <strong>Dark</strong> to keep the control panel in that appearance instead."
    },
    {
        "title": "Will darkMode slow down my control panel?",
        "description": "darkMode adds some browser rendering work. Our current rough estimate is about <strong>50 ms (0.05 seconds)</strong> of additional initial rendering time. This is not a verified average or an upper limit. The overhead varies with the page, installed plugins, browser, and hardware, and complex pages can take longer. This refers to initial rendering, rather than total page-load time."
    },
    {
        "title": "Is darkMode free?",
        "description": "Yes. darkMode is free and open source under the MIT license."
    }
]}
/>

## If something looks wrong

You can switch to **Light** at any time. Report the affected screen to your site administrator or [Solspace Support](https://docs.solspace.com/support/), with the plugin version and screenshots in both appearances. Remove private information first.

If your choice cannot be saved, use **Retry** beside the appearance icon. The current page keeps the appearance you selected. If the problem continues, reload or sign in again, then retry.
