export const isSet = key => {
  return (
    (key !== undefined && key !== null && key !== '') ||
    (Array.isArray(key) && key.length > 0)
  )
}

export const isNotSet = key => {
  return !isSet(key)
}
