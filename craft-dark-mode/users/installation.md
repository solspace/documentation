---
sidebar_position: 2
title: Installation & Updates
description: Requirements and instructions for installing, updating, disabling, and removing Dark Mode for Craft CMS 5.
slug: /setup/installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Badge } from '@site/src/components/utils';
import { FlexCards, VerticalStepWrapper, StepMarkdown } from '@site/src/components/docs';
import Icons from '@site/static/icons/cards';

<FlexCards
  navCards
  items={[
    {
      title: 'Requirements',
      description: 'Check what your site needs to run Dark Mode.',
      icon: Icons.ClipboardIcon,
      fullCardLink: '#requirements',
    },
    {
      title: 'Installation',
      description: 'Install Dark Mode through Composer or the Plugin Store.',
      icon: Icons.BoxIcon,
      fullCardLink: '#installation',
    },
    {
      title: 'Updating',
      description: 'Update to the latest release of Dark Mode 1.x.',
      icon: Icons.UpdateArrowsIcon,
      fullCardLink: '#updating',
    },
    {
      title: 'Disabling',
      description: 'Temporarily turn off Dark Mode for your site.',
      icon: Icons.StopIcon,
      fullCardLink: '#disabling',
    },
    {
      title: 'Uninstalling',
      description: 'Remove Dark Mode from your site.',
      icon: Icons.RecycleIcon,
      fullCardLink: '#uninstalling',
    },
  ]}
/>

## Requirements

Dark Mode 1.x requires:

- **Craft CMS 5.x**
- **PHP 8.2 or later within PHP 8.x**

Your site must also meet [Craft 5’s system requirements](https://craftcms.com/docs/5.x/requirements.html). Use a current version of Chrome, Edge, Firefox, or Safari.

Dark Mode is free and open source. There are no paid editions or license purchases.

## Installation

Install Dark Mode using Composer or the Craft Plugin Store.

<Tabs>
  <TabItem value="install-cli" label="Composer (CLI)" default>

    Run these commands in your terminal. <Badge type="recommended" text="Recommended" />

    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Open your Craft project">

        ```sh
        cd /path/to/project
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Get Dark Mode">
        <Tabs>
          <TabItem value="install-latest" label="Latest Version" default>

            ```sh
            composer require solspace/craft-dark-mode -w
            ```

          </TabItem>
          <TabItem value="install-specific" label="Specific Version">

            ```sh
            composer require solspace/craft-dark-mode:1.1.0 -w
            ```

          </TabItem>
        </Tabs>
      </StepMarkdown>
      <StepMarkdown stepTitle="Install Dark Mode">
        <Tabs>
          <TabItem value="activate-cli" label="CLI" default>

            ```sh
            php craft plugin/install dark-mode
            ```

          </TabItem>
          <TabItem value="activate-cp" label="Control Panel">

            To finish installation in the Craft control panel:

            1. Go to **Settings → Plugins**.
            2. Open Dark Mode’s action menu.
            3. Choose **Install**.

          </TabItem>
        </Tabs>
      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
  <TabItem value="install-cp" label="Control Panel">
    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Find Dark Mode">

        Open the **Plugin Store** in your Craft control panel and search for **Dark Mode** by Solspace.

      </StepMarkdown>
      <StepMarkdown stepTitle="Install the plugin">

        Open Dark Mode’s product page and click **Install**.

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
</Tabs>

Once installed, click the appearance icon beside your account avatar to [choose Auto, Light, or Dark](index.md#choose-your-appearance). There are no additional settings or build steps.

## Updating

Dark Mode has no content tables or database migrations. You can update it using Craft’s updater, Composer, or the control panel.

<Tabs>
  <TabItem value="update-cli" label="Craft Update (CLI)" default>

    Use Craft’s update command. <Badge type="recommended" text="Recommended" />

    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Open your Craft project">

        ```sh
        cd /path/to/project
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Check for updates">

        ```sh
        php craft update
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Update Dark Mode">
        <Tabs>
          <TabItem value="update-latest" label="Latest Version" default>

            ```sh
            php craft update dark-mode
            ```

          </TabItem>
          <TabItem value="update-specific" label="Specific Version">

            ```sh
            php craft update dark-mode:1.1.0
            ```

          </TabItem>
        </Tabs>
      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
  <TabItem value="update-composer" label="Composer (CLI)">

    Use Composer to update Dark Mode within the version allowed by your project.

    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Update composer.json">
        <Tabs>
          <TabItem value="composer-latest" label="Latest Versions" default>

            Use `^1.0.0` to allow updates within Dark Mode 1.x:

            ```json {4}
            {
              "require": {
                "craftcms/cms": "^5.0.0",
                "solspace/craft-dark-mode": "^1.0.0"
              }
            }
            ```

          </TabItem>
          <TabItem value="composer-locked" label="Locked Versions">

            If your project uses an exact version, change it to the release you want to install:

            ```diff
            "require": {
                "craftcms/cms": "^5.0.0",
            -   "solspace/craft-dark-mode": "1.0.0"
            +   "solspace/craft-dark-mode": "1.1.0"
            }
            ```

          </TabItem>
        </Tabs>
      </StepMarkdown>
      <StepMarkdown stepTitle="Open your Craft project">

        ```sh
        cd /path/to/project
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Get updates">

        ```sh
        composer update solspace/craft-dark-mode --with-dependencies
        ```

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
  <TabItem value="update-cp" label="Control Panel">
    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Check for updates">

        Open **Utilities → Updates** in the Craft control panel and review the available Dark Mode update.

      </StepMarkdown>
      <StepMarkdown stepTitle="Run the update">

        Click **Update** for Dark Mode and follow Craft’s prompts to finish the update.

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
</Tabs>

Check your team’s main screens after updating Dark Mode or another plugin. See [Plugin Compatibility](compatibility.md) for supported versions.

## Disable Dark Mode {#disabling}

Disable Dark Mode to temporarily turn it off for everyone without uninstalling it. To change only your own appearance, [choose Light](index.md#choose-your-appearance) instead.

<Tabs>
  <TabItem value="disable-cli" label="CLI" default>
    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Open your Craft project">

        ```sh
        cd /path/to/project
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Disable Dark Mode">

        ```sh
        php craft plugin/disable dark-mode
        ```

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
  <TabItem value="disable-cp" label="Control Panel">
    <VerticalStepWrapper>
      <StepMarkdown>

        Go to _Settings → Plugins_.

      </StepMarkdown>
      <StepMarkdown>

        Click the **Cog button** for Dark Mode.

      </StepMarkdown>
      <StepMarkdown>

        Select **Disable**.

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
</Tabs>

To turn it back on, choose **Enable** from the same menu or run `php craft plugin/enable dark-mode`.

## Uninstall Dark Mode {#uninstalling}

Uninstalling Dark Mode returns Craft to its normal appearance. It does not affect your site’s content, and you can reinstall it at any time.

<Tabs>
  <TabItem value="uninstall-cli" label="CLI" default>
    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Open your Craft project">

        ```sh
        cd /path/to/project
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Uninstall Dark Mode">

        ```sh
        php craft plugin/uninstall dark-mode
        ```

      </StepMarkdown>
      <StepMarkdown stepTitle="Remove the package">

        After uninstalling the plugin:

        ```sh
        composer remove solspace/craft-dark-mode
        ```

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
  <TabItem value="uninstall-cp" label="Control Panel">
    <VerticalStepWrapper>
      <StepMarkdown stepTitle="Uninstall Dark Mode">

        Go to **Settings → Plugins**, open Dark Mode’s action menu, and choose **Uninstall**.

      </StepMarkdown>
      <StepMarkdown stepTitle="Remove the package">

        From your Craft project directory:

        ```sh
        composer remove solspace/craft-dark-mode
        ```

      </StepMarkdown>
    </VerticalStepWrapper>
  </TabItem>
</Tabs>

To reinstall, follow the [installation steps](#installation) above. For help, contact [Solspace Support](https://docs.solspace.com/support/).
