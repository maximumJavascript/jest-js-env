/**
 * @param instance class instance to serialize
 * @returns plain object
 */

import {ForestBeast, HairedForestBeast, HairedForestBeastWithFamily} from "./codebase";

const constructAnyInstance = (descs) => {
    const obj = Object.create(Object.prototype);

    for(let [key, value] of Object.entries(descs)){
        // if(value.get){
        //     obj[key] = value.get();
        // }
        //TODO: разобраться, какие свойства нужны, а также, что у них общего
        console.log(key, value);
    }
    return obj;
}

const serializeClassInstanceData = (instance) => {
    // console.log(instance.name)
    // console.log(Object.getPrototypeOf(instance));
    const descriptors = Object.getOwnPropertyDescriptors(instance.constructor.prototype);
    // console.log(Object.getOwnPropertyNames(instance.constructor.prototype));
    console.log(constructAnyInstance(descriptors));
}

export default serializeClassInstanceData;