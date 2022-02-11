const PromiseState = {
	Pending: 'PENDING',
	Resolved: 'RESOLVED',
	Rejected: 'REJECTED',
}

class MyPromise {
	constructor(callback) {
		this.state = PromiseState.Pending;
	}

	// hmm...
	then = (thenOnResolve, thenOnReject) => {

	}

	// it is ready to use method, but you can add something if you want
	// it is up to you...
	catch = (catchCallback) => {
		return this.then(undefined, catchCallback || (x => x));
	}
}

// write to window to use it in test file
window['MyPromise'] = MyPromise;
