import React,{useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import vector from "../assets/images/success_vec.jpg";
import { UserContext } from '../utils/UserContext';


const TransactionComplete = ({location}) => {
   
    const history = useHistory();
    useEffect(()=>{
        if(!location?.state || !location?.state.hasOwnProperty("tag"))
         return history.push("/")
    },[]);

     const { currentUser } = useContext(UserContext);
  return (
    <div className="container py-5 row ">
      <div className="col-sm-6 col-md-6">
        <img src={vector} width="700" />
      </div>
      <div className="col-sm-12 col-md-6 py-5 my-5 d-flex align-items-start justify-content-center flex-column">
        <span className=" text-success d-block mb-3">
          Successful
        </span>
        <h1>Thank You</h1>
        <div className="mb-3 mb-2 fs-6 lh-base">
          Your transaction has been successful.
          <br />A confirmation email has been sent to<br/> <span className="text-success fw-bold">{currentUser?.email}</span>.
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Link
          to="/"
          className="btn btn-md btn-outline-secondary me-3 rounded-0 text-capitalize"
        >
          Continue shopping
        </Link>
        <Link to="/" className="btn btn-primary btn-md rounded-0">
          <span className="text-capitalize">Track your order</span>
        </Link>
      </div>
    </div>
  );
};

export default TransactionComplete;
