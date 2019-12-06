import React from 'react'
import { render } from '@testing-library/react';
import Home from '../../components/Home'

describe('Component - <Home />', () => {
    it('renders without crashing', () => {
        const { queryByText } = render(<Home />)
        console.log(queryByText('Shorty'))
    });
})