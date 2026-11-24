import { type PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#26364b',
    backgroundColor: '#fbfcfd',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'block-comment'],
      style: {
        color: '#52637a',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#465870',
      },
    },
    {
      types: ['tag', 'deleted', 'attr-name', 'namespace'],
      style: {
        color: '#ad304d',
      },
    },
    {
      types: ['function-name'],
      style: {
        color: '#1955b5',
      },
    },
    {
      types: ['function', 'boolean', 'number'],
      style: {
        color: '#a63810',
      },
    },
    {
      types: ['class-name', 'constant', 'property', 'symbol'],
      style: {
        color: '#805100',
      },
    },
    {
      types: ['atrule', 'builtin', 'important', 'keyword', 'selector'],
      style: {
        color: '#7831a8',
      },
    },
    {
      types: ['attr-value', 'char', 'regex', 'string', 'variable'],
      style: {
        color: '#08734f',
      },
    },

    {
      types: ['entity', 'operator', 'url'],
      style: {
        color: '#126382',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: '#52637a',
      },
    },
    {
      types: ['deleted'],
      style: {
        backgroundColor: '#f7e1e7',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: '#08734f',
        backgroundColor: '#deeee5',
      },
    },
    {
      types: ['line-highlight'],
      style: {
        backgroundColor: '#dee9f7',
      },
    },
  ],
};

export default theme;
