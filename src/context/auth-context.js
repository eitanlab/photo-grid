import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isAuth: false,
  token: null
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const result = await axios.post("http://interview.agileengine.com/auth", {
        apiKey: "23567b218376f79d9415",
      });
      setIsAuthenticated(result.data.auth);
      setToken(result.data.token);
    };
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token: token, isAuth: isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
