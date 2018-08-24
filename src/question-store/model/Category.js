/* @flow */

export default class Category {
    id: string;
    keywords: string[];
    title: string;
    questionIds: string[];

    constructor(
        id: string,
        title: string,
        keywords: string[] = [],
        questionIds: string[] = []
    ) {
        this.id = id;
        this.keywords = keywords;
        this.title = title;
        this.questionIds = questionIds;
    }
}
