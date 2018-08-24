/* @flow */

import RestCountiesProvider from './rest-countries/RestCountiesProvider';

const restCountiesProvider = new RestCountiesProvider();

export default async function create(): Promise<void> {
    await Promise.all([
        restCountiesProvider.createCapitalCitiesQuestions()
    ]);
}
