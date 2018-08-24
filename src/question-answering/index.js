/* @flow */

import AnswerQuestion from './application/usecase/AnswerQuestion';
import GetNextQuestion from './application/usecase/GetNextQuestion';
import QuestionStoreRepository from './infrastructure/repository/QuestionStoreRepository';
import TextEqualityAnswerValidationPolicy from './domain/policy/answer-validation/TextEqualityAnswerValidationPolicy';
import RandomNextQuestionPolicy from './domain/policy/next-question/RandomNextQuestionPolicy';

const questionGenerationPolicy = new RandomNextQuestionPolicy();
const answerValidationPolicy = new TextEqualityAnswerValidationPolicy();
const questionRepository = new QuestionStoreRepository();

const getNextQuestionUseCase = new GetNextQuestion(questionRepository, questionGenerationPolicy);
const answerQuestionUseCase = new AnswerQuestion(questionRepository, answerValidationPolicy);


export async function getNextQuestion(categoryId: string): Promise<{ id: string, question: string, answer: string}> {
    const question = await getNextQuestionUseCase.invoke(categoryId);
    return {
        id: question.id,
        question: question.body,
        answer: question.answer
    };
}

export async function answerQuestion(questionId: string, userAnswer: string): Promise<{ correctAnswer: string, isValid: boolean}> {
    const answerResult = await answerQuestionUseCase.invoke(questionId, userAnswer);
    return {
        correctAnswer: answerResult.correctAnswer,
        isValid: answerResult.isValid
    };
}
