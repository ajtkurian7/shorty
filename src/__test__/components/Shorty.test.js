import React from 'react';
import Shorty from '../../components/Shorty';
import { shallow } from 'enzyme';

describe('Component: Shorty', () => {
    it('should render the Slug as a link', () => {
        const origin = window.location.origin;
        const slug = 'slug';
        const wrapper = shallow(<Shorty slug={slug} />);

        expect(wrapper.find('a').text()).toBe(`${origin}/${slug}`);
    });

    it('should render null if slug is not passed in', () => {
        const slug = null;
        const wrapper = shallow(<Shorty slug={slug} />);

        expect(wrapper.isEmptyRender()).toBe(true)
    });
});
