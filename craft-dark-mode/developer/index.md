---
sidebar_position: 1
title: Supporting Dark Mode
description: Concrete changes that reduce the need for a Dark Mode adapter.
slug: /developer
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

Craft’s native controls and semantic colors help your interface adapt to both light and dark appearances. Start there, then handle any custom components that need extra attention. The sections below cover the most common improvements.

**On this page**

<TOCInline toc={toc} maxHeadingLevel={2} />

## Use Craft’s controls

Use Craft’s layouts, form macros, buttons, and menus where they fit. They already provide consistent sizing, keyboard behavior, and focus treatment.

<Tabs>
<TabItem value="recommended" label="Recommended" default>

Craft supplies the control styling and interaction states.

```twig
{% import '_includes/forms.twig' as forms %}

{{ forms.textField({
  label: 'Name'|t('acme'),
  id: 'name',
  name: 'name',
}) }}

<button type="button" class="btn">{{ 'Add item'|t('acme') }}</button>
```

</TabItem>
<TabItem value="avoid" label="Avoid">

Fixed backgrounds and text colors keep these controls light when the surrounding interface changes.

```twig
<label for="name">{{ 'Name'|t('acme') }}</label>
<input id="name" name="name" type="text"
       style="background: #fff; color: #000; border: 1px solid #ccc;">

<button type="button" style="background: #eee; color: #000;">
  {{ 'Add item'|t('acme') }}
</button>
```

</TabItem>
</Tabs>

Avoid placing a second fixed-color design system over native controls. Keep custom styling scoped to your plugin’s own classes. Craft’s [control panel template guide](https://craftcms.com/docs/5.x/extend/cp-templates.html) covers the available layouts and form macros.

## Use colors by purpose

For custom UI, use Craft’s semantic variables instead of literal white panels, black text, or fixed gray borders:

<Tabs>
<TabItem value="recommended" label="Recommended" default>

Semantic variables let each surface, label, and link follow its role in the current appearance.

```css
.acme-card {
  background: var(--pane-bg, #fff);
  color: var(--text-color, #3f4d5a);
  border: 1px solid var(--hairline-color, #d8dee5);
}

.acme-card__description {
  color: var(--light-text-color, #596673);
}

.acme-card a {
  color: var(--link-color, #2457d6);
}
```

The fallback values keep this example usable if a variable is unavailable in a supported Craft version. The semantic roles adapt with the surrounding appearance.

</TabItem>
<TabItem value="avoid" label="Avoid">

Literal colors can leave a white card in Dark, or make secondary text and links difficult to read.

```css
.acme-card {
  background: #fff;
  color: #3f4d5a;
  border: 1px solid #d8dee5;
}

.acme-card__description {
  color: #596673;
}

.acme-card a {
  color: #2457d6;
}
```

</TabItem>
</Tabs>


| Your UI | Craft roles to use |
| --- | --- |
| Panel or dialog | `--pane-bg`, `--modal-bg` |
| Input | `--input-bg`, `--input-border-color` |
| Main and secondary text | `--text-color`, `--light-text-color` |
| Link | `--link-color` |
| Quiet divider | `--hairline-color` |
| Button and hover | `--button-bg`, `--button-text-color`, `--button-bg--hover` |
| Focus indicator | `--focus-ring-color` |
| Status message | Matching `--fg-success` / `--bg-success`, warning, error, or notice roles |

Use the roles available in your supported Craft versions. Keep Dark Mode’s internal `--dm-*` palette out of your plugin’s public styling contract.

## Make icons and states adapt too

For monochrome inline SVG icons, use `currentColor` so they follow their label:

<Tabs>
<TabItem value="recommended" label="Recommended" default>

The monochrome icon inherits its label’s color, including hover and disabled states.

```html
<svg viewBox="0 0 16 16" width="16" height="16"
     fill="none" stroke="currentColor" aria-hidden="true">
  <path d="M8 3v10M3 8h10" />
</svg>
```

</TabItem>
<TabItem value="avoid" label="Avoid">

A fixed black stroke can disappear against a dark surface even when the adjacent label is readable.

```html
<svg viewBox="0 0 16 16" width="16" height="16"
     fill="none" stroke="#000" aria-hidden="true">
  <path d="M8 3v10M3 8h10" />
</svg>
```

</TabItem>
</Tabs>

Keep multicolor logos, photographs, and uploaded artwork intact. Do not apply a blanket inversion filter.

Style the complete component, including states that appear later:

| State or component | What to do |
| --- | --- |
| Loading | Give the loading shell the same theme-aware surface as the mounted component, so it does not flash white. |
| Hover and selection | Update text and icons along with the surface; keep keyboard focus visible. |
| Disabled | Keep it muted but readable. An off toggle is still interactive and is not the same as a disabled toggle. |
| Tables | Match row, checkbox, action, and empty header cells. Apply readonly/hidden row treatment consistently. |
| Drag and drop | Style the dragged clone, placeholder, and dropzone, including helpers mounted outside the original container. |
| Composite inputs | Match the background behind inset Name/Address labels to their local surface. |

Check icon/text centering and the heights of neighboring controls. Include long translated labels and right-to-left layouts when changing controls or pickers.

## Give custom components a theme contract

A chart or editor may need its own palette and redraw call. A shadow-root component can inherit CSS variables through its host, or expose a theme option. Initialize from the current appearance when it mounts and update it when the appearance changes.

Use component lifecycle events. Avoid page-wide observers or polling to repair styling after the fact. Keep interface colors separate from authored HTML, images, website previews, and email designs.

See [Custom Components & Optional Adapters](integration.md) only if the component needs an explicit integration. Use the [testing checklist](testing.md) before calling the work complete.
