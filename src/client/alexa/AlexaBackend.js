/* @flow */

import { findCategories } from '../../question-store';
import { answerQuestion, getNextQuestion } from '../../question-answering';

export default class AlexaBackend {
    async findCategory(keyword: string): Promise<{ id: string, title: string}> {
        const categories = await findCategories(keyword);
        return categories[0];
    }

    nextQuestion(categoryId: string): Promise<{ id: string, question: string, answer: string}> {
        return getNextQuestion(categoryId);
    }

    answerQuestion(questionId: string, userAnswer: string): Promise<{ correctAnswer: string, isValid: boolean }> {
        return answerQuestion(questionId, userAnswer);
    }
}
