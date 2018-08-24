/* @flow */

import Category from '../../model/Category';

export default class FirebaseIndexCategoryQuery {
    firebaseDatabase: Object;

    constructor(firebaseDatabase: Object) {
        this.firebaseDatabase = firebaseDatabase;
    }

    async run(category: Category): Promise<Category> {
        const keywordsRef = this.firebaseDatabase.child('keywords');

        await Promise.all(category.keywords.map(keyword => keywordsRef
            .child(keyword)
            .child(category.id)
            .set(true)));
        return category;
    }
}
