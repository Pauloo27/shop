"use client";
import { useState, useEffect, useRef } from "react";
import cn from "classnames";
import API from "../../services/API";
import ProductViewer from "../../components/ProductViewer";

export default function Products() {
  const [products, setProducts] = useState(undefined);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [alert, setAlert] = useState(undefined);
  const nameRef = useRef(undefined);
  const priceRef = useRef(undefined);

  const fetchProducts = () => {
    setProducts(undefined);
    API.get(`/products?page=${page}`)
      .then((res) => {
        if ("response" in res && res.response.status === 404) {
          setProducts([]);
          return;
        }
        setProducts(res.data.products);
        setLastPage(res.data.last_page);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const showProducts = () => {
    if (products === undefined) return <span>Carregando...</span>;
    return products.map((product) => (
      <ProductViewer
        key={product.ID}
        product={product}
        sell={false}
        edit={true}
        refresh={fetchProducts}
      />
    ));
  };

  const changePage = (pageOffset) => {
    return setPage((prev) =>
      Math.max(1, Math.min(lastPage, prev + pageOffset))
    );
  };

  const listPages = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages.map((i) => (
      <li key={i} className={cn("page-item", { active: i === page })}>
        <button onClick={() => setPage(i)} className="page-link">
          {i}
        </button>
      </li>
    ));
  };

  const doCreate = () => {
    setAlert(undefined);
    const priceStr = priceRef.current.value.replace(",", ".");
    const price = Number.parseFloat(priceStr);
    if (Number.isNaN(price)) {
      setAlert({ type: "danger", msg: "Preço inválido." });
      return;
    }
    API.post("/products/", { name: nameRef.current.value, price })
      .then((res) => {
        if ("response" in res && res.response.status === 409) {
          setAlert({ type: "danger", msg: "Não foi possível criar" });
          return;
        }
        fetchProducts();
      })
      .catch((err) => {
        setAlert({ type: "danger", msg: "Não foi possível criar" });
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h3>Novo produto</h3>
      {alert === undefined ? null : (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}
      <div className="container">
        <input
          ref={nameRef}
          className="form-control mt-1"
          placeholder="Nome do produto"
        />
        <input
          ref={priceRef}
          className="form-control mt-1"
          placeholder="Preço"
        />
        <button onClick={doCreate} className="btn btn-success mt-2 w-100">
          Criar
        </button>
      </div>
      <h3>Produtos</h3>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button onClick={() => changePage(-1)} className="page-link">
              &laquo;
            </button>
          </li>
          {listPages()}
          <li className="page-item">
            <button onClick={() => changePage(+1)} className="page-link">
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
      {showProducts()}
    </div>
  );
}
