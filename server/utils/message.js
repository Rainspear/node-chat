const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from : from,
        text : text,
        createAt : moment().valueOf()
    }
};

var generateLocationMessage = (from, latitude, logitude) => {
    return {
        from,
        createAt: moment().valueOf(),
        url : `https://www.google.com/maps?q=${latitude},${logitude}`
    };
}

module.exports = {generateMessage, generateLocationMessage};