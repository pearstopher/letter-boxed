import React, { forwardRef, useEffect, useState, useRef } from 'react'

export const Letters = forwardRef(function Letters(props, ref) {
    const [letters, setLetters] = useState(
        Array('L', 'E', 'T', 'T', 'E', 'R', '-', 'B', 'O', 'X', 'E', 'D')
    )
    const [valid, setValid] = useState(false)

    function noDuplicates(arr) {
        const set = new Set(arr)
        return set.size === arr.length
    }
    function noBadCharacters(arr) {
        return !arr.includes('')
    }

    useEffect(() => {
        setValid(noDuplicates(props.inputs) && noBadCharacters(props.inputs))
    })

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
                {valid ? (
                    <span className="valid">These letters are valid.</span>
                ) : (
                    <span className="invlid">These letters are not valid.</span>
                )}
            </div>
        </div>
    )
})
