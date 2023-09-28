import React from 'react'

export const Header = () => {
    return (
        <header>
            <h1>Letter Boxed Solver</h1>
            <p>
                Solver for the{' '}
                <a
                    href={'https://www.nytimes.com/puzzles/letter-boxed'}
                    target={'_blank'}
                >
                    Letter Boxed
                </a>{' '}
                puzzle by{' '}
                <a href={'https://www.nytimes.com/'} target={'_blank'}>
                    The New York Times
                </a>
                .
            </p>
            <p>
                by <a href={'https://pearstopher.com'}>pearstopher</a>{' '}
            </p>
        </header>
    )
}
