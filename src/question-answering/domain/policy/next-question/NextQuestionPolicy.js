/* @flow */

import Question from '../../entity/Question';

export interface NextQuestionPolicy {
    getNextQuestion(availableQuestions: Question[]): Promise<Question>;
}
