/* eslint-disable no-console */
/* @flow */

import { SkillBuilders } from 'ask-sdk';
import AlexaBackend from './AlexaBackend';

import LaunchRequestHandler from './intent/LaunchRequestHandler';
import AnswerQuestionIntentHandler from './intent/AnswerQuestionIntentHandler';
import RepeatQuestionIntentHandler from './intent/RepeatQuestionIntentHandler';
import CancelAndStopIntentHandler from './intent/CancelAndStopIntentHandler';
import HelpIntentHandler from './intent/HelpIntentHandler';
import DontKnowIntentHandler from './intent/DontKnowIntentHandler';
import SessionEndedIntentHandler from './intent/SessionEndedIntentHandler';
import StartAnsweringIntentHandler from './intent/StartAnsweringIntentHandler';
import Resources from './resources/Resources';

const AlexaMiddleware = () => {
    const alexaBackend = new AlexaBackend();
    const resources = new Resources();

    const skill = SkillBuilders.custom()
        .addRequestHandlers(
            new SessionEndedIntentHandler(),
            new StartAnsweringIntentHandler(alexaBackend, resources),
            new DontKnowIntentHandler(alexaBackend, resources),
            new LaunchRequestHandler(resources),
            new HelpIntentHandler(resources),
            new CancelAndStopIntentHandler(resources),
            new RepeatQuestionIntentHandler(),
            new AnswerQuestionIntentHandler(alexaBackend, resources),
        ).create();

    return async (request: Object, response: Object, next: any) => {
        const { client: clientId } = request.params;
        if (clientId !== 'alexa') {
            next();
            return;
        }

        try {
            const alexaResponse = await skill.invoke(request.body);
            response.json(alexaResponse);
        } catch (e) {
            console.log('Request', request.body);
            console.log('Alexa. InternalError', e);
            response.status(500).send({ error: 'Internal server error' });
        }
    };
};

export default AlexaMiddleware;
