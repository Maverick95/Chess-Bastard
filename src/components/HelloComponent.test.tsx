import React from 'react';
import HelloComponent from './HelloComponent';
import {render, screen} from '@testing-library/react';

describe('HelloComponent', () => {

    test('renders basic greeting', async () => {

        // ACT
        render(<HelloComponent />);

        // ASSERT
        await screen.findByText(/hello there/i);

    });

});