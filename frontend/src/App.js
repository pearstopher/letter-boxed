import './App.css'
import { Header } from './Header.jsx'

import { Grid } from './Grid.jsx'
import { Validate } from './Validate.jsx'
import { useState } from 'react'

function App() {
    const [inputs, setInputs] = useState(Array(12).fill(''))
    const [doSearch, setDoSearch] = useState(false)
    const [resultMessage, setResultMessage] = useState([])

    return (
        <div className="app-container">
            <Header />
            <Grid
                inputs={inputs}
                setInputs={setInputs}
                doSearch={doSearch}
                setDoSearch={setDoSearch}
                resultMessage={resultMessage}
                setResultMessage={setResultMessage}
            />
            <Validate
                inputs={inputs}
                setDoSearch={setDoSearch}
                resultMessage={resultMessage}
                setResultMessage={setResultMessage}
            />
        </div>
    )
}

export default App
