import React from 'react';
import Home from '../../components/Home';
import postUrlService from '../../components/post-url-service';
import { shallow } from 'enzyme';

jest.mock('../../components/post-url-service.js');

describe('Component - <Home />', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Home />);

        expect(wrapper.find('h1').text()).toBe('Welcome To Shorty!');
    });

    it('should show loading if is in isLoading state', () => {
        const wrapperHome = shallow(<Home />);
        expect(wrapperHome.find('.submit').text()).toEqual('Generate A Shorty');
        wrapperHome.setState({
            isLoading: true,
        });
        expect(wrapperHome.find('.submit').text()).toEqual('Loading...');
    });

    it('should call the postUrlService on Submit', async () => {
        const wrapperHome = shallow(<Home />);

        wrapperHome.setState({
            longUrl: 'http://google.com',
        });

        postUrlService.mockImplementation(() => ({ url: 'url', slug: 'slug' }));

        await wrapperHome
            .find('form')
            .simulate('submit', { preventDefault: () => {} });

        expect(postUrlService.mock.calls[0][0]).toBe('http://google.com');
        expect(wrapperHome.state('slug')).toBe('slug');
        expect(wrapperHome.state('longUrl')).toBe('url');
        expect(wrapperHome.state('isLoading')).toBe(false);
    });

    it('should return an invalidUrl error message', async () => {
        const wrapperHome = shallow(<Home />);

        wrapperHome.setState({
            longUrl: 'http://google.com',
        });

        postUrlService.mockImplementation(() => ({
            errorMessage: 'test',
            errorType: 'invalidUrl',
        }));

        await wrapperHome
            .find('form')
            .simulate('submit', { preventDefault: () => {} });

        expect(wrapperHome.state('errorMessage')).toEqual(
            "Sorry that is an invalid URL! Note: Please include http or https if you didn't."
        );
    });

    it('should return a generic error message', async () => {
        const wrapperHome = shallow(<Home />);

        wrapperHome.setState({
            longUrl: 'http://google.com',
        });

        postUrlService.mockImplementation(() => ({
            errorMessage: 'test',
        }));

        await wrapperHome
            .find('form')
            .simulate('submit', { preventDefault: () => {} });

        expect(wrapperHome.state('errorMessage')).toEqual(
            'Oh oh! Something Went Wrong'
        );
    });

    it('should set longUrl on input change', () => {
        const wrapperHome = shallow(<Home />);

        wrapperHome.find('.input-url input').simulate('change', {
            target: { value: 'hi' }
        })

        expect(wrapperHome.state('longUrl')).toBe('hi')
    });

    it('should send teh slug down to the Shorty component', () => {
        const wrapperHome = shallow(<Home />);
        wrapperHome.setState({
            slug: 'slug'
        })

        expect(wrapperHome.find('Shorty').prop('slug')).toBe('slug')
    })
});
