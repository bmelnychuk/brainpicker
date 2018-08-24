/* @flow */

import type { QuestionRepository } from '../../domain/repository/QuestionRepository';
import type { AnswerValidationPolicy } from '../../domain/policy/answer-validation/AnswerValidationPolicy';

export class AnswerResult {
    userAnswer: string;
    isValid: boolean;
    correctAnswer: string;

    constructor(userAnswer: string, isValid: boolean, correctAnswer: string) {
        this.isValid = isValid;
        this.userAnswer = userAnswer;
        this.correctAnswer = correctAnswer;
    }
}

export default class AnswerQuestion {
    questionRepository: QuestionRepository;
    answerValidationPolicy: AnswerValidationPolicy;

    constructor(
        questionRepository: QuestionRepository,
        answerValidationPolicy: AnswerValidationPolicy
    ) {
        this.questionRepository = questionRepository;
        this.answerValidationPolicy = answerValidationPolicy;
    }

    async invoke(questionId: string, userAnswer: string): Promise<AnswerResult> {
        const question = await this.questionRepository.getById(questionId);

        const isAnswerCorrect = await this.answerValidationPolicy.isAnswerValid(
            userAnswer,
            question.answer
        );

        return new AnswerResult(userAnswer, isAnswerCorrect, question.answer);
    }
}
