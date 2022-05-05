const firebaseErrorHandler = (errorCode) => {
  switch (errorCode) {
    case "auth/network-request-failed":
      return "Network connection failed";
    case "auth/user-not-found":
      return "User does not exist";
    case "auth/wrong-password":
      return "Wrong username or password";
    case "auth/email-already-in-use" :
        return "User with email already exists"

    default:
      return "Something went wrong";
  }
};

export default firebaseErrorHandler;
