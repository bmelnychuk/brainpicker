/* @flow */

export interface AnswerValidationPolicy {
    isAnswerValid(userAnswer: string, correctAnswer: string): Promise<boolean>;
}
