"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/API";
import General from "../../styles/General.module.css";

export default function Register() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [registerStatus, setRegisterStatus] = useState(undefined);
  const router = useRouter();

  const showRegisterStatus = () => {
    if (registerStatus === undefined) return null;
    if (registerStatus === true) router.push("/");
    return (
      <span className={`text-${registerStatus.type}`}>
        {registerStatus.msg}
      </span>
    );
  };

  const doRegister = () => {
    API.post("/register/", {
      name: usernameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((res) => {
        if ("response" in res && res.response.status !== 200) {
          setRegisterStatus({
            type: "danger",
            msg: "Usuário ou senha inválidos",
          });
          return;
        }
        setRegisterStatus(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisterStatus({
          type: "danger",
          msg: "Usuário ou senha inválidos",
        });
      });
  };

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
