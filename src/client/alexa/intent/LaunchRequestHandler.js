/* @flow */

import type { RequestHandler } from './RequestHandler';
import { isLaunchRequest } from './RequestHandler';
import Resources from '../resources/Resources';

export default class LaunchRequestHandler implements RequestHandler {
    resources: Resources;

    constructor(resources: Resources) {
        this.resources = resources;
    }

    canHandle(handlerInput: Object) {
        return isLaunchRequest(handlerInput);
    }

    handle(handlerInput: Object) {
        const speechText = this.resources.getString('INTENT_START');

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
}
