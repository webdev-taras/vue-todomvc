const STORAGE_KEY = "todos-vuejs"

export const restoreState = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")

export const commitState = state => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
