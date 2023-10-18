"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <span className="navbar-brand">Ínicio</span>
      </Link>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Opções
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link href="/products/">
                <span className="dropdown-item">Produtos</span>
              </Link>
              <Link href="/sales/">
                <span className="dropdown-item">Vendas</span>
              </Link>
              <Link href="/register/">
                <span className="dropdown-item">Cadastrar usuário</span>
              </Link>
              <button className="dropdown-item" onClick={logout}>
                Sair
              </button>
            </div>
          </li>
        </ul>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}
