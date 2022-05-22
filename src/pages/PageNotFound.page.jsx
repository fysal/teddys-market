import React from 'react';
import not_found from '../assets/images/404.png'

const PageNotFound = () => {
  return (
    <div className="container">
        <div className="d-flex flex-column align-items-center pt-5"> 
        <img src={not_found} width="45%" />
        <div className="text-muted fw-bold text-capitalize">Page not found</div>
        </div>

    </div>
  )
}

export default PageNotFound