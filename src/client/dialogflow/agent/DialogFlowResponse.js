// @flow

import DialogFlowRequest from './DialogFlowRequest';

export default class DialogFlowResponse {
    fulfillmentText: string;
    outputContexts: Object[];

    constructor(
        request: DialogFlowRequest,
        message: string,
        categoryId: ?string,
        question: ?{ questionId: string, questionText: string, questionAnswer: string }
    ) {
        this.outputContexts = [];
        this.fulfillmentText = message;

        if (categoryId) {
            this.createContext(request, 'category', { categoryId });
        }

        if (question) {
            this.createContext(request, 'question', question);
        }
    }

    createContext(request: DialogFlowRequest, contextName: string, parameters: Object) {
        this.outputContexts.push({
            name: `projects/${request.getProjectId()}/agent/sessions/${request.getSessionId()}/contexts/${contextName}`,
            lifespanCount: 1,
            parameters
        });
    }
}
