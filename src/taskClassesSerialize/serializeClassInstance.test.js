import { serializeClassInstance, ForestBeast, HairedForestBeast, HairedForestBeastWithFamily } from './index';

describe('function ', () => {
	test('works correctly for basic usage', () => {
		const params = { name: 'wolf', countOfLimbs: 4, isSocial: true, uuid: Math.random() };
		const wolf = new ForestBeast(params);
		const result = serializeClassInstance(wolf);
		const stringified = JSON.stringify(result);

		expect(result).toMatchObject({
			countOfLimbs: 4,
			name: 'wolf',
			geneticData: null,
		});

		// private fields should not be copied
		expect(result.isSocial).toBe(undefined);
		expect(result._countOfLimbs).toBe(undefined);
		expect(result._name).toBe(undefined);

		// result can not have undefined fields like json.
		// We must include only fields we can't lose in json parse-stringify
		expect(JSON.parse(stringified)).toMatchObject(result);
		expect(result.id).toBe(params.uuid);

		expect(wolf).toBeInstanceOf(ForestBeast);
		expect(result).not.toBeInstanceOf(ForestBeast);
		expect(wolf.constructor).toBe(ForestBeast);
		expect(result.constructor).toBe(Object.prototype.constructor);
	});

	test('works correctly with class inheritance', () => {
		const params = { name: 'wolf', countOfLimbs: 4, isSocial: true, uuid: Math.random() };
		const wolf = new HairedForestBeast(params);
		const result = serializeClassInstance(wolf);
		const stringified = JSON.stringify(result);

		expect(result).toMatchObject({
			countOfLimbs: 4,
			hasHair: true,
			name: 'Haired wolf',
		});

		expect(result.isSocial).toBe(params.isSocial);
		expect(result._isSocial).toBe(undefined);
		expect(result._countOfLimbs).toBe(undefined);
		expect(result._name).toBe(undefined);

		expect(JSON.parse(stringified)).toMatchObject(result);
		expect(result.id).toBe(params.uuid);

		expect(wolf).toBeInstanceOf(ForestBeast);
		expect(wolf).toBeInstanceOf(HairedForestBeast);
		expect(result).not.toBeInstanceOf(HairedForestBeast);
		expect(result).not.toBeInstanceOf(ForestBeast);
		expect(wolf.constructor).toBe(HairedForestBeast);
		expect(result.constructor).toBe(Object.prototype.constructor);
	});

	test('works correctly with nested fields', () => {
		const basicParams = { countOfLimbs: 4, isSocial: true };
		const wolf = new HairedForestBeastWithFamily({
			...basicParams,
			name: 'WolfPapa',
			family: [
				new HairedForestBeast({...basicParams, name: 'WolfMama' }),
				new HairedForestBeast({...basicParams, name: 'WolfSon' }),
			]
		});

		const result = serializeClassInstance(wolf);
		const stringified = JSON.stringify(result);

		expect(JSON.parse(stringified)).toMatchObject(result);
		expect(result.family).toHaveLength(2);

		const firstFamilyMember = result.family[0];

		expect(firstFamilyMember).toMatchObject({
			countOfLimbs: 4,
			hasHair: true,
			name: 'Haired WolfMama',
		});

		expect(wolf).toBeInstanceOf(HairedForestBeastWithFamily);

		result.family.forEach(familyMember => {
			expect(familyMember.isSocial).toBe(basicParams.isSocial);
			expect(familyMember._isSocial).toBe(undefined);
			expect(familyMember._countOfLimbs).toBe(undefined);
			expect(familyMember._name).toBe(undefined);

			expect(familyMember).not.toBeInstanceOf(HairedForestBeast);
			expect(familyMember.constructor).toBe(Object.prototype.constructor);
		});

		expect.assertions(16);
	})
});
