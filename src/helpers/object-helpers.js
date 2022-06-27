import { camelCase } from "lodash";

const formatKey = (str) => camelCase(str.substring(str.indexOf(" ") + 1));

export const renameKeys = (obj) =>
    Object.keys(obj).reduce(
        (acc, key) => ({
            ...acc,
            ...{ [formatKey(key)]: obj[key] },
        }),
        {}
    );
