/* @flow */

export default class FirebaseSearchCategoryQuery {
    firebaseDatabase: Object;

    constructor(firebaseDatabase: Object) {
        this.firebaseDatabase = firebaseDatabase;
    }

    async run(query: string): Promise<string[]> {
        try {
            const firebaseSnapshot = await this.firebaseDatabase.child('keywords')
                .child(query.toLowerCase())
                .once('value');
            const firebaseValue = firebaseSnapshot.val();
            return Object.keys(firebaseValue);
        } catch (e) {
            return Promise.resolve([]);
        }
    }
}
