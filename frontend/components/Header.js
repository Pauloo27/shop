import Link from "next/link";

export default function Header() {
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
              Gerenciar
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link href="/products/">
                <span className="dropdown-item">Produtos</span>
              </Link>
              <Link href="/sales/">
                <span className="dropdown-item">Vendas</span>
              </Link>
              <Link href="/users/">
                <span className="dropdown-item">Usuários</span>
              </Link>
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
