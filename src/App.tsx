import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFizzBuzz } from './hooks/useFizzBuzz'

function App() {
  const { result, increment, mode, setMode } = useFizzBuzz()

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="mode-selector">
          <label>
            <input
              type="radio"
              name="mode"
              value="counter"
              checked={mode === 'counter'}
              onChange={(e) => setMode(e.target.value as 'counter' | 'fizzbuzz' | 'primeOrPerfect')}
            />
            カウンター
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="fizzbuzz"
              checked={mode === 'fizzbuzz'}
              onChange={(e) => setMode(e.target.value as 'counter' | 'fizzbuzz' | 'primeOrPerfect')}
            />
            FizzBuzz
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="primeOrPerfect"
              checked={mode === 'primeOrPerfect'}
              onChange={(e) => setMode(e.target.value as 'counter' | 'fizzbuzz' | 'primeOrPerfect')}
            />
            素数・完全数
          </label>
        </div>
        <button onClick={increment}>
          {result}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
