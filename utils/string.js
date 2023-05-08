function isBlank(str) {
    return /^\s*$/.test(str);
}

function isNotBlank(str) {
    return !isBlank(str)
}
