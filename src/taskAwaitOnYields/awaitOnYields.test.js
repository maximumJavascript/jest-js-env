import { awaitOnYields } from './index';

async function lazyPrintData(data) {
	return new Promise(res => setTimeout(res, 500))
		.then(() => {
			console.log(data);
			return data;
		});
}

function* lazyPrinter(sequence) {
	const result = [];

	for (const item of sequence) {
		const returned = yield lazyPrintData(item);
		result.push(returned);
	}

	return result;
}

describe('await on yields function', () => {
	test('it works correctly', () => {
		let iterator;
		const createIterator = jest.fn(() => iterator = lazyPrinter('aboba'));
		const result = awaitOnYields(createIterator);

		expect(createIterator).toBeCalledTimes(1);
		expect(iterator).toBeDefined();
		expect(iterator).toHaveProperty('next');
		expect(result).toBeInstanceOf(Promise);

		return result.then((x) => {
			expect(x).toMatchObject(['a','b','o','b','a']);

			expect(iterator.next()).toMatchObject({
				done: true,
				value: undefined,
			});
		});
	});
});
