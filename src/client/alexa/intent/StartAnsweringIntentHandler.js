/* @flow */

import type { RequestHandler } from './RequestHandler';
import { hasIntentName, isIntentRequest } from './RequestHandler';
import AlexaBackend from '../AlexaBackend';
import Resources from '../resources/Resources';

export default class AnswerQuestionIntentHandler implements RequestHandler {
    alexaBackend: AlexaBackend;
    resources: Resources;

    constructor(alexaBackend: AlexaBackend, resources: Resources) {
        this.alexaBackend = alexaBackend;
        this.resources = resources;
    }

    canHandle(handlerInput: any): boolean {
        return isIntentRequest(handlerInput) && hasIntentName(handlerInput, 'StartAnswering');
    }

    async handle(handlerInput: any): Promise<any> {
        const category = await this.alexaBackend.findCategory('cities');
        const nextQuestion = await this.alexaBackend.nextQuestion(category.id);

        handlerInput.attributesManager.setSessionAttributes({
            questionAnswer: nextQuestion.answer,
            questionText: nextQuestion.question,
            questionId: nextQuestion.id,
            categoryId: category.id
        });

        const nextQuestionText = nextQuestion.question;

        return handlerInput.responseBuilder
            .speak(nextQuestionText)
            .withShouldEndSession(false)
            .getResponse();
    }
}
