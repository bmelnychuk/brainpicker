/* @flow */

import type { RequestHandler } from './RequestHandler';
import { isSessionEndRequest } from './RequestHandler';

export default class SessionEndedIntentHandler implements RequestHandler {
    canHandle(handlerInput: Object) {
        return isSessionEndRequest(handlerInput);
    }

    handle(handlerInput: Object) {
        return handlerInput.responseBuilder.getResponse();
    }
}
