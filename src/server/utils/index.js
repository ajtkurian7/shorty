const { ALPHABET, SLUG_LENGTH } = require('./constants')

const generateRandomSlug = (slugLength = SLUG_LENGTH, alphabet = ALPHABET) => {
    let slug = '';

    for (let i = 0; i < slugLength; i++) {
        const alphabetIndex = Math.floor(Math.random() * alphabet.length);
        slug += alphabet[alphabetIndex];
    }

    return slug;
};

module.exports = {
    generateRandomSlug,
}