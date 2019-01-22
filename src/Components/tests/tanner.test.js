const { inputCheck } = require('../Logic/Logic')

describe('Testing input data types', () => {
    test('if value is an empty string, should return an empty string', () => {
        expect(inputCheck('')).toBe('')
    })
    test('test if string is defined', ()=> {
        expect(inputCheck('asdf')).toBeDefined()
    })
    test('test string is null', ()=> {
        expect(inputCheck(null)).toBeNull()
    })
    test('test incorrect data', () => {
        expect(inputCheck('Tanner')).not.toBe('Kyle')
    })
    test('test value is truthy', ()=> {
        expect(inputCheck('yes')).toBeTruthy()
    })
})