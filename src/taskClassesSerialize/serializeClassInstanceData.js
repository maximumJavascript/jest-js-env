/**
 * @param instance class instance to serialize
 * @returns plain object
 */
import { ForestBeast, HairedForestBeast, HairedForestBeastWithFamily } from "./codebase";

const constructForestBeastInstance = (child, parent) => {
	child.name = parent.name;
	child.countOfLimbs = parent.countOfLimbs;
	child.geneticData = parent.geneticData;
	child.id = parent.id;
}

const constructHairedForestBeastInstance = (child, parent) => {
	child.name = parent.name;
	child.countOfLimbs = parent.countOfLimbs;
	child.hasHair = parent.hasHair;
	child.isSocial = parent.isSocial;
	child.id = parent.id;
}

export default function serializeClassInstanceData(instance) {

	if (instance.constructor === ForestBeast) {
		let obj = Object.create(Object.prototype);
		constructForestBeastInstance(obj, instance);
		return obj;
	}

	if (instance.constructor === HairedForestBeast) {
		let obj = Object.create(Object.prototype);
		constructHairedForestBeastInstance(obj, instance);
		return obj;
	}

	if (instance.constructor === HairedForestBeastWithFamily) {
		const obj = Object.create(Object.prototype);
		const family = instance.family;
		obj.family = [];
		for (let i = 0; i < family.length; i++) {
			let member = Object.create(Object.prototype);
			constructHairedForestBeastInstance(member, family[i]);
			obj.family.push(member);
		}
		return obj;
	}
}