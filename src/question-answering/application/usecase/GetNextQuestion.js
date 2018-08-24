/* @flow */

import type { QuestionRepository } from '../../domain/repository/QuestionRepository';
import type { NextQuestionPolicy } from '../../domain/policy/next-question/NextQuestionPolicy';
import Question from '../../domain/entity/Question';

export default class GetNextQuestion {
    questionRepository: QuestionRepository;
    nextQuestionPolicy: NextQuestionPolicy;

    constructor(
        questionRepository: QuestionRepository,
        nextQuestionPolicy: NextQuestionPolicy
    ) {
        this.questionRepository = questionRepository;
        this.nextQuestionPolicy = nextQuestionPolicy;
    }

    async invoke(categoryId: string): Promise<Question> {
        const availableQuestions = await this.questionRepository.getAvailableQuestions(categoryId);
        return this.nextQuestionPolicy.getNextQuestion(availableQuestions);
    }
}
