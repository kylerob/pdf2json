import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const _pdfjsFiles = [
   'shared/util.js',
   'shared/colorspace.js',
   'shared/pattern.js',
   'shared/function.js',
   'shared/annotation.js',

   'core/core.js',
   'core/obj.js',
   'core/charsets.js',
   'core/crypto.js',
   'core/evaluator.js',
   'core/fonts.js',
   'core/font_renderer.js',
   'core/glyphlist.js',
   'core/image.js',
   'core/metrics.js',
   'core/parser.js',
   'core/stream.js',
   'core/worker.js',
   'core/jpx.js',
   'core/jbig2.js',
   'core/bidi.js',
   'core/jpg.js',
   'core/chunked_stream.js',
   'core/pdf_manager.js',
   'core/cmap.js',
   'core/cidmaps.js',

   'display/canvas.js',
   'display/font_loader.js',
   'display/metadata.js',
   'display/api.js',
];

const baseDir = `${__dirname}/../base/`;
const _baseCode = _pdfjsFiles.reduce(
   (preContent, fileName, idx, arr) =>
      (preContent += fs.readFileSync(baseDir + fileName, 'utf8')),
   ''
);

fs.writeFileSync(__dirname + '/../pdfjs-code.js',
  `
  ${'import nodeUtil from \'util\';'}
  ${'import Image from \'./lib/pdfimage.js\';'}
  ${'export const PDFJS = {};'}
  ${'const globalScope = { console };'}
  ${_baseCode}
  `,
    {
      encoding: "utf8",
      mode: 0o666
    });
