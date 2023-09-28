import React from 'react'

export const Header = () => {
    return (
        <header>
            <h1>Letter Boxed Solver</h1>
            <p>
                by <a href={'https://pearstopher.com'}>pearstopher</a>{' '}
            </p>
            <p>
                Solve the puzzle yourself first at{' '}
                <a
                    href={'https://www.nytimes.com/puzzles/letter-boxed'}
                    target={'_blank'}
                >
                    The New York Times
                </a>
                !
            </p>
        </header>
    )
}
