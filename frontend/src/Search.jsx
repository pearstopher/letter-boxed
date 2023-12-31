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
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [solutions, setSolutions] = useState([])

    const [loaded, setLoaded] = useState(false)
    const [optimized, setOptimized] = useState(false)
    const [sorted, setSorted] = useState(false)
    const [done, setDone] = useState(false)

    const fetchData = async () => {
        try {
            const response = await fetch(
                //'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
                'https://raw.githubusercontent.com/benjamincrom/scrabble/master/scrabble/dictionary.json'
            )
            const result = await response.json()
            //const allWords = Object.keys(result)
            const newMessage =
                'Loaded dictionary list... (' +
                Object.keys(result).length +
                ' items)'
            //const resultMessage = [...props.resultMessage, newMessage]
            let resultMessage = props.resultMessage
            resultMessage[0] = newMessage
            props.setResultMessage(resultMessage)

            //console.log(resultMessage)
            //console.log(props.resultMessage)

            setLoaded(true)
            setData(result)

            //let resultMessage = [].concat(props.resultMessage, [newMessage])
            //props.setResultMessage((props.resultMessage) => [...props.resultMessage, newMessage])
        } catch (error) {
            setError(error)
        }
    }

    const removeExtraWords = (s) => {
        // make a list of the letters that can't be in any of the words
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const lettersOnBoard = props.inputs.map((letter) =>
            letter.toLowerCase()
        )
        const badLetters = alphabet.filter(
            (letter) => !lettersOnBoard.includes(letter)
        )

        // make a list of letters that are on the same side as other letters
        function generatePairs(group) {
            const pairs = []
            for (let i = 0; i < group.length; i++) {
                for (let j = i + 1; j < group.length; j++) {
                    pairs.push(group[i] + group[j])
                    pairs.push(group[j] + group[i])
                }
            }
            console.log(pairs)
            return pairs
        }
        const groups = [
            lettersOnBoard.slice(0, 3),
            lettersOnBoard.slice(3, 6),
            lettersOnBoard.slice(6, 9),
            lettersOnBoard.slice(9, 12),
        ]
        const pairs = groups.flatMap((group) => generatePairs(group))

        const goodWords = data.filter(
            (word) => !badWord(word, badLetters, pairs)
        )
        setOptimized(true)
        setData(goodWords)
        const newMessage = 'Optimizing list... (' + goodWords.length + ' items)'
        //let resultMessage = [...props.resultMessage, newMessage]
        //let resultMessage = [].concat(props.resultMessage, [newMessage])
        let resultMessage = props.resultMessage
        resultMessage[1] = newMessage

        props.setResultMessage(resultMessage)
    }
    const badWord = (word, badLetters, pairs) => {
        let bad = false

        // reject any word with that contains a letter that's not on the board
        if (badLetters.some((letter) => word.includes(letter))) {
            bad = true
        }

        // reject any word that's two characters or less
        if (word.length < 3) {
            bad = true
        }

        // reject any word that has any consecutive letters (could preprocess this and make my own dictionary)
        //const letterArray = word.split('')
        //const set = new Set(letterArray)
        //if (set.size !== letterArray.length) {
        //    bad = true
        //}
        if (hasConsecutiveDuplicates(word)) {
            bad = true
        }

        // reject any word that letters that are on the same side of the board
        if (hasPairs(word, pairs)) {
            bad = true
        }

        return bad
    }
    function hasConsecutiveDuplicates(word) {
        return /(\w)\1/.test(word)
    }
    function hasPairs(word, pairs) {
        return pairs.some((pair) => word.includes(pair))
    }

    const sortWords = (s) => {
        function countUniqueLetters(word) {
            const uniqueLetters = new Set(word)
            return uniqueLetters.size
        }
        const sortedList = data.sort(
            (a, b) => countUniqueLetters(b) - countUniqueLetters(a)
        )
        setSorted(true)
        setData([...sortedList]) // it doesn't know the state gets updated unless I do this

        const newMessage = 'Sorting list...'
        let resultMessage = props.resultMessage
        resultMessage[2] = newMessage
        props.setResultMessage(resultMessage)
    }

    const solve = () => {
        let messageIndex = 3
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data[i].slice(-1) === data[j][0]) {
                    const letterArray = (data[i] + data[j]).split('')
                    const set = new Set(letterArray)
                    if (set.size === 12) {
                        const solution = data[i] + '-' + data[j]
                        console.log(solution)
                        const newMessage = solution
                        let resultMessage = props.resultMessage
                        resultMessage[messageIndex] = newMessage
                        messageIndex++

                        props.setResultMessage([...resultMessage])
                    }
                }
            }
        }
        const newMessage = 'Found ' + (messageIndex - 3) + ' solutions!'
        let resultMessage = props.resultMessage
        resultMessage[messageIndex] = newMessage

        props.setResultMessage([...resultMessage])
        setDone(true)
    }

    useEffect(() => {
        if (!loaded && !optimized && !sorted) {
            if (props.doSearch) {
                fetchData()
                props.setDoSearch(false)
            } else {
                //setData(null)
            }
        } else if (loaded && !optimized && !sorted) {
            console.log('removing extra words')
            removeExtraWords()
        } else if (loaded && optimized && !sorted) {
            console.log('sorting')
            sortWords()
        } else if (loaded && optimized && sorted && !done) {
            console.log('building solutions')
            solve()
            setLoaded(false)
            setOptimized(false)
            setSorted(false)
            setDone(false)
        } else if (done) {
            console.log('done')
            // skipping 'done' phase for now
        }
    }, [props.doSearch, data])

    return (
        <div>
            {data &&
                props.resultMessage.map((message, index) => (
                    <span key={index}>{message}</span>
                ))}
            {error && <div>Error: {error.message}</div>}
        </div>
    )
})
