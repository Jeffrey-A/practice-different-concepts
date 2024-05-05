
function flatten(value) {
    if (isPrimitive(value) || isEmptyArray(value) || isEmptyObject(value)) {
        return value;
    }

    if (Array.isArray(value)) {
        const result = [];
        flattenArray(value, result);
        return result;
    }

    const result = {};
    flattenObject(value, result);
    return result;

}

function isPrimitive(value) {
    return typeof value !== "object" || value == null;
}

function isEmptyArray(value) {
    return Array.isArray(value) && value.length === 0;
}

function isEmptyObject(value) {
    return typeof value === "object" && value != null && Object.keys(value).length === 0;
}

function flattenArray(array, result) {
    if (isEmptyArray(array) || array == null) {
        return array;
    }
  
    array.forEach(value => {
        if (typeof value !== "object" || value == null) {
            result.push(value);
        } else if (Array.isArray(value)) {
            flattenArray(value, result);
        } else {
            const flattedObject = {};
            flattenObject(value, flattedObject);
          
            if (Object.keys(flattedObject).length) {
                result.push(flattedObject);
            }
        }
    });
}

function flattenObject(object, result) {
    if (isEmptyObject(object) || object == null) {
        return object;
    }

    const keys = Object.keys(object);
  
    keys.forEach(key => {
        const value = object[key];

        if (typeof value !== "object" || value == null) {
            result[key] = value;
        } else if (Array.isArray(value)) {
            const flattedArray = [];
            flattenArray(value, flattedArray);
            if (flattedArray.length) {
                result[key] = flattedArray;
            }
        } else {
            flattenObject(value, result);
        }
    })
}