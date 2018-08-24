/* @flow */

export default class Question {
    id: string;
    body: string;
    answer: string;

    constructor(id: string, body: string, answer: string) {
        this.id = id;
        this.body = body;
        this.answer = answer;
    }
}
