import React from 'react'
import Slider from '../components/slider/MainSlider';
import Products from '../components/Products';
import GiftStrip from '../components/GiftStrip';
import BestFoodComponent from '../components/BestFood.component';
import BlogComponent from '../components/Blog.component';
import NewsLetter from '../components/NewsLetter.component';
import { ToastContainer } from 'react-toastify'
  import "react-toastify/dist/ReactToastify.css";

const Home = () => {
return (
  <>
    <div className="position-fixed top end-0 p-3 " style={{ zIndex: "11" }}>
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
    <Slider />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Products />
    <GiftStrip />
    <BestFoodComponent />
    <BlogComponent />
    <NewsLetter />
  </>
);
}

export default Home