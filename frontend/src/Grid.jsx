import React, { useState, useRef } from 'react';


export const Grid = () => {
    return <div className="grid-container">
        {[...Array(25)].map((_, index) => (
            <div key={index} className="grid-item" id={"grid-item-" + index}></div>
        ))}
    </div>;
}


export const TextBoxes = () => {
    const [inputs, setInputs] = useState(Array(5).fill('0'));
    const inputRefs = useRef( []);

    const handleChange = (index, value) => {
        console.log({index, value});
        console.log(inputRefs)
        if (value.match(/[a-zA-Z]/)) {
            setInputs(prevInputs => {
                const newInputs = [...prevInputs];
                newInputs[index] = value.toUpperCase();
                return newInputs;
            });

            if (index < 4) {
                inputRefs.current[index + 1].focus();
            }
        }
    };
    const handleFocus = (index, value) => {
        console.log({index, value});
        setInputs(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = "";
            return newInputs;
        });


    }


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
                    ref={el => inputRefs.current[index] = el}
                />
            ))}
        </div>
    );
}
