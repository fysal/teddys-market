import { auth, database, storage } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  ref,
  set,
  onValue,
  remove,
  update,
  orderByChild,
  orderByValue,
  equalTo,
  query,
  increment,
} from "firebase/database";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
  set(ref(database, "Users/" + user.uid), formData);
};

export const getUserData = async (uid, currentUser, setCurrentUser) => {
  try {
    onValue(ref(database, "Users/" + uid), (snapshot) => {
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
        uid: currentUser.uid,
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
      ref(database, `CartTest/${currentUser.userId}/${product.itemId}`),
      { ...cartItem }
    );
    response = { status: "success" };
    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };
    return response;
  }
};

export const getCartItems = (uid, setCartItems) => {
  try {
    onValue(ref(database, `CartTest/${uid}`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let cartItems = Object.values(data).map((item) => item);
        setCartItems({ original: data, items: cartItems });
      } else {
        setCartItems({ original: null, items: [] });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (uid) => {
  let response = null;
  try {
    await remove(ref(database, `CartTest/${uid}`));
    response = { status: "successful" };
    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };
    return response;
  }
};

export const fetchGroceries = (setGroceries, setFetching) => {
  try {
    onValue(ref(database, "Groceries"), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        Object.values(data).map((grocery) => {
          setGroceries((groceries) => [...groceries, grocery]);
          setFetching(false);
        });
      }
    });
  } catch (error) {}
};

export const storeOrder = async (orderId, payload) => {
  let response = "";
  try {
    await set(ref(database, `Orders/${orderId}`), payload);
    response = { status: "successfull" };
    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };

    return response;
  }
};

export const fetchUserOrders = async (userId, setOrdersList) => {
  try {
    const newOrderList = [];

    const dbRef = query(
      ref(database, "Orders"),
      orderByChild("userId"),
      equalTo(userId)
    );
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        Object.values(snapshot.val()).forEach((snap) => {
          newOrderList.push(snap);
        });
        newOrderList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrdersList([...newOrderList]);
      } else setOrdersList([]);
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateUserPicture = async (uid, image, setUploading) => {
  let response = null;
  try {
    setUploading((prevState) => ({ ...prevState, status: true }));
    const uploadTask = uploadBytesResumable(
      storageRef(storage, "images/" + uid),
      image
    );
    let progress = 0;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading((prevState) => ({ ...prevState, progress }));
      },
      (error) => {
        response = { status: "failed", code: error.code };
        setUploading((prevState) => ({ ...prevState, status: false }));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          update(ref(database, "Users/" + uid), { imageUrl: downloadUrl });
          setUploading((prevState) => ({ ...prevState, status: false }));
          response = { status: "successful" };
        });
      }
    );

    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };
    return response;
  }
};

export const updateUserData = async (uid, payload) => {
  let response = null;
  const {
    displayName: userName,
    phoneNumber,
    adminArea,
    locality,
    countryName,
    address,
  } = payload;
  try {
    await update(ref(database, "/Users/" + uid), {
      userName,
      phoneNumber,
      adminArea,
      locality,
      countryName,
      address,
    });

    response = { status: "successful" };
    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };
    return response;
  }
};

export const removeItemFromCart = async (cartId, itemId) => {
  let response = "";
  try {
    await remove(ref(database, `CartTest/${cartId}/${itemId}`));
    response = { status: "successful", message: "Item removed from cart" };

    return response;
  } catch (error) {
    response = { status: "failed", code: error.code };
  }
};

export const incrementItem = async (cartId, itemId) => {
  try {
    update(ref(database, `CartTest/${cartId}/${itemId}`), {
      itemCount: increment(1),
    });
  } catch (error) {
    console.log(error);
  }
};
export const decrementItem = async (cartId, itemId) => {
  try {
    update(ref(database, `CartTest/${cartId}/${itemId}`), {
      itemCount: increment(-1),
    });
  } catch (error) {
    console.log(error);
  }
};
