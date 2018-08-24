/* @flow */

import type { RequestHandler } from './RequestHandler';
import { hasIntentName, isIntentRequest } from './RequestHandler';
import Resources from '../resources/Resources';

export default class CancelAndStopIntentHandler implements RequestHandler {
    resources: Resources;

    constructor(resources: Resources) {
        this.resources = resources;
    }

    canHandle(handlerInput: Object) {
        return isIntentRequest(handlerInput) &&
            (hasIntentName(handlerInput, 'AMAZON.CancelIntent') || hasIntentName(handlerInput, 'AMAZON.StopIntent'));
    }

    handle(handlerInput: Object) {
        const speechText = this.resources.getString('INTENT_STOP');

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
}
