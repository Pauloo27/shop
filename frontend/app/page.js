"use client";
import { useState, useEffect } from "react";
import ProductViewer from "../components/ProductViewer";
import API from "../services/API";
import cn from "classnames";

export default function Home() {
  const [products, setProducts] = useState(undefined);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
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

  const showProducts = () => {
    if (products === undefined) return <span>Carregando...</span>;
    return products.map((product) => (
      <ProductViewer
        key={product.ID}
        product={product}
        sell={true}
        edit={false}
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

  return (
    <div className="container">
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
