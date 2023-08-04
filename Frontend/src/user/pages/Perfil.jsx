import { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/UserStyle.css'

const URL = "https://kinals-corner-humbertolopez2020327.vercel.app/api/";

export const Perfil = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});


  useEffect(() => {
    const retrievedToken = localStorage.getItem("token");
    setToken(retrievedToken);
  }, []);



  return (
    <>
    </>
  )
}
