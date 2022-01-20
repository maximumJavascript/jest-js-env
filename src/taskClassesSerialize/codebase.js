export class ForestBeast {
	constructor({ countOfLimbs, name, uuid }) {
		this._countOfLimbs = countOfLimbs;
		this._name = name;
		this._uuid = uuid || this.regenerateId();
		this.kind = 'Forest Beast';
	}

	get name() {
		return this._name;
	}

	regenerateId() {
		return this._uuid = Math.random();
	}

	get id() {
		return this._uuid;
	}

	get countOfLimbs() {
		return this._countOfLimbs;
	}

	get geneticData() {
		return null;
	}

	get hasHair() {
		return undefined;
	}
}

export class HairedForestBeast extends ForestBeast {
	constructor(data) {
		super(data);

		const { isSocial } = data;
		this._isSocial = isSocial;
	}

	get name() {
		return `Haired ${super.name}`;
	}

	get hasHair() {
		return true;
	}

	get isSocial() {
		return this._isSocial;
	}
}

export class HairedForestBeastWithFamily extends HairedForestBeast {
	constructor(data) {
		super(data);

		const { family } = data;
		this._family = family;
	}

	get family() {
		return this._family;
	}
}
