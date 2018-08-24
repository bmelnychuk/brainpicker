/* @flow */

import type { RequestHandler } from './RequestHandler';
import DialogFlowBackend from '../DialogFlowBackend';
import DialogFlowResponse from '../agent/DialogFlowResponse';
import DialogFlowRequest from '../agent/DialogFlowRequest';
import Resources from '../resources/Resources';

export default class DontKnowAnswerIntentHandler implements RequestHandler {
    dialogFlowBackend: DialogFlowBackend;
    resources: Resources;

    constructor(dialogFlowBackend: DialogFlowBackend, resources: Resources) {
        this.dialogFlowBackend = dialogFlowBackend;
        this.resources = resources;
    }

    canHandle(request: DialogFlowRequest): boolean {
        return request.getIntent() === 'DontKnowAnswer';
    }

    async handle(request: DialogFlowRequest): Promise<DialogFlowResponse> {
        const categoryId = request.getParam('categoryId');
        const questionAnswer = request.getParam('questionAnswer');

        const nextQuestion = await this.dialogFlowBackend.nextQuestion(categoryId);

        const answerResponse = this.resources.getString('ANSWER_INCORRECT', { answer: questionAnswer });
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
