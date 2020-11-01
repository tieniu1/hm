export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  return window.localStorage.removeItem(name)
}
