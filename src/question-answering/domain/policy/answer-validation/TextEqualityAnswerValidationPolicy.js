/* @flow */

import type { AnswerValidationPolicy } from './AnswerValidationPolicy';

export default class TextEqualityAnswerValidationPolicy implements AnswerValidationPolicy {
    isAnswerValid(userAnswer: string, correctAnswer: string): Promise<boolean> {
        return Promise.resolve(userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase());
    }
}
