export const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadStorage = (key) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : null;
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
};