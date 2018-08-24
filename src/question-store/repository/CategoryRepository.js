/* @flow */

import Category from '../model/Category';

export interface CategoryRepository {
    find(keyword: string): Promise<Category[]>;
    save(category: Category): Promise<Category>;
    getById(id: string): Promise<Category>;
}
