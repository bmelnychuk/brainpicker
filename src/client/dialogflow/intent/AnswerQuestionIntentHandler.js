/* @flow */

import type { RequestHandler } from './RequestHandler';
import DialogFlowRequest from '../agent/DialogFlowRequest';
import DialogFlowResponse from '../agent/DialogFlowResponse';
import DialogFlowBackend from '../DialogFlowBackend';
import Resources from '../resources/Resources';

export default class AnswerQuestionIntentHandler implements RequestHandler {
    dialogFlowBackend: DialogFlowBackend;
    resources: Resources;

    constructor(dialogFlowBackend: DialogFlowBackend, resources: Resources) {
        this.dialogFlowBackend = dialogFlowBackend;
        this.resources = resources;
    }

    canHandle(request: DialogFlowRequest): boolean {
        return request.getIntent() === 'AnswerQuestion';
    }

    async handle(request: DialogFlowRequest): Promise<DialogFlowResponse> {
        const categoryId = request.getParam('categoryId');
        const questionId = request.getParam('questionId');
        const userAnswer = request.getParam('answer');

        const answerResult = await this.dialogFlowBackend.answerQuestion(questionId, userAnswer);
        const nextQuestion = await this.dialogFlowBackend.nextQuestion(categoryId);

        const answerResponse = answerResult.isValid ?
            this.resources.getString('ANSWER_CORRECT')
            :
            this.resources.getString('ANSWER_INCORRECT', { answer: answerResult.correctAnswer });
        const nextQuestionText = nextQuestion.question;

        return new DialogFlowResponse(
            request,
            `${answerResponse} ${nextQuestionText}`,
            categoryId,
            {
                questionId: nextQuestion.id,
                questionText: nextQuestion.question,
                questionAnswer: nextQuestion.answer
            }
        );
    }
}
