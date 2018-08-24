/* @flow */

import Question from '../model/Question';

export interface QuestionRepository {
    save(question: Question): Promise<Question>;
    getById(id: string): Promise<Question>;
}
