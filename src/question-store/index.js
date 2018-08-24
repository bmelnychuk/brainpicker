/* @flow */

import admin from 'firebase-admin/lib/index';
import Question from './model/Question';
import Category from './model/Category';
import FirebaseQuestionRepository from './firebase/FirebaseQuestionRepository';
import FirebaseCategoryRepository from './firebase/FirebaseCategoryRepository';

const database = admin.initializeApp().database().ref('/question-store');

const questionRepository = new FirebaseQuestionRepository(database);
const categoryRepository = new FirebaseCategoryRepository(database);

export async function getQuestions(categoryId: string): Promise<{ id: string, question: string, answer: string}[]> {
    const category = await categoryRepository.getById(categoryId);
    if (!category) throw new Error(`Category ${categoryId} does not exist`);
    const questions = await Promise.all(category.questionIds.map(id => questionRepository.getById(id)));

    return questions.map(question => ({
        id: question.id,
        question: question.body,
        answer: question.answer
    }));
}

export async function getQuestion(questionId: string): Promise<{ id: string, question: string, answer: string}> {
    const question = await questionRepository.getById(questionId);
    return {
        id: question.id,
        question: question.body,
        answer: question.answer
    };
}

export async function createQuestion(question: { id: string, question: string, answer: string}): Promise<void> {
    await questionRepository.save(new Question(
        question.id,
        question.question,
        question.answer
    ));
}

export async function createCategory(category: { id: string, keywords: string[], title: string, questionIds: string[]}): Promise<void> {
    await categoryRepository.save(new Category(
        category.id,
        category.title,
        category.keywords,
        category.questionIds
    ));
}

export async function findCategories(keyword: string): Promise<{ id: string, title: string}[]> {
    const categories = await categoryRepository.find(keyword);

    return categories.map(category => ({
        id: category.id,
        title: category.title
    }));
}

