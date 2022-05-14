import { useEffect } from "react";

const MessageAlert = ({ message, setMessage }) => {
  useEffect(() => {
    if (message)
      setTimeout(() => {
        setMessage(null);
      }, 5000);
  }, [message]);
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button
        onClick={() =>setMessage(null)}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default MessageAlert;
