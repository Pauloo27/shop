import { useState, useRef, useCallback } from "react";
import API from "../services/API";
import General from "../styles/General.module.css";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginStatus, setLoginStatus] = useState(undefined);

  const showLoginStatus = useCallback(() => {
    if (loginStatus === undefined) return null;
    return (
      <span className={`text-${loginStatus.type}`}>{loginStatus.msg}</span>
    );
  }, [loginStatus]);

  const doLogin = useCallback(() => {
    API.post("/login/", {
      name: usernameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((res) => {
        setLoginStatus({ type: "success", msg: "Logado!" });
        localStorage.setItem("jwt", res.data.jwt);
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus({ type: "danger", msg: "Usuário ou senha inválidos" });
      });
  }, [setLoginStatus]);

  return (
    <div className={General.content_container}>
      <h3>Entrar</h3>
      {showLoginStatus()}
      <div className="">
        <input
          ref={usernameRef}
          type="text"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Usuário"
        />
        <input
          ref={passwordRef}
          type="password"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Senha"
        />
        <button className="btn btn-success mt-2 w-100" onClick={doLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
