import {useCallback, useEffect, useState} from "react";
import SaleViewer from "../components/SaleViewer";
import API from "../services/API";

export default function Sales() {
  const [sales, setSales] = useState(undefined);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    API.get(`/sales?page=${page}`)
      .then(res => {
        if("response" in res && res.response.status === 404) {
          setSales([]);
          return;
        }
        setSales(res.data.sales);
        setLastPage(res.data.last_page);
      })
      .catch(console.log);
  }, [setSales, page])

  const listSales = useCallback(() => {
    if(sales === undefined) return <span>Carregando...</span>;
    return sales.map(sale => <SaleViewer key={sale.ID} sale={sale} />);
  }, [sales]);

  return (
    <div className="container">
      <h3>Vendas</h3>
      {listSales()}
    </div>
  );
}
