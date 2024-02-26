import replace from '@rollup/plugin-replace';
import path from 'path';
import inject from 'rollup-plugin-inject';
import builtins from 'rollup-plugin-node-builtins';

export default [
   {
      input: './pdfparser.js',
      external: [
         'fs',
         'util',
         'fs/promises',
         'events',
         'path',
         'url',
         'buffer',
         '@xmldom/xmldom',
         'stream',
      ],
      output: {
         file: 'pdfparser.cjs',
         format: 'cjs',
         // exports: 'named',
      },
      treeshake: false,
      plugins: [
         replace({
            '../base': '/base/',
            delimiters: ['/', '/'],
         }),
         builtins(),
         inject({
            createScratchCanvas: [path.resolve( 'lib/pdfcanvas.js' ), 'createScratchCanvas']
         })
      ],
   },
];
