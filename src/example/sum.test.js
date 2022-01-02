import sum from './sum';

describe('функция суммы', () => {
    test('работает как задумано', () => {
        expect(sum(1, 2)).toBe(3);
    });

    test('работает как задумано 2', () => {
        expect(sum(1, 2)).not.toBe(4);
    });

    test('матчинг объектов', () => {
        expect({
            test: 1,
            testTest: 2,
            monkey: 'jump',
            foo: 'bar',
        }).toMatchObject({test: 1});
    });

    test('матчинг объектов наоборот', () => {
        expect({test: 1}).not.toMatchObject({
            test: 1,
            testTest: 2,
            monkey: 'jump',
            foo: 'bar',
        });
    })
})