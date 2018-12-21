const {getDuration} = require('../Logic/Logic')

describe("Tests duration conversion", ()=> {
    test('if given false, should return empty string', () => {
        expect(getDuration(false)).toBe('');
    })
    test('if given non-numeric string, should return NaN', () => {
        expect(getDuration("string")).toBe("NaN:aN");
    })
    test('if given numeric string, return string', () => {
        expect(getDuration("185")).toBe("3:05");
    })
    test('if given number, return string', () => {
        expect(getDuration(8)).toBe("0:08");
    })
    test('if given number or numeric string, should have a length', () => {
        expect(getDuration(631)).toHaveLength(5)
    })
})