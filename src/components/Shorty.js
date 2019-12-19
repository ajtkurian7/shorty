import React from 'react';

const Shorty = function({ slug }) {
    if (!slug) {
        return null;
    }

    const shortUrl = `${window.location.origin}/${slug}`;

    return (
        <div className="shorty">
            <span>Your Shorty: </span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
            </a>
        </div>
    );
}

export default Shorty;
