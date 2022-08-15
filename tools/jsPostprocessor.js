import { readFileSync, writeFileSync } from 'fs';

const file = readFileSync(process.argv[2], 'utf8');
writeFileSync(process.argv[2], '"use strict";' + file.slice(106));
