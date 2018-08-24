/* @flow */

import uuidv3 from 'uuid/v5';
import axios from 'axios';
import { createCategory, createQuestion } from '../../question-store';

export default class RestCountiesProvider {
    async createCapitalCitiesQuestions(): Promise<void> {
        const response = await axios.get('https://restcountries.eu/rest/v2/all');
        const questions = response.data
            .filter(country => /^[a-zA-Z]+$/.test(country.capital) && /^[a-zA-Z]+$/.test(country.name))
            .map((country) => {
                const question = `What is the name of the capital city of ${country.name}?`;
                return {
                    id: uuidv3(question, uuidv3.DNS),
                    question,
                    answer: country.capital
                };
            });

        const title = 'Capital cities';
        const category = {
            id: uuidv3(title, uuidv3.DNS),
            keywords: ['cities', 'capital cities'],
            title,
            questionIds: questions.map(question => question.id)
        };

        await createCategory(category);
        await Promise.all(questions.map(question => createQuestion(question)));
    }
}
