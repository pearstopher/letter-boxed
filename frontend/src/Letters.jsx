import React, { forwardRef, useEffect, useState, useRef } from 'react'

export const Letters = forwardRef(function Letters(props, ref) {
    const [letters, setLetters] = useState(
        Array('L', 'E', 'T', 'T', 'E', 'R', '-', 'B', 'O', 'X', 'E', 'D')
    )

    return (
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
    )
})
