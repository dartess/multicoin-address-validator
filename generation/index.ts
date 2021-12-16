import fs from 'fs';
import path from 'path';

import { currencies } from '../src/currencies';

const pathRoot = process.cwd();

// update readme.md

const pathReadmeTemplate = path.join(pathRoot, 'generation', 'README_TEMPLATE.md');
const pathReadme = path.join(pathRoot, 'README.md');

const readmeTemplate = fs.readFileSync(pathReadmeTemplate, { encoding: 'utf-8' });

const sortedCurrencies = [...currencies].sort((a, b) => a.name.localeCompare(b.name));

const readme = readmeTemplate.replace(
    '%CURRENCIES%',
    sortedCurrencies.map(({ symbol, name }) => `* ${name}/${symbol} \`'${name}'\` or \`'${symbol}'\``).join('\n'),
);

fs.writeFileSync(pathReadme, readme);

export {};
