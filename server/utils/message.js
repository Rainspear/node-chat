var generateMessage = (from, text) => {
    return {
        from : from,
        text : text,
        createAt : new Date().getTime()
    }
};

var generateLocationMessage = (from, latitude, logitude) => {
    return {
        from,
        createAt: new Date().getTime(),
        url : `https://www.google.com/maps?q=${latitude},${logitude}`
    };
}

module.exports = {generateMessage, generateLocationMessage};