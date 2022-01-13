/**
 * @param instance class instance to serialize
 * @returns plain object
 */
import { ForestBeast, HairedForestBeast, HairedForestBeastWithFamily } from "./codebase";

const constructForestBeastInstance = (child, parent) => {
	Object.defineProperties(child, {
		countOfLimbs: {
			value: parent.countOfLimbs,
			enumerable: true,
		},
		name: {
			value: parent.name,
			enumerable: true,
		},
		geneticData: {
			value: null,
			enumerable: true,
		},
		id: {
			value: parent.id,
		}
	})
}

const constructHairedForestBeastInstance = (child, parent) => {
	Object.defineProperties(child, {
		countOfLimbs: {
			value: parent.countOfLimbs,
			enumerable: true,
		},
		name: {
			value: parent.name,
			enumerable: true,
		},
		id: {
			value: parent.id,
		},
		hasHair: {
			value: parent.hasHair,
			enumerable: true,
		},
		isSocial: {
			value: parent.isSocial,
			enumerable: true,
		}
	})
}

const serializeClassInstanceData = (instance) => {

	if (instance.constructor === ForestBeast) {
		const obj = Object.create(Object.prototype);
		constructForestBeastInstance(obj, instance);
		return obj;
	}

	if (instance.constructor === HairedForestBeast) {
		const obj = Object.create(Object.prototype);
		constructHairedForestBeastInstance(obj, instance);
		return obj;
	}

	if (instance.constructor === HairedForestBeastWithFamily) {
		const obj = Object.create(Object.prototype);
		const family = instance.family;
		obj.family = [];
		for (let i = 0; i < family.length; i++) {
			const member = Object.create(Object.prototype);
			constructHairedForestBeastInstance(member, family[i]);
			obj.family.push(member);
		}
		return obj;
	}
}

export default serializeClassInstanceData;