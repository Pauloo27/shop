import { useState, useCallback, useEffect } from "react";
import ProductViewer from "../components/ProductViewer";
import API from "../services/API";

export default function Home() {
  const [products, setProducts] = useState(undefined);
  const [page, setPage] = useState(1);

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
      <ProductViewer key={product.ID} product={product} sell={true} edit={false} />
    ));
  }, [products]);

  return (
    <div className="container">
      <h3>Produtos</h3>
      {showProducts()}
    </div>
  );
}
