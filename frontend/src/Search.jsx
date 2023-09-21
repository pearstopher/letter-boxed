import React, { forwardRef, useEffect, useState, useRef } from 'react'

export const Search = forwardRef(function Search(props, ref) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    console.log(props.inputs)

    const fetchData = async () => {
        try {
            const response = await fetch('https://catfact.ninja/fact')
            const result = await response.json()
            setData(result)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (props.doSearch) {
            fetchData()
        } else {
            setData(null)
        }
    }, [props.doSearch])

    return (
        <div>
            {data && <div>{data.fact}</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    )
})
