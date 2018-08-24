/* @flow */
import type { RequestHandler } from './RequestHandler';
import { isIntentRequest, hasIntentName } from './RequestHandler';
import Resources from '../resources/Resources';

export default class HelpIntentHandler implements RequestHandler {
    resources: Resources;

    constructor(resources: Resources) {
        this.resources = resources;
    }

    canHandle(handlerInput: Object) {
        return isIntentRequest(handlerInput) && hasIntentName(handlerInput, 'AMAZON.HelpIntent');
    }

    handle(handlerInput: Object) {
        const speechText = this.resources.getString('INTENT_HELP');

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
}
