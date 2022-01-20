/**
 * @param instance class instance to serialize
 * @param original
 * @returns plain object
 */

const serializeClassInstanceData = (instance, original = instance) => {

    const instanceProto = Object.getPrototypeOf(instance);
    const obj = Object.create(Object.prototype);

    if (instanceProto.constructor !== Object.prototype.constructor) {
        Object.assign(obj, serializeClassInstanceData(instanceProto, instance));
    } else {
        return obj;
    }

    const descriptors = Object.getOwnPropertyDescriptors(instanceProto);

    for (const [key, descriptor] of Object.entries(descriptors)) {
        if (descriptor.get) {
            const value = descriptor.get.call(original);

            if (Array.isArray(value)) {
                obj[key] = [];

                for (const elem of value) {
                    if (elem instanceof Object) {
                        obj[key].push(serializeClassInstanceData(elem));
                    } else {
                        (typeof elem !== 'undefined') && (obj[key].push(elem));
                    }
                }
            } else {
                (typeof value !== 'undefined') && (obj[key] = value);
            }
        }
    }
    return obj;
}

export default serializeClassInstanceData;