const { postUrlWithGeneratedSlug, getUrlFromSlug } = require('../controller');
const router = require('express').Router();

router.post('/', postUrlWithGeneratedSlug);

router.get('/:slug', getUrlFromSlug);

module.exports = router;
