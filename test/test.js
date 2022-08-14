const expect = require('chai').expect;
const python = require('../python');
const c = require('../c');

describe('index.js tests', () => {
    describe('index run() Test', () => {
        it('should be hello', () => {
            const result = python.run("print('hello')")
            expect(result).to.be.eql('hello');
        });
        it('should be world', () => {
            const result = c.run("#include <stdio.h> \nint main(){\nprintf('world');\nreturn 0;\n}");
            expect(result).to.equal('world');
        });
    });
})