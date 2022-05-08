import { auth, firebase } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, set, onValue} from "firebase/database";
import { uid } from "uid";

export const loginWithEmailAndPassword = async (
  formData,
  currentUser,
  setCurrentUser
) => {
  let res;
  try {
    await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).then((user) => {
      console.log(user);
      setCurrentUser(user);
      getUserData(user.user.uid, currentUser, setCurrentUser);
    });

    res = { status: "success" };
    return res;
  } catch (error) {
    res = { status: "failed", code: error.code };
    return res;
  }
};

export const signupUserWithEmailAndPassword = async (formData) => {
  let resp;
  try {
    let data = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    await storeUserData(data.user, formData);

    resp = { status: "success" };
    return resp;
  } catch (error) {
    console.log(error);
    resp = { status: "failed", errorCode: error.code };
    return resp;
  }
};

export const storeUserData = async (user, formData) => {
  formData.userId = user.uid;
  formData.token = user.accessToken;
  formData.accountType = "customer";
  formData.imageUrl = "default";

  let hour = new Date().getHours() % 12;
  let date = new Date().toLocaleDateString();
  let amPm = hour >= 12 ? "pm" : "am";

  formData.joinDate =
    date + " " + hour + ":" + new Date().getMinutes() + " " + amPm.toUpperCase;

  delete formData.password;
  delete formData.confirmPassword;
  set(ref(firebase, "Users/" + user.uid), formData);
};

export const getUserData = async (uid, currentUser, setCurrentUser) => {
  try {
    onValue(ref(firebase, "Users/" + uid), (snapshot) => {
      const {
        userName,
        address,
        adminArea,
        locality,
        imageUrl,
        countryName,
        phoneNumber,
        userId,
      } = snapshot.val();

      setCurrentUser({
        email: currentUser.email,
        displayName: userName,
        uid : currentUser.uid,
        address,
        adminArea,
        locality,
        imageUrl,
        countryName,
        phoneNumber,
        userId,
      });
    });
  } catch (error) {
    // console.log(error);
  }
};

export const addToCart = async (currentUser, quantity = 1, product) => {
  let response = "";
  let itemTotal = parseInt(product.itemPrice) * quantity;
  let hours = new Date().getHours() % 12;
  let minutes = new Date().getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  try {
    const cartItem = {
      itemCount: quantity,
      itemId: product.itemId,
      cartId: uid(16),
      itemTotal,
      itemPrice: parseInt(product.itemPrice),
      itemOwner: currentUser.userId,
      timeStamp: Date.now(),
      postDate:
        new Date().toLocaleDateString() +
        " " +
        hours +
        ":" +
        minutes +
        " " +
        ampm,
    };
    await set(
      ref(firebase, `CartTest/${currentUser.userId}/${product.itemId}`),
      { ...cartItem }
    );
    response = { status: "success" };
    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };
    return response;
  }
};;

export const getCartItems = (uid, setCartItems) => {
   
  try {
    onValue(ref(firebase, `CartTest/${uid}`), snapshot => {
      const data = snapshot.val();
      let cartItems = Object.values(data).map( item => item);
     setCartItems(cartItems);
    });
    
  } catch (error) {
    console.log(error)
  }
};

export const fetchGroceries = (setGroceries, setFetching) => {

  try {
    onValue(ref(firebase,"Groceries"), snapshot => {
       const data = snapshot.val();

       if (data !== null) {
         Object.values(data).map((grocery) => {
           setGroceries((groceries) => [...groceries, grocery]);
           setFetching(false);
         });
       }
    })
    
  } catch (error) {
    
  }

}