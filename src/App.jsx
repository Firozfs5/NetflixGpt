import { Provider } from 'react-redux'
import Body from './components\'/Body'
import './index.css'
import appStore from './utils/appStore'

function App() {

  return (
    <div className='text-xl text-amber-300'>
      <Provider store={appStore } >
        <Body />
      </Provider>
    </div>
  )
}

export default App
