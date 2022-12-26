export const fetchLocalStorageData = (key) => {
  if (
    key === null ||
    key === undefined ||
    typeof key !== "string" ||
    key === ""
  )
    return null;
  let locallyStoredData;
  try {
    locallyStoredData = JSON.parse(window?.localStorage?.getItem(key));
  } catch (e) {
    locallyStoredData = window?.localStorage?.getItem(key);
  }
  return locallyStoredData;
};

export const setLocalStorageData = (key, value) => {
  if (window?.localStorage) {
    window?.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorageData = (key) => {
  window?.localStorage?.removeItem(key);
};
