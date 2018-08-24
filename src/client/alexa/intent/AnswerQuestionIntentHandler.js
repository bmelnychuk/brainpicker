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

    canHandle(handlerInput: Object): boolean {
        return isIntentRequest(handlerInput) && hasIntentName(handlerInput, 'AnswerQuestion');
    }

    async handle(handlerInput: any): Promise<Object> {
        const { questionId, categoryId } = handlerInput.attributesManager.getSessionAttributes();
        const { intent } = handlerInput.requestEnvelope.request;
        const userAnswer = intent.slots.answer.value;

        const answerResult = await this.alexaBackend.answerQuestion(questionId, userAnswer);
        const nextQuestion = await this.alexaBackend.nextQuestion(categoryId);

        handlerInput.attributesManager.setSessionAttributes({
            questionAnswer: nextQuestion.answer,
            questionText: nextQuestion.question,
            questionId: nextQuestion.id,
            categoryId
        });

        const answerResponse = answerResult.isValid ?
            this.resources.getString('ANSWER_CORRECT')
            :
            this.resources.getString('ANSWER_INCORRECT', { answer: answerResult.correctAnswer });
        const nextQuestionText = nextQuestion.question;

        return handlerInput.responseBuilder
            .speak(`${answerResponse} ${nextQuestionText}`)
            .withShouldEndSession(false)
            .getResponse();
    }
}
