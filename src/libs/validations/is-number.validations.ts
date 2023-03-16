export const IsNumber = (value: string ): boolean => {
    const regex = /^\d+$/
    const matches = value.match(regex)
    return matches != null
}