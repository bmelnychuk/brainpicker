/* @flow */

import format from 'string-format';
import strings from './strings.json';

export default class Resources {
    getString(label: string, params: ?{ [string]: string }): string {
        const message = strings[label];
        return params ? format(message, params) : message;
    }
}
