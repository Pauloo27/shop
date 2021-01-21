import { useState, useEffect, useCallback, useRef } from "react";
import cn from "classnames";
import API from "../services/API";
import ProductViewer from "../components/ProductViewer";

export default function Products() {
  const [products, setProducts] = useState(undefined);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [alert, setAlert] = useState(undefined);
  const nameRef = useRef(undefined);
  const priceRef = useRef(undefined);

  const fetchProducts = useCallback(() => {
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
  }, [page, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  const showProducts = useCallback(() => {
    if (products === undefined) return <span>Carregando...</span>;
    return products.map((product) => (
      <ProductViewer
        key={product.ID}
        product={product}
        sell={false}
        edit={true}
      />
    ));
  }, [products]);

  const changePage = useCallback(
    (pageOffset) => {
      return setPage((prev) =>
        Math.max(1, Math.min(lastPage, prev + pageOffset))
      );
    },
    [setPage, lastPage]
  );

  const listPages = useCallback(() => {
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
  }, [page, lastPage, setPage]);

  const doCreate = useCallback(() => {
    setAlert(undefined);
    const priceStr = priceRef.current.value.replace(",", ".");
    const price = Number.parseFloat(priceStr);
    if (Number.isNaN(price)) {
      setAlert({ type: "danger", msg: "Preço inválido." });
      return;
    }
    API.post("/products/", { name: nameRef.current.value, price })
      .then(() => {
        fetchProducts();
      })
      .catch((err) => {
        setAlert({ type: "danger", msg: "Não foi possível criar" });
        console.log(err);
      });
  }, [setAlert, nameRef, priceRef, setPage, page]);

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
