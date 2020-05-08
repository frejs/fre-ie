import '../polyfil'

import { h, render } from 'fre'

const App = (props) => <div>I am a widget! My foo prop says {props.foo}.</div>

function begin(target) {
  render(<App foo='bar' />, document.getElementById(target))
}

export { begin }
