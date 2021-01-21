import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import API from "../services/API";
import General from "../styles/General.module.css";

export default function Register() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [registerStatus, setRegisterStatus] = useState(undefined);
  const router = useRouter();

  const showRegisterStatus = useCallback(() => {
    if (registerStatus === undefined) return null;
    if (registerStatus === true) router.push("/");
    return (
      <span className={`text-${registerStatus.type}`}>
        {registerStatus.msg}
      </span>
    );
  }, [registerStatus]);

  const doRegister = useCallback(() => {
    console.log("Register");
  });

  return (
    <div className={General.content_container}>
      <h3>Cadastrar novo usuário</h3>
      {showRegisterStatus()}
      <div className="">
        <input
          ref={usernameRef}
          type="text"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Nome"
        />
        <input
          ref={passwordRef}
          type="password"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Senha"
        />
        <button className="btn btn-success mt-2 w-100" onClick={doRegister}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}
