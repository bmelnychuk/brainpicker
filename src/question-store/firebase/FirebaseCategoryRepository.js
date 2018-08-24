/* @flow */

import FirebaseIndexCategoryQuery from './query/FirebaseIndexCategoryQuery';
import FirebaseSearchCategoryQuery from './query/FirebaseSearchCategoryQuery';
import type { CategoryRepository } from '../repository/CategoryRepository';
import Category from '../model/Category';

export default class FirebaseCategoryRepository implements CategoryRepository {
    firebaseDatabase: Object;
    indexCategory: FirebaseIndexCategoryQuery;
    searchCategory: FirebaseSearchCategoryQuery;

    constructor(firebaseDatabase: Object) {
        this.firebaseDatabase = firebaseDatabase;
        this.indexCategory = new FirebaseIndexCategoryQuery(firebaseDatabase);
        this.searchCategory = new FirebaseSearchCategoryQuery(firebaseDatabase);
    }

    async save(category: Category): Promise<Category> {
        const toStore = {
            id: category.id,
            title: category.title,
            keywords: category.keywords,
            questionIds: category.questionIds
        };

        const ref = this.firebaseDatabase.child('data').child('category');

        await Promise.all([
            ref.child(category.id).set(toStore),
            this.indexCategory.run(category)
        ]);

        return category;
    }

    async getById(id: string): Promise<Category> {
        try {
            const firebaseSnapshot = await this.firebaseDatabase.child('data')
                .child('category')
                .child(id)
                .once('value');
            const firebaseCategory = firebaseSnapshot.val();

            return new Category(
                firebaseCategory.id,
                firebaseCategory.title,
                firebaseCategory.keywords,
                firebaseCategory.questionIds
            );
        } catch (e) {
            throw new Error(`Category with id '${id}' does not exist`);
        }
    }

    async find(keyword: string): Promise<Category[]> {
        const ids = await this.searchCategory.run(keyword);
        if (ids.length === 0) return [];

        return Promise.all(ids.map(id => this.getById(id)));
    }
}
