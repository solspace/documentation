---
sidebar_position: 2
title: Custom Components & Optional Adapters
description: Handle independent rendering and add a small adapter only when needed.
---

Use this guide for charts, embedded editors, shadow roots, or a component that cannot rely on semantic CSS alone. Ordinary controls should start with the [main developer guide](index.md).

## Read the actual appearance

darkMode sets these attributes on the document’s `html` element:

| Attribute | Values |
| --- | --- |
| `data-dark-mode` | Resolved appearance: `light` or `dark` |
| `data-dark-mode-preference` | User choice: `auto`, `light`, or `dark` |

Render using the resolved appearance. A system media query alone is not enough: the user may have explicitly selected Light or Dark.

Initialize when your component mounts, then listen for changes:

```js
function connectAppearance(component) {
  const update = () => {
    const root = document.documentElement;
    const colors = getComputedStyle(root);

    // Illustrative API: use your editor/chart library's actual theme method.
    component.setAppearance({
      theme: root.dataset.darkMode || 'light',
      text: colors.getPropertyValue('--text-color').trim() || '#3f4d5a',
      surface: colors.getPropertyValue('--pane-bg').trim() || '#fff',
    });
  };

  update();
  document.addEventListener('craft-dark-mode:change', update);
  return () => document.removeEventListener('craft-dark-mode:change', update);
}
```

Call the returned cleanup when the component unmounts. The change event’s `detail` contains `mode`, `theme`, and `source`; an initial event may already have fired before the component mounted. Canvas charts must redraw to update existing pixels.

For an editor or shadow root you own, expose semantic variables, CSS parts, or a theme API rather than requiring another plugin to inspect its internals. An iframe is a separate document; cross-origin frames require cooperation from their owner. Preserve authored content and preview styling.

## If an adapter is still needed

Keep it small, in a named compatibility file, and scope it to the component. Register this optional handler during your plugin/module initialization, before the control-panel layout renders:

```php
use craft\events\RegisterComponentTypesEvent;
use Solspace\DarkMode\Plugin as DarkMode;
use yii\base\Event;
use acme\plugin\web\DarkModeCompatibilityAsset;

if (class_exists(DarkMode::class)) {
    Event::on(
        DarkMode::class,
        DarkMode::EVENT_REGISTER_COMPATIBILITY_ASSETS,
        static function (RegisterComponentTypesEvent $event): void {
            $event->types[] = DarkModeCompatibilityAsset::class;
        }
    );
}
```

Use Craft’s `RegisterComponentTypesEvent`, appending your asset-bundle class to `types`. The guard keeps darkMode optional.

In your own plugin, create a bundle with a sibling `resources` directory:

```php
<?php

namespace acme\plugin\web;

use craft\web\AssetBundle;
use Solspace\DarkMode\web\DarkModeAsset;

final class DarkModeCompatibilityAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = __DIR__ . '/resources';
        $this->depends = [DarkModeAsset::class];
        $this->css = ['dark-mode-compatibility.css'];
        parent::init();
    }
}
```

The dependency loads darkMode’s assets first. This hook runs in both appearances, so dark-only rules still need a selector such as `html[data-dark-mode="dark"] .acme-widget`.

For ordinary semantic CSS, use your existing [Craft asset bundle](https://craftcms.com/docs/5.x/extend/asset-bundles.html); no darkMode hook is necessary. Never edit vendor files or replace Craft’s core templates. Review adapters separately for major plugin releases—Calendar 5’s adapter, for example, is not enabled for Calendar 6.

## Keep compatibility assets focused

darkMode loads built-in adapters only for enabled plugins. Adapters can also be limited to a release range or control-panel section. Calendar 5 uses an adapter, while Freeform 5.18 and later provide their own appearance integration.

Keep assets for embedded fields and dashboard widgets separate from styles used only on your plugin’s pages. Load page-only rules in the relevant section so they do not add styling work elsewhere in Craft. Use your own plugin’s version and route checks when registering an optional bundle.

Freeform’s legacy adapter illustrates this split. Its 5.0 through 5.17 widget and chart adjustments are available across the control panel, while its builder and editor assets load only on Freeform pages. All Freeform adapters stop before 5.18, including 5.18 prereleases.

These integration APIs are available in darkMode 1.0.0.
