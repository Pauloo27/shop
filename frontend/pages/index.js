import { useState, useCallback, useEffect } from "react";
import ProductViewer from "../components/ProductViewer";
import API from "../services/API";

export default function Home() {
  const [products, setProducts] = useState(undefined);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setProducts(undefined);
    API.get(`/products?page=${page}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(console.log);
  }, [page, setProducts]);

  const showProducts = useCallback(() => {
    if (products === undefined) return <span>Carregando...</span>;
    return products.map((product) => (
      <ProductViewer
        key={product.ID}
        product={product}
        sell={true}
        edit={false}
      />
    ));
  }, [products]);

  const listPages = useCallback(() => {
    const pages = [];
    for(let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages.map(i => {
      return <li class="page-item"><button class="page-link">{i}</button></li>
    });
  }, [page, lastPage]);

  return (
    <div className="container">
      <h3>Produtos</h3>
      {showProducts()}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link">&laquo;</button>
          </li>
          {listPages()}
          <li className="page-item">
            <button className="page-link">&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
