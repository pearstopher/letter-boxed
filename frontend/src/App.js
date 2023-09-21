import './App.css'
import { Grid } from './Grid.jsx'
import { Letters } from './Letters.jsx'
import { useState } from 'react'

function App() {
    const [inputs, setInputs] = useState(Array(12).fill(''))

    return (
        <div className="app-container">
            <Grid inputs={inputs} setInputs={setInputs} />
            <Letters inputs={inputs} />
        </div>
    )
}

export default App
