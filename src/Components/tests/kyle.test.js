const { disable } = require('../Logic/Logic')


const info = {id: 2, greeting: 'whatup'}


describe('Tests disable on click', () => {
    test('typeof should return boolean', () => {
        expect(typeof(disable(true))).toBe('boolean')
    })
    test('true should return false', () => {
        expect(disable(true)).toBe(false)
    })
    test('false should return true', () => {
        expect(disable(false)).toBe(true)
    })
    test('non-boolean should return nan', ()=>{
        expect(disable(15)).toBe(NaN)
    })
    test('non-boolean should return undefined', ()=>{
        expect(disable(info)).toBe(undefined)
    }) 
})



