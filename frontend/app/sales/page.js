"use client";
import { useEffect, useState } from "react";
import cn from "classnames";
import SaleViewer from "../../components/SaleViewer";
import API from "../../services/API";

export default function Sales() {
  const [sales, setSales] = useState(undefined);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    API.get(`/sales?page=${page}`)
      .then((res) => {
        if ("response" in res && res.response.status === 404) {
          setSales([]);
          return;
        }
        setSales(res.data.sales);
        setLastPage(res.data.last_page);
      })
      .catch(console.log);
  }, [setSales, page]);

  const listSales = () => {
    if (sales === undefined) return <span>Carregando...</span>;
    return sales.map((sale) => <SaleViewer key={sale.ID} sale={sale} />);
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
      <h3>Vendas</h3>
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
      {listSales()}
    </div>
  );
}
