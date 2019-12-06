const { generateRandomSlug } = require('../utils');
const dbAdapters = require('../db-adapters');

const postUrlToDb = async (url, counter = 0) => {
    if (counter > 2) {
        return;
    }
    const slug = generateRandomSlug();
    const response = await dbAdapters.put(slug, url);
    console.log(response)
    if (!response.success && response.isDuplicateKey) {
        return postUrlToDb(url, counter + 1);
    }
    return {
        ...response,
        slug,
        url
    };
};

const getUrlFromDb = async slug => {
    const response = await dbAdapters.get(slug);
    return response.url;
};

module.exports = {
    postUrlToDb,
    getUrlFromDb,
};
