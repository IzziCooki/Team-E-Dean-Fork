import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Components/firebase"

const useLoginAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate("/home");
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
  };
};

export default useLoginAuth;
