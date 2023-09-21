import React, { forwardRef, useEffect, useState, useRef } from 'react'

export const Search = forwardRef(function Search(props, ref) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [resultMessage, setResultMessage] = useState('')

    const fetchData = async () => {
        try {
            const response = await fetch(
                'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
            )
            const result = await response.json()
            setData(result)
            //console.log(JSON.parse(result))
            setResultMessage(
                resultMessage +
                    'Loaded dictionary list... (' +
                    result.length +
                    ' items)'
            )
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (props.doSearch) {
            console.log(props.inputs)

            fetchData()
            props.setDoSearch(false)
        } else {
            setData(null)
        }
    }, [props.doSearch])

    return (
        <div>
            {data && <div>{resultMessage}</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    )
})
