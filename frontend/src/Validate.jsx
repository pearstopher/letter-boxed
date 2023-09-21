import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { Search } from './Search.jsx'

export const Validate = forwardRef(function Letters(props, ref) {
    const [letters, setLetters] = useState(
        Array('L', 'E', 'T', 'T', 'E', 'R', '-', 'B', 'O', 'X', 'E', 'D')
    )
    const [noDuplicates, setNoDuplicates] = useState(true)
    const [noBadCharacters, setNoBadCharacters] = useState(false)
    const [message, setMessage] = useState(
        'You can search once you fill in all the letters.'
    )

    function getNoDuplicates(arr) {
        const ignoreBlanks = arr.filter((item) => item !== '')
        const set = new Set(ignoreBlanks)
        return set.size === ignoreBlanks.length
    }
    function getNoBadCharacters(arr) {
        return !arr.includes('')
    }

    useEffect(() => {
        setNoDuplicates(getNoDuplicates(props.inputs))
        setNoBadCharacters(getNoBadCharacters(props.inputs))

        if (!noDuplicates) {
            setMessage('You cant use the same letter more than once.')
        } else if (!noBadCharacters) {
            setMessage('You can search once you fill in all the letters.')
        } else {
            setMessage('')
        }
    }, [props.inputs, noDuplicates, noBadCharacters])

    return (
        <div className="submit-wrapper">
            <div className="letters-container">
                {props.inputs.map((_, index) => (
                    <span key={index} className={('letter', 'letter-' + index)}>
                        {props.inputs[index] === '' ? (
                            <span className={'grey'}>{letters[index]}</span>
                        ) : (
                            props.inputs[index]
                        )}
                    </span>
                ))}
            </div>
            <div className="valid-container">
                <span>{message}</span>
            </div>
            <div className="submit-container">
                {noDuplicates && noBadCharacters ? (
                    <span
                        className={'button'}
                        onClick={(e) => props.setDoSearch(true)}
                    >
                        Search
                    </span>
                ) : (
                    <span className={'button grey'}>Search</span>
                )}
            </div>
        </div>
    )
})
