import React, {
    forwardRef,
    useEffect,
    useState,
    useCallback,
    useRef,
} from 'react'

function useStateCallback(initialState) {
    const [state, setState] = useState(initialState)
    const cbRef = useRef(null) // init mutable ref container for callbacks

    const setStateCallback = useCallback((state, cb) => {
        cbRef.current = cb // store current, passed callback in ref
        setState(state)
    }, []) // keep object reference stable, exactly like `useState`

    useEffect(() => {
        // cb.current is `null` on initial render,
        // so we only invoke callback on state *updates*
        if (cbRef.current) {
            cbRef.current(state)
            cbRef.current = null // reset callback after execution
        }
    }, [state])

    return [state, setStateCallback]
}

export const Search = forwardRef(function Search(props, ref) {
    const [data, setData] = useStateCallback(null)
    const [error, setError] = useState(null)
    const [resultMessage, setResultMessage] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(
                'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
            )
            const result = await response.json()
            const allWords = Object.keys(result)
            setData(allWords, (s) => removeExtraWords(s))
            const newMessage =
                'Loaded dictionary list... (' +
                Object.keys(result).length +
                ' items)'
            setResultMessage((resultMessage) => [...resultMessage, newMessage])
        } catch (error) {
            setError(error)
        }
    }

    const removeExtraWords = (s) => {
        const goodWords = s.filter((word) => !badWord(word))
        console.log(goodWords)
        setData(goodWords, (s) => console.log(goodWords))
        const newMessage = 'Optimizing list... (' + goodWords.length + ' items)'
        setResultMessage((resultMessage) => [...resultMessage, newMessage])
    }
    const badWord = (word) => {
        let bad = false

        // reject any word with that contains a letter thats not on the board
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const lettersToRemove = props.inputs.map((letter) =>
            letter.toLowerCase()
        ) // Example list of letters to remove
        const badLetters = alphabet.filter(
            (letter) => !lettersToRemove.includes(letter)
        )
        if (badLetters.some((letter) => word.includes(letter))) {
            bad = true
        }

        // reject any word that's two characters or less
        if (word.length < 3) {
            bad = true
        }

        // reject any word that has any consecutive letters (could preprocess this and make my own dictionary)
        const letterArray = word.split('')
        const set = new Set(letterArray)
        if (set.size !== letterArray.length) {
            bad = true
        }

        return bad
    }

    useEffect(() => {
        if (props.doSearch) {
            //console.log(props.inputs)

            fetchData()
            props.setDoSearch(false)
        } else {
            //setData(null)
        }
    }, [props.doSearch])

    return (
        <div>
            {data &&
                resultMessage.map((message, index) => (
                    <span key={index}>{message}</span>
                ))}
            {error && <div>Error: {error.message}</div>}
        </div>
    )
})
