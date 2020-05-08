import '../polyfil'

import { h, render } from 'fre'

const App = (props) => <div>{props.foo}</div>

function begin(target) {
  render(<App foo='bar' />, document.getElementById(target))
}

export { begin }
