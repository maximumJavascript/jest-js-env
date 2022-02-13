import fetch from 'node-fetch';

// NOTE: this is R&D task (research and develop)
// you are going to research how the code you write works and think about getting better solution
//
// there is no right answer, just recommendation and suggestion steps
// to done it: after every line you need to think or to do what you have been suggested, and only
// after that go to next line

// NOTE: what I expect in your PR on github:
// 0. Working with english language requirements (so I wrote everything on english)
// 1. some solution to the problems below
// 2. some tests you write to test your own code
// 3. resume or conclusion from you about using WeakSet, WeakMap, Set, Map, objects data structures

// 1. Try to figure out what whe written code doing
// 2. Do action with result:
//	2.1 sort immutable by updatedDate in non-ascending order
//  2.3 create data structure to show other news by every news item: it will be Map where
//  	keys will be these objects
//		values will be all objects with the same newsSite property value, but not including key
// 		object - use any structure you want
// 2.4 create function (or class) to add new value to this data
// structure:
// 	if Map already has that object as key, do nothing
// 	if Map does not have that object as key,
// 		but has another object with same id, update object in map with new object
// if we're adding completely new object - update collection properly
// try to write tests
// (check file articles.test.js) to check that it works correctly (NOTE: do NOT perform any
// requests in your tests, use fallbackData)
// 2.5 change Map to WeakMap
// 		can your code still work?
// Try to make it work by adding any non-weak data-structure you want to store data in and use
// 		WeakMap just for association between objects, not for data store (you want to get map
// 		association structure with auto-cleanable keys (because it is WeakMap) and your non-weak
// data store you write and change values) Think: keys are cleaning, but objects in value don't.
// Can you use WeakSet's as values to fix this issue? Does using WeakSet as values of WeakMap makes
// sense or not? Can you get associated data with it by key? Maybe you just don't need to store
// values as objects in you Map at all? Write function to get object by id in your non-weak data
// store and stop storing object in your map values - - store just ids, so objects can be
// garbage-collected if you remove it from data store adapt your tests to work with final solution

(async() => {
	let result;
	try {
		// Task 2.1
		// Callback function in sort method of an Array.prototype
		// to arrange items in array into non-ascending order
		const compareByUpdatedData = (first, second) => {
			return Date.parse(first.updatedAt) < Date.parse(second.updatedAt);
		}
		result = await fetch('https://api.spaceflightnewsapi.net/v3/articles')
			.then(x => x.json());
		const sortedResult = result.slice().sort(compareByUpdatedData); // array
		// End of 2.1

		// Task 2.3
		// There are two Maps.
		// The first one have to arrange objects by string-key equals "newsSite".
		const mapByNewsSite = new Map();
		// The second one must resolve an issue above.
		const resultMap = new Map();

		for (let k = 0; k < sortedResult.length; k++) {
			const newsSite = sortedResult[k].newsSite;
			const arrayOfObjects = mapByNewsSite.get(newsSite);

			if (!arrayOfObjects) {
				mapByNewsSite.set(newsSite, [sortedResult[k]]);
			} else {
				arrayOfObjects.push(sortedResult[k]);
			}
		}

		// There is O(n^2), bruh...
		for (const array of mapByNewsSite.values()) {
			for (let i = 0; i < array.length; i++) {
				const mainObj = array[i];
				resultMap.set(mainObj, array.filter((elem) => {
					return elem.id !== mainObj.id;
				}))
			}
		}
		// !!! Test
		const testObj = {
			// id from the first item of resultMap to test checkForIdCollision function
			id: 13926,
			title: 'Denis Baranov had slept'
		}
		// !!! Test

		//End of 2.3

		// Task 2.4
		// There are two functions.
		// addData function determines how to add new object to resultMap.
		// checkForIdCollision determines what object it will update with objToAdd.
		const checkForIdCollision = (objToAdd, parentObj) => {
			let isRepeatable = false;
			parentObj.forEach((elem) => {
				for (let i = 0; i < elem.length; i++) {
					if (elem[i].id === objToAdd.id) {
						isRepeatable = true;
						Object.assign(elem[i], objToAdd);
					}
				}
			});
			return isRepeatable;
		}

		const addData = (objToAdd) => {
			if (resultMap.has(objToAdd)) return;
			else {
				const repeating = checkForIdCollision(objToAdd, resultMap);
				if (!repeating) {
					resultMap.set(objToAdd, []);
				}
			}
		}
		addData(testObj);
		console.log(resultMap);
	} catch (e) {
		console.error(e);
	}
})();


// FAQ
// Q: How can I write data to file myself to play with it?
// A: I suggest using this code
//
// import * as path from "path";
// import {fileURLToPath} from 'url';
// import * as fs from "fs";
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// fs.writeFileSync(
// 	path.resolve(__dirname, './fallbackData.experimental.js'),
// 	'export default ' + JSON.stringify(result, undefined, 4),
// 	{},
// );
