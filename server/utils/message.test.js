const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it("should generate correct message object", () => {
        // test case
        var from = "Nguyet@rain.com";
        var text = "This is test";
        // method need testing
        var message = generateMessage(from, text);
        // tese here
        expect(typeof message.createAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
}); 

describe('generateLocationMessage', () => {
    it("should generate correct location object", () => {
        // test case
        var from = "Khang";
        var latitude = 4;
        var logitude = 10;
        var url = "https://www.google.com/maps?q=4,10";
        // method need testing
        var message = generateLocationMessage(from, latitude, logitude);
        // tese here
        expect(typeof message.createAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});