const validUrl = require('valid-url');

function checkForName(inputText) {
    return Boolean(validUrl.isWebUri(`${inputText}`))
}

export { checkForName };
