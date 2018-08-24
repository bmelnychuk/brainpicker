/* @flow */

import type { RequestHandler } from './RequestHandler';
import DialogFlowRequest from '../agent/DialogFlowRequest';
import DialogFlowResponse from '../agent/DialogFlowResponse';

export default class RepeatQuestionIntentHandler implements RequestHandler {
    canHandle(request: DialogFlowRequest): boolean {
        return request.getIntent() === 'RepeatQuestion';
    }

    async handle(request: DialogFlowRequest): Promise<DialogFlowResponse> {
        const categoryId = request.getParam('categoryId');
        const questionText = request.getParam('questionText');
        const questionId = request.getParam('questionId');
        const questionAnswer = request.getParam('questionAnswer');

        return new DialogFlowResponse(
            request,
            questionText,
            categoryId,
            {
                questionId,
                questionText,
                questionAnswer
            }
        );
    }
}
