
export const isValidUrl = (url) => {
    const urlRegex = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    return urlRegex.test(url)
}

export default async function postUrlService(longUrl) {
    if (!isValidUrl(longUrl)) {
        return Promise.resolve({
            errorMessage: true,
            errorType: 'invalidUrl'
        })
    }
    try {
        const response = await fetch('/', {
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: longUrl,
            }),
        });
    
        return await response.json();
    } catch(e) {
        return { errorMessage: true }
    }
}
