import React, { Component } from 'react';
import cc from 'classcat';
import postUrlService from './post-url-service';
import Shorty from './Shorty';

import './Home.css';

class Home extends Component {
    state = {
        slug: '',
        longUrl: '',
        isLoading: false,
        errorMessage: '',
    };

    _getErrorMessage(errorType) {
        if (errorType === 'invalidUrl') {
            return "Sorry that is an invalid URL! Note: Please include http or https if you didn't.";
        }

        return 'Oh oh! Something Went Wrong';
    }

    _handleSubmit = async event => {
        event.preventDefault();
        this._setIsLoading(true);

        const { slug, url, errorMessage, errorType } = await postUrlService(
            this.state.longUrl
        );

        if (errorMessage || errorType) {
            return this.setState({
                errorMessage: this._getErrorMessage(errorType),
                isLoading: false,
            });
        }

        this.setState({
            slug,
            longUrl: url,
            isLoading: false,
        });
    };

    _setIsLoading(isLoading) {
        this.setState({
            isLoading,
        });
    }

    _setLongUrl = e => {
        this.setState({
            longUrl: e.target.value,
            errorMessage: '',
            errorType: '',
        });
    };

    render() {
        const { longUrl, errorMessage, isLoading, slug } = this.state;
        return (
            <div className="home">
                <h1>Welcome To Shorty!</h1>
                <p>
                    We welcome you to input a URL in the field below and a
                    shortened URL will be generated
                </p>
                <form
                    action="/"
                    method="post"
                    className="url-input-form"
                    onSubmit={this._handleSubmit}
                >
                    <div className="input-url">
                        <input
                            placeholder="try http://google.com"
                            value={longUrl}
                            onChange={this._setLongUrl}
                        />
                    </div>
                    <button className="submit" type="submit">
                        {isLoading ? 'Loading...' : 'Generate A Shorty'}
                    </button>
                </form>
                <div
                    className={cc({
                        error: !!errorMessage,
                        'error-details': true,
                    })}
                >
                    {errorMessage}
                </div>
                <Shorty slug={slug} />
            </div>
        );
    }
}

export default Home;
