import { ToastContainer as ReactToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="colored"
      transition={Slide}
    />
  )
}

export default ToastContainer
