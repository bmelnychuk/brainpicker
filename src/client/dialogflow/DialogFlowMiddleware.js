/* eslint-disable no-console */
/* @flow */

import StartQuestionnaireIntentHandler from './intent/StartAnsweringIntentHandler';
import AnswerQuestionIntentHandler from './intent/AnswerQuestionIntentHandler';
import RepeatQuestionIntentHandler from './intent/RepeatQuestionIntentHandler';
import DontKnowAnswerIntentHandler from './intent/DontKnowAnswerIntentHandler';
import DialogFlowRequest from './agent/DialogFlowRequest';
import DialogFlowAgent from './agent/DialogFlowAgent';
import DialogFlowBackend from './DialogFlowBackend';
import Resources from './resources/Resources';

const DialogFlowMiddleware = () => {
    const dialogFlowBackend = new DialogFlowBackend();
    const resources = new Resources();

    const dialogFlow = new DialogFlowAgent();
    dialogFlow.addRequestHandler(new StartQuestionnaireIntentHandler(dialogFlowBackend, resources));
    dialogFlow.addRequestHandler(new AnswerQuestionIntentHandler(dialogFlowBackend, resources));
    dialogFlow.addRequestHandler(new RepeatQuestionIntentHandler());
    dialogFlow.addRequestHandler(new DontKnowAnswerIntentHandler(dialogFlowBackend, resources));

    return async (request: any, response: any, next: any) => {
        const { client: clientId } = request.params;
        if (clientId !== 'dialogflow') {
            next();
            return;
        }

        try {
            const dialogFlowRequest = new DialogFlowRequest(request.body);
            const responseBody = await dialogFlow.handleRequest(dialogFlowRequest);
            response.json(responseBody);
        } catch (e) {
            console.log('Request', request.body);
            console.log('DialogFlow. InternalError', e);
            response.status(500).send({ error: 'Internal server error' });
        }
    };
};

export default DialogFlowMiddleware;
