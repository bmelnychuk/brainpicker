/* @flow */

import type { NextQuestionPolicy } from './NextQuestionPolicy';
import Question from '../../entity/Question';

export default class RandomNextQuestionPolicy implements NextQuestionPolicy {
    async getNextQuestion(availableQuestions: Question[]): Promise<Question> {
        if (availableQuestions.length === 0) throw new Error('Next question is not available');
        const nextRandomIndex = RandomNextQuestionPolicy.getRandomInt(0, availableQuestions.length - 1);
        return Promise.resolve(availableQuestions[nextRandomIndex]);
    }

    /**
     * Returns a random number between min and max [min, max]
     */
    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * ((max - min) + 1)) + min;
    }
}
