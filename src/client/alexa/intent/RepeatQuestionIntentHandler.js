/* @flow */

import type { RequestHandler } from './RequestHandler';
import { hasIntentName, isIntentRequest } from './RequestHandler';


export default class RepeatQuestionIntentHandler implements RequestHandler {
    canHandle(handlerInput: Object): boolean {
        return isIntentRequest(handlerInput) && hasIntentName(handlerInput, 'RepeatQuestion');
    }

    async handle(handlerInput: Object): Promise<Object> {
        const { questionText } = handlerInput.attributesManager.getSessionAttributes();

        return handlerInput.responseBuilder
            .speak(questionText)
            .withShouldEndSession(false)
            .getResponse();
    }
}
