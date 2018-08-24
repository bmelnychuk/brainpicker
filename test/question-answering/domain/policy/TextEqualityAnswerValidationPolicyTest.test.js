import TextEqualityAnswerValidationPolicy from '../../../../src/question-answering/domain/policy/answer-validation/TextEqualityAnswerValidationPolicy';

const policy = new TextEqualityAnswerValidationPolicy();

describe('TextEqualityAnswerValidationPolicy', () => {
    test('Correct and equal answer', async () => {
        const isValid = await policy.isAnswerValid('john', 'john');
        expect(isValid).toEqual(true);
    });

    test('Correct uppercase answer', async () => {
        const isValid = await policy.isAnswerValid('John', 'john');
        expect(isValid).toEqual(true);
    });

    test('Correct answer with a space in the end', async () => {
        const isValid = await policy.isAnswerValid('john ', 'John');
        expect(isValid).toEqual(true);
    });

    test('Incorrect answer', async () => {
        const isValid = await policy.isAnswerValid('Josh', 'John');
        expect(isValid).toEqual(false);
    });

});
