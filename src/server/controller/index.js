const { getUrlFromDb, postUrlToDb } = require('../model/url');

const getUrlFromSlug = async (req, res) => {
    const { slug } = req.params;
    const url = await getUrlFromDb(slug);
    if (!url) {
        return res.status(404).send('<h1>404: Sorry You seem to be lost</h1>');
    }

    res.redirect(301, url);
};

const postUrlWithGeneratedSlug = async (req, res) => {
    const { url } = req.body;
    const response = await postUrlToDb(url);
    if (response.success) {
        return res.status(200).send({ slug: response.slug, url: response.url });
    }

    return res.status(500).send('Oh Something went wrong');
};

module.exports = {
    postUrlWithGeneratedSlug,
    getUrlFromSlug,
};
