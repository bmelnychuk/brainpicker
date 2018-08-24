/* @flow */

import type { RequestHandler } from './RequestHandler';
import { hasIntentName, isIntentRequest } from './RequestHandler';
import AlexaBackend from '../AlexaBackend';
import Resources from '../resources/Resources';


export default class DontKnowIntentHandler implements RequestHandler {
    alexaBackend: AlexaBackend;
    resources: Resources;

    constructor(alexaBackend: AlexaBackend, resources: Resources) {
        this.alexaBackend = alexaBackend;
        this.resources = resources;
    }

    canHandle(handlerInput: Object): boolean {
        return isIntentRequest(handlerInput) && hasIntentName(handlerInput, 'DontKnow');
    }

    async handle(handlerInput: Object): Promise<Object> {
        const { categoryId, questionAnswer } = handlerInput.attributesManager.getSessionAttributes();

        const nextQuestion = await this.alexaBackend.nextQuestion(categoryId);

        const answerResponse = this.resources.getString('ANSWER_INCORRECT', { answer: questionAnswer });
        const nextQuestionText = nextQuestion.question;

        return handlerInput.responseBuilder
            .speak(`${answerResponse} ${nextQuestionText}`)
            .withShouldEndSession(false)
            .getResponse();
    }
}
