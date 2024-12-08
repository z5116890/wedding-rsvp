export const localStorageMock = () => {
  const storage = {}

  return {
    setItem: (key: string, value) => {
      storage[key] = value || ''
    },
    getItem: (key: string) => {
      return key in storage ? storage[key] : null
    },
    removeItem: (key: string) => {
      delete storage[key]
    },
    get length() {
      return Object.keys(storage).length
    },
    key: (i: string) => {
      const keys = Object.keys(storage)
      return keys[i] || null
    },
  }

}
