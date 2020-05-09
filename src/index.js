import '../polyfill'

import { h, render, useState } from 'fre'

function App(props) {
  const [count, setCount] = useState(0)
  return (
    <div>
      {count} - {props.foo}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

render(<App foo='bar' />, document.getElementById('root'))