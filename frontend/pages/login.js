import General from "../styles/General.module.css";

export default function Login() {
  return (
    <div className={General.content_container}>
      <h3>Entrar</h3>
      <div className="">
        <input
          type="text"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Usuário"
        />
        <input
          type="password"
          autoComplete="off"
          className="form-control mt-1"
          placeholder="Senha"
        />
        <button className="btn btn-success mt-2 w-100">Entrar</button>
      </div>
    </div>
  );
}
