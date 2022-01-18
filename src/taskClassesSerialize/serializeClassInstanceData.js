/**
 * @param instance class instance to serialize
 * @returns plain object
 */

const constructAnyInstance = (descs, parent) => {
    const obj = Object.create(Object.prototype);

    for (let [key, value] of Object.entries(descs)) {

        if (value.get && value.get.call(parent) !== undefined) {
            Object.defineProperty(obj, key, {
                value: value.get.call(parent),
                enumerable: true,
            });
        }
    }
    return obj;
}

const serializeClassInstanceData = (instance) => {

    const descriptors = Object.getOwnPropertyDescriptors(instance.constructor.prototype);
    // console.log(Object.getOwnPropertyNames(instance.constructor.prototype));
    return constructAnyInstance(descriptors, instance);
}

export default serializeClassInstanceData;