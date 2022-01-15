const expect = require('chai').expect;
const mainfile = require('../index');

describe('index.js tests', () => {
    describe('index run() Test', () => {
        it('should be hello', () => {
            const result = mainfile.run("print('hello')")
            expect(result).to.be.eql('hello');
        });
        it('should be world', () => {
            const result = mainfile.run("print('world')")
            expect(result).to.equal(4);
        });
    });
})