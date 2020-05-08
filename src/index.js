import '../polyfil'

import { h, render, useState } from 'fre'

function App(props) {
  const [count, setCount] = useState(0)
  return (
    <div>
      {props.foo}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

function begin(target) {
  render(<App foo='bar' />, document.getElementById(target))
}

export { begin }
