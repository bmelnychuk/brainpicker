/* @flow */

import create from './provider';

console.log('Init data...');
create()
    .then(() => {
        console.log('Data created');
        process.exit(0);
    });
