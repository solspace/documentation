import type { LoadedContent } from '@docusaurus/plugin-content-docs';
import type { Plugin } from '@docusaurus/types';

const maxDescriptionLength = 190;

function shortenDescription(description: string): string {
  const text = description.replace(/\s+/g, ' ').trim();
  if (text.length <= maxDescriptionLength) return text;

  const excerpt = text.slice(0, maxDescriptionLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  return `${lastSpace > 0 ? excerpt.slice(0, lastSpace) : excerpt}…`;
}

export default function searchDescriptions(): Plugin {
  return {
    name: 'search-descriptions',
    async allContentLoaded({ allContent, actions }) {
      const docs = Object.values(allContent['docusaurus-plugin-content-docs'] ?? {}) as LoadedContent[];
      const descriptions: Record<string, string> = {};

      for (const { loadedVersions } of docs) {
        for (const { docs: versionDocs } of loadedVersions) {
          for (const doc of versionDocs) {
            if (doc.draft || doc.unlisted || !doc.description.trim()) continue;
            descriptions[doc.permalink.replace(/\/+$/, '')] = shortenDescription(doc.description);
          }
        }
      }

      await actions.createData('descriptions.json', JSON.stringify(descriptions));
    },
  };
}
