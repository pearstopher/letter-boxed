import React, { forwardRef, useEffect, useState, useRef } from 'react'

export const Grid = forwardRef(function Grid({ inputs, setInputs }, ref) {
    const gridRefs = useRef([])

    return (
        <div className="grid-container">
            {[...Array(12)].map((_, index) => (
                <div
                    key={index}
                    className="grid-item"
                    id={'grid-item-' + (index + 1)}
                    ref={(el) => (gridRefs.current[index] = el)}
                ></div>
            ))}
            <div key={0} id={'middle'}></div>
            <div key={13} id={'refresh'}>
                <Refresh setInputs={setInputs} />
            </div>

            <TextBoxes inputs={inputs} setInputs={setInputs} ref={gridRefs} />
        </div>
    )
})

export const TextBoxes = forwardRef(function TextBoxes(props, ref) {
    //const [inputs, setInputs] = useState(Array(12).fill(''))
    const inputRefs = useRef([])

    const handleChange = (index, value) => {
        if (value.match(/[a-zA-Z]/) || value === '') {
            props.setInputs((prevInputs) => {
                const newInputs = [...prevInputs]
                newInputs[index] = value.toUpperCase()
                return newInputs
            })

            if (value !== '') {
                if (index < 11) {
                    inputRefs.current[index + 1].focus()
                } else {
                    inputRefs.current[0].focus()
                }
            }
        }
    }
    const handleFocus = (index, value) => {
        console.log({ index, value })
        props.setInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            //newInputs[index] = ''
            return newInputs
        })
    }

    useEffect(() => {
        // attach the boxes to the grids
        for (let i = 0; i < 12; i++) {
            ref.current[i].appendChild(inputRefs.current[i])
        }
        inputRefs.current[0].focus()
    }, []) // <-- empty array means 'run once'

    return (
        <div className="text-container">
            {props.inputs.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    className="letter-input"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onFocus={(e) => handleFocus(index, e.target.value)}
                    //ref={inputRefs[index]}
                    //ref={(element) => inputRefs.current.push(element)}
                    ref={(el) => (inputRefs.current[index] = el)}
                />
            ))}
        </div>
    )
})

export const Refresh = forwardRef(function Refresh(props, ref) {
    const resetInputs = () => {
        props.setInputs(Array(12).fill(''))
    }

    return (
        <span>
            <a onClick={(e) => resetInputs()}>Reset</a>
        </span>
    )
})
