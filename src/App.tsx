import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFizzBuzz } from './hooks/useFizzBuzz'
import { TimeGreeting } from './components/TimeGreeting'

function App() {
  const { result, increment, mode, setMode, incrementType, setIncrementType } = useFizzBuzz()

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
      <TimeGreeting />
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
        <div className="mode-selector">
          <label>
            <input
              type="radio"
              name="incrementType"
              value="add"
              checked={incrementType === 'add'}
              onChange={(e) => setIncrementType(e.target.value as 'add' | 'subtract' | 'fibonacci' | 'multiply')}
            />
            +1
          </label>
          <label>
            <input
              type="radio"
              name="incrementType"
              value="subtract"
              checked={incrementType === 'subtract'}
              onChange={(e) => setIncrementType(e.target.value as 'add' | 'subtract' | 'fibonacci' | 'multiply')}
            />
            -1
          </label>
          <label>
            <input
              type="radio"
              name="incrementType"
              value="fibonacci"
              checked={incrementType === 'fibonacci'}
              onChange={(e) => setIncrementType(e.target.value as 'add' | 'subtract' | 'fibonacci' | 'multiply')}
            />
            フィボナッチ
          </label>
          <label>
            <input
              type="radio"
              name="incrementType"
              value="multiply"
              checked={incrementType === 'multiply'}
              onChange={(e) => setIncrementType(e.target.value as 'add' | 'subtract' | 'fibonacci' | 'multiply')}
            />
            乗数
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
