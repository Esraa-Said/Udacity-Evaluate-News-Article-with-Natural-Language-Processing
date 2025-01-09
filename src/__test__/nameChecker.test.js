const { checkForName } = require("../client/js/nameChecker")

describe('urlValidity', ()=> {
    test('test if strings are false urls', () => {
        expect(checkForName("read")).toBeFalsy();
    })
    
    test('emails are not considered valid urls', () => {
        expect(checkForName("mailto:ahmed@gmail.com")).toBeFalsy();
    })
    
    test('expect urls to be true', () => {
        expect(checkForName("https://www.google.com")).toBeTruthy();
    })

    test('expect empty string to be falsy', () => {
        expect(checkForName("")).toBeFalsy();
    })
})