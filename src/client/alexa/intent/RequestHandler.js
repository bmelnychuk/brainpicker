/* @flow */

export interface RequestHandler {
    canHandle(handlerInput: Object): Promise<boolean> | boolean;
    handle(handlerInput: Object): Promise<Object> | Object;
}

const typeOf = (handlerInput: Object, type: string): boolean => handlerInput.requestEnvelope.request.type === type;

export const isIntentRequest = (handlerInput: Object): boolean => typeOf(handlerInput, 'IntentRequest');
export const isSessionEndRequest = (handlerInput: Object): boolean => typeOf(handlerInput, 'SessionEndedRequest');
export const isLaunchRequest = (handlerInput: Object): boolean => typeOf(handlerInput, 'LaunchRequest');

export const hasIntentName = (handlerInput: Object, name: string): boolean =>
    handlerInput.requestEnvelope.request.intent.name === name;
