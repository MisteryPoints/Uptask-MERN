const generarId = () => {
    const random = Math.random().toString(32).substring(2)
    const date = Date.now().toString(32)
    return date + random
}

export default generarId