import { type PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    color: '#ffffff',
    backgroundColor: 'rgb(31 45 59)',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'block-comment'],
      style: {
        color: '#999',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#ccc',
      },
    },
    {
      types: ['tag', 'deleted', 'attr-name', 'namespace'],
      style: {
        color: '#e2777a',
      },
    },
    {
      types: ['function-name'],
      style: {
        color: '#6196cc',
      },
    },
    {
      types: ['function', 'boolean', 'number'],
      style: {
        color: '#f08d49',
      },
    },
    {
      types: ['class-name', 'constant', 'property', 'symbol'],
      style: {
        color: '#f8c555',
      },
    },
    {
      types: ['atrule', 'builtin', 'important', 'keyword', 'selector'],
      style: {
        color: '#cc99cd',
      },
    },
    {
      types: ['attr-value', 'char', 'regex', 'string', 'variable'],
      style: {
        color: '#7ec699',
      },
    },

    {
      types: ['entity', 'operator', 'url'],
      style: {
        color: '#67cdcc',
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
        opacity: 0.7,
      },
    },
    {
      types: ['deleted'],
      style: {
        backgroundColor: 'rgba(255,0,24,.15)',
      },
    },
    {
      types: ['inserted'],
      style: {
        backgroundColor: 'rgba(60,255,0,.15)',
      },
    },
    {
      types: ['line-highlight'],
      style: {
        backgroundColor: 'rgb(9 19 32)',
      },
    },
  ],
};

export default theme;
