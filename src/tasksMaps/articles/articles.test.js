describe('articles service', () => {
	test('works as expected', async () => {
		// do something with mock data
		const result = (await import('./fallbackData.saved.js')).default;
		expect(Array.isArray(result)).toBe(true);

		// TODO
	})
})
