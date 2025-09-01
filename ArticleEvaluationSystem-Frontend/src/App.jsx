import './App.css'
import RouterConfig from './route/RouterConfig'
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <div>
      <RouterConfig />
      <ToastContainer position='top-right' autoClose={2000} />


    </div>
  )
}

export default App
