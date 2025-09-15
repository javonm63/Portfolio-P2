export default setTime = ({element}) => {
    const timer = setTimeout(() => {
        element.style.display = 'none'
    }, 3000)
    return timer
}