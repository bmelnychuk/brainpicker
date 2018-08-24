/* @flow */

import type { QuestionRepository } from '../../domain/repository/QuestionRepository';
import Question from '../../domain/entity/Question';
import { getQuestions, getQuestion } from '../../../question-store';

export default class QuestionStoreRepository implements QuestionRepository {
    async getAvailableQuestions(categoryId: string): Promise<Question[]> {
        const rawQuestions = await getQuestions(categoryId);
        return rawQuestions.map(rawQuestion => new Question(
            rawQuestion.id,
            rawQuestion.question,
            rawQuestion.answer
        ));
    }

    async getById(questionId: string): Promise<Question> {
        const rawQuestion = await getQuestion(questionId);
        return new Question(
            rawQuestion.id,
            rawQuestion.question,
            rawQuestion.answer
        );
    }
}
