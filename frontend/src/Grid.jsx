import React, { forwardRef, useEffect, useState, useRef } from 'react'

export const Grid = forwardRef(function Grid(props, ref) {
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

            <TextBoxes ref={gridRefs} />
        </div>
    )
})

export const TextBoxes = forwardRef(function TextBoxes(props, ref) {
    const [inputs, setInputs] = useState(Array(5).fill('0'))
    const inputRefs = useRef([])

    const handleChange = (index, value) => {
        console.log({ index, value })
        console.log(inputRefs)
        if (value.match(/[a-zA-Z]/)) {
            setInputs((prevInputs) => {
                const newInputs = [...prevInputs]
                newInputs[index] = value.toUpperCase()
                return newInputs
            })

            if (index < 4) {
                inputRefs.current[index + 1].focus()
            } else {
                inputRefs.current[0].focus()
            }
        }
    }
    const handleFocus = (index, value) => {
        console.log({ index, value })
        setInputs((prevInputs) => {
            const newInputs = [...prevInputs]
            newInputs[index] = ''
            return newInputs
        })
    }

    useEffect(() => {
        // attach the boxes to the grids
        ref.current[0].appendChild(inputRefs.current[0])
        ref.current[1].appendChild(inputRefs.current[1])
        ref.current[2].appendChild(inputRefs.current[2])
        ref.current[3].appendChild(inputRefs.current[3])
        ref.current[4].appendChild(inputRefs.current[4])
    }, []) // <-- empty array means 'run once'

    return (
        <div className="text-container">
            {inputs.map((value, index) => (
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
