import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../utils/usersSlice";
import { USER_AVATAR } from "../utils/constants";
import { useDispatch } from "react-redux";

const useLoginLogic = (email, password, name, setErrMessage, isSignIn) => {
  let dispatch = useDispatch();

  const loginAction = () => {
    let message = checkValidData(
      email.current.value,
      password.current.value,
      isSignIn ? "name" : name.current.value
    );
    setErrMessage(message);

    if (message) {
      console.log("no run");
      return;
    }

    //sign In/sign up
    if (!isSignIn) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                  photoURL: photoURL,
                })
              );
              // ...
            })
            .catch((error) => {
              // An error occurred
              console.log(error);

              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "---" + errorMessage);
          // ..
        });
    } else {
      //Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user Logged  in", user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "/n" + errorMessage);
          setErrMessage("User Not Found");
        });
    }
  };
  return loginAction;
};
export default useLoginLogic;
