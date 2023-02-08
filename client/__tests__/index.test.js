import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';

import Home from '../pages/index';
import { getNameQuery } from '../queries/name.query'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('Head')

        expect(heading).toBeInTheDocument()
    })

    it('display user name', () => {
        const userNameMock = {
            request: {
                query: getNameQuery,
                variables: { name: "Mark" }
            },
            result: {
                data: { name: 'Mark' }
            }
        };

        render(
            <MockedProvider mocks={[userNameMock]} addTypename={false}>
                <Home name="Mark" />
            </MockedProvider>
        )
        const welcomeText = screen.getByRole('Head')
        expect(welcomeText).toHaveTextContent('Welcome, Mark')
    })
});