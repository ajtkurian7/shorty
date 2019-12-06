import {generateRandomSlug} from '../../server/utils'
describe('generateRandomSlug', () => {
    it('should generate random slug', () => {
        expect(generateRandomSlug(1, 'A')).toBe('A')
    })

    it('should generate a more complex random slug', () => {
        const alphabet = 'ABCDEF'
        const length = 4
        const slug = generateRandomSlug(length, alphabet)
        expect(slug.length).toBe(length)
        for (let letter of slug) {
            expect(alphabet.includes(letter)).toBe(true)
        }
    })
})