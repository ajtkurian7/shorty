import fetch from 'isomorphic-fetch'

describe('GET and POST URL', () => {
    let slugStore;
    it('should post to the databse the url', async () => {
        const response = await fetch(
            'http://localhost:5000/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: 'http://google.com'
                })
            }
        )

        const { slug, url } = await response.json()
        
        expect(url).toBe('http://google.com')
        expect(slug).toMatch(/^[a-zA-Z 0-9]*$/)
        slugStore = slug
    })

    it('should GET posted url', async () => {
        const response = await fetch(
            'http://localhost:5000/' + slugStore
        )

        expect(response.url.includes('google.com')).toBe(true)
    })
})