import { ToastContainer as ReactToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      transition={Slide}
    />
  )
}

export default ToastContainer
