/* @flow */

import type { RequestHandler } from './RequestHandler';
import DialogFlowRequest from '../agent/DialogFlowRequest';
import DialogFlowResponse from '../agent/DialogFlowResponse';
import DialogFlowBackend from '../DialogFlowBackend';
import Resources from '../resources/Resources';

export default class StartAnsweringIntentHandler implements RequestHandler {
    dialogFlowBackend: DialogFlowBackend;
    resources: Resources;

    constructor(dialogFlowBackend: DialogFlowBackend, resources: Resources) {
        this.dialogFlowBackend = dialogFlowBackend;
        this.resources = resources;
    }

    canHandle(request: DialogFlowRequest): boolean {
        return request.getIntent() === 'StartAnswering';
    }

    async handle(request: DialogFlowRequest): Promise<DialogFlowResponse> {
        const query = request.getParam('query');
        try {
            const category = await this.dialogFlowBackend.findCategory(query);
            const nextQuestion = await this.dialogFlowBackend.nextQuestion(category.id);

            const intro = this.resources.getString('QUESTIONNAIRE_INTRO', { category: category.title });
            const nextQuestionText = nextQuestion.question;

            return new DialogFlowResponse(
                request,
                `${intro}' ${nextQuestionText}`,
                category.id,
                {
                    questionId: nextQuestion.id,
                    questionText: nextQuestion.question,
                    questionAnswer: nextQuestion.answer
                }
            );
        } catch (e) {
            return new DialogFlowResponse(
                request,
                this.resources.getString('CATEGORY_NOT_FOUND', { keyword: query }),
            );
        }
    }
}
