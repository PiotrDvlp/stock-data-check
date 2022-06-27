export const addDataToStorage = (storageKey, data) =>
    localStorage.setItem(storageKey, JSON.stringify(data));

export const getDataFromStorage = (storageKey) =>
    JSON.parse(localStorage.getItem(storageKey));
