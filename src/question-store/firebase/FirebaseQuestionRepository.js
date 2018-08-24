/* @flow */

import type { QuestionRepository } from '../repository/QuestionRepository';
import Question from '../model/Question';

export default class FirebaseQuestionRepository implements QuestionRepository {
    firebaseDatabase: Object;

    constructor(firebaseDatabase: Object) {
        this.firebaseDatabase = firebaseDatabase;
    }

    async save(question: Question): Promise<Question> {
        const toStore = {
            id: question.id,
            body: question.body,
            answer: question.answer
        };

        const ref = this.firebaseDatabase.child('data').child('question');
        await ref.child(question.id).set(toStore);
        return question;
    }

    async getById(id: string): Promise<Question> {
        try {
            const firebaseSnapshot = await this.firebaseDatabase.child('data').child('question')
                .child(id).once('value');
            const firebaseQuestion = firebaseSnapshot.val();

            return new Question(
                firebaseQuestion.id,
                firebaseQuestion.body,
                firebaseQuestion.answer
            );
        } catch (e) {
            throw new Error(`Question with id '${id}' does not exist`);
        }
    }
}
