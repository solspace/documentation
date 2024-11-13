import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import axios from 'axios';
import chalk from 'chalk';
import { Joi } from '@docusaurus/utils-validation';
import { LoadContext, Plugin } from '@docusaurus/types';

// Define types
interface Content {
  saveDir: string;
  version: number;
  file: string;
  url: string;
  header?: string;
  meta?: Record<string, any>;
  transform?: (content: Content, data: string) => string;
}

interface PluginOptions {
  cleanup?: boolean;
  liveFetch?: boolean;
  contents: Content[] | (() => Content[]);
}

// Plugin Option Schema
const PluginOptionSchema = Joi.object({
  cleanup: Joi.boolean(),
  liveFetch: Joi.boolean(),
  contents: Joi.alternatives()
    .try(
      Joi.array().items(
        Joi.object({
          saveDir: Joi.string().required(),
          version: Joi.number().required(),
          file: Joi.string().required(),
          url: Joi.string().required(),
          header: Joi.string(),
          meta: Joi.object(),
          transform: Joi.function(),
        })
      ),
      Joi.function()
    )
    .required(),
});

// Helper transformer function
function transformer(content: Content, data: string): string {
  const versionStr = `## ${content.version}.`;
  const lines = data.split('\n');
  const filteredLines = [];

  let insideVersion = false;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (line.startsWith(versionStr)) {
        insideVersion = true;
        filteredLines.push(line);
      } else {
        insideVersion = false;
      }
    } else if (insideVersion) {
      filteredLines.push(line);
    }
  }

  let filteredData = filteredLines.join('\n');

  // Remove [CRITICAL] text
  filteredData = filteredData.replace(/\s?\[CRITICAL\]/g, '');

  let df = '---\n';
  if (content.meta) {
    Object.entries(content.meta).forEach(
      ([key, value]) => (df += `${key}: ${value}\n`)
    );
  }
  df += '---\n\n';
  df += "import { TitleDate } from '@site/src/components/docs'\n\n";

  if (content.header) {
    df += content.header + '\n\n';
  }

  // Define a mapping for the tags
  const tagMapping = {
    warning: 'warning',
    important: 'important',
    note: 'note',
    tip: 'tip',
    caution: 'danger',
  };

  // Wrap specific warning and important messages with [!TYPE]
  filteredData = filteredData.replace(
    />\s*\[!(WARNING|IMPORTANT|NOTE|TIP|CAUTION)\][\s\S]*?(\n\n|$)/g,
    (match, type) => {
      const tag = tagMapping[type.toLowerCase()] || 'note';

      // Remove the leading '> [!TYPE]' part and any leading '>'
      const message = match
        .replace(/>\s*\[!(WARNING|IMPORTANT|NOTE|TIP|CAUTION)\]\s*/g, '')
        .replace(/^\s*>\s*/gm, '');
      return `:::${tag}\n${message.trim()}\n:::\n\n`;
    }
  );

  // Wrap {warning} or {tip} messages
  filteredData = filteredData.replace(
    />\s*\{(warning|tip)\}[\s\S]*?(\n\n|$)/g,
    (match, type) => {
      const tag = tagMapping[type.toLowerCase()] || 'note';

      // Remove the leading '> {TYPE}' part and any leading '>'
      const message = match
        .replace(/>\s*\{(warning|tip)\}\s*/g, '')
        .replace(/^\s*>\s*/gm, '');
      return `:::${tag}\n${message.trim()}\n:::\n\n`;
    }
  );

  // Wrap {count} and {max} with backticks
  filteredData = filteredData.replace(
    /{count}|{max}/g,
    (match) => `\`${match}\``
  );

  // Add TitleDate component to version titles
  filteredData = filteredData.replace(
    /^(## \d+\.\d+\.\d+(?:\.\d+)?)( - (\d{4}-\d{2}-\d{2}))?$/gm,
    (match, version, _, date) => {
      if (date) {
        return `${version}<TitleDate date="${date}" />`;
      }
      return version;
    }
  );

  return df + filteredData;
}

// Main plugin function
export default function pluginSitemap(
  context: LoadContext,
  options: PluginOptions
): Plugin<void> {
  const { contents, liveFetch, cleanup } = options;

  function getContents(): Content[] {
    if (typeof contents === 'function') {
      return contents.call(context.siteConfig);
    }
    return contents;
  }

  async function fetchContent(): Promise<void> {
    const contentsList = getContents();

    for (const content of contentsList) {
      const trans = content.transform || transformer;
      const { data } = await axios.get(content.url);
      const filePath = join(context.siteDir, content.saveDir, content.file);

      // Check if the file already exists
      const fileExists = existsSync(filePath);

      // If the file exists and cleanup is enabled, delete it
      if (fileExists && cleanup) {
        unlinkSync(filePath);
      }

      // Write the new content to the file
      writeFileSync(filePath, trans(content, data));
    }
  }

  async function cleanContent(): Promise<void> {
    const contentsList = getContents();

    for (const content of contentsList) {
      unlinkSync(join(context.siteDir, content.saveDir, content.file));
    }
  }

  return {
    name: `docusaurus-github-remote-content`,

    async loadContent(): Promise<void> {
      if (liveFetch) {
        await fetchContent();
      }
    },

    async postBuild(): Promise<void> {
      if (cleanup) {
        await cleanContent();
      }
    },

    extendCli(cli): void {
      cli
        .command(`fetch-github-remote-content`)
        .description(`Fetch the GitHub remote data.`)
        .action(async () => {
          const startTime = new Date();
          await fetchContent();
          console.log(chalk`{green Fetched remote content!}`);
        });

      cli
        .command(`clean-github-remote-content`)
        .description(`Wiped local copy of the remote content.`)
        .action(async () => {
          const startTime = new Date();
          await cleanContent();
          console.log(chalk`{green Successfully removed content!}`);
        });
    },
  };
}

export function validateOptions({
  validate,
  options,
}: {
  validate: any;
  options: PluginOptions;
}) {
  return validate(PluginOptionSchema, options);
}
