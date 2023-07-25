const truncateText = (text, limit) => {
    if (text.length > limit) {
        return `${text.substring(0, limit)} ...`
    } else {
        return text
    }
}

export default truncateText;