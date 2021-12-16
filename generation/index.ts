/* eslint-disable @typescript-eslint/no-use-before-define,global-require,import/no-dynamic-require */

import fs from 'fs';
import path from 'path';

import { currencies } from '../src/currencies';

const sortedCurrencies = [...currencies].sort((a, b) => a.name.localeCompare(b.name));

updateReadme();
updatePackage();

function updateReadme() {
    const pathReadmeTemplate = path.join(process.cwd(), 'generation', 'README_TEMPLATE.md');
    const pathReadme = path.join(process.cwd(), 'README.md');

    const readmeTemplate = fs.readFileSync(pathReadmeTemplate, { encoding: 'utf-8' });

    const readme = readmeTemplate.replace(
        '%CURRENCIES%',
        sortedCurrencies.map(({ symbol, name }) => `* ${name}/${symbol} \`'${name}'\` or \`'${symbol}'\``).join('\n'),
    );

    fs.writeFileSync(pathReadme, readme);
}

function updatePackage() {
    const pathPackage = path.join(process.cwd(), 'package.json');
    const packageContent = require(pathPackage);
    packageContent.keywords = sortedCurrencies.map(({ symbol, name }) => [name, symbol]).flat();
    fs.writeFileSync(pathPackage, `${JSON.stringify(packageContent, null, 4)}\n`);
}

export {};
