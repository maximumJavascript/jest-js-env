import multiply from './multiply';

describe('функция умножения', () => {
    test('работает как задумано', () => {
        expect(multiply(5, 7)).toBe(35);
    });
});