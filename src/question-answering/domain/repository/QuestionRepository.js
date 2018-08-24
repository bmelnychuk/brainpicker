/* @flow */

import Question from '../entity/Question';

export interface QuestionRepository {
    getAvailableQuestions(categoryId: string): Promise<Question[]>;
    getById(questionId: string): Promise<Question>;
}
