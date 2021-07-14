export const keyHandler = (value) => {
    return Math.ceil(Math.trunc(Math.random() * (value / 26071989) * Date.now())).toString()
}