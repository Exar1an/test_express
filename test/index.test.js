// const fetch = require("node-fetch")

import fetch from "node-fetch"

const initialBody = ['num1', 'num2', "num22"];

describe('Test for storage', () => {
    beforeEach(() => {
        let index;
        for(index = 0; index < initialBody.length; ++index) {
            fetch('http://localhost:3000/storage/', {
                method: 'POST',
                body: JSON.stringify({"element": initialBody[index]}),
                headers: {"Content-Type": "application/json"}
            }).then((data) => {
                return data.json();
            })
        }

    });
    afterEach(() => {
        fetch('http://localhost:3000/storage/delete', {
            method: 'DELETE',
        }).then((data) => {
            return data.json();
        })          
    });

    it("Should remove all elements", done => {
        fetch('http://localhost:3000/storage/delete', {
            method: 'DELETE',
        }).then((data) => {
            return data.json();
        }).then((data) => {
            expect(data.data.length).toBe(0)
            done();
        })
    });

    it('Should remove one element', done => {
        fetch('http://localhost:3000/storage/0', {
            method: 'DELETE',
        }).then((data) => {
            return data.json();
        }).then((data) => {
            expect(data.data).not.toContain('num1')
            done();
        })
    });

    it('Should show all storage', done => {
        fetch('http://localhost:3000/storage/', {
            method: 'GET',
        }).then((data) => {
            return data.json();
        }).then((data) => {
            expect(JSON.stringify(data.data)).toBe(JSON.stringify(initialBody))
            done();
        })
    });

    it('Should show specific element by id', done => {
        fetch('http://localhost:3000/storage/0', {
            method: 'GET',
        }).then((data) => {
            return data.json();
        }).then((data) => {
            expect(data.data).toContain('num1')
            done();
        })
    });

    it('Must add element to array', done => {
        fetch('http://localhost:3000/storage/', {
            method: 'POST',
            body: JSON.stringify({"element": "string"}),
            headers: {"Content-Type": "application/json"}
        }).then((data) => {
            return data.json();
        }).then((data) => {
            expect(data.data).toContain("string")
            done();
        })
    });

});
