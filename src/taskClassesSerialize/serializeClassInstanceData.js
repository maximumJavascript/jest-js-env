/**
 * @param instance class instance to serialize
 * @returns plain object
 */

const serializeClassInstanceData = (instance) => {

    const instanceConstructor = instance.constructor;
    const descriptors = Object.getOwnPropertyDescriptors(instanceConstructor.prototype);
    const constructorProto = Object.getPrototypeOf(instanceConstructor);
    const descriptors2 = Object.getOwnPropertyDescriptors(constructorProto.prototype)

    const obj = Object.create(Object.prototype);

    for (const [key, value] of Object.entries(descriptors)) {
        if (value.get && value.get.call(instance) !== undefined) {
            Object.defineProperty(obj, key, {
                value: value.get.call(instance),
                enumerable: true,
                configurable: true,
            });
        }
    }
    if (instance instanceof constructorProto) {
        for (const [key, value] of Object.entries(descriptors2)) {
            if (value.get && (value.get.call(instance) !== undefined) && (!obj[key])) {
                Object.defineProperty(obj, key, {
                    value: value.get.call(instance),
                    enumerable: true,
                });
            }
        }
    }
    return obj;
}

export default serializeClassInstanceData;