import './App.css'
import { Grid } from './Grid.jsx'
import { Letters } from './Letters.jsx'
import { useState } from 'react'

function App() {
    const [inputs, setInputs] = useState(Array(12).fill(''))
    const [doSearch, setDoSearch] = useState(false)

    return (
        <div className="app-container">
            <Grid
                inputs={inputs}
                setInputs={setInputs}
                doSearch={doSearch}
                setDoSearch={setDoSearch}
            />
            <Letters inputs={inputs} setDoSearch={setDoSearch} />
        </div>
    )
}

export default App
