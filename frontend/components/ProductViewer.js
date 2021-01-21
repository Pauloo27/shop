import cn from "classnames";
import { useCallback, useState } from "react";
import API from "../services/API";

export default function ProductViewer({ product, edit, sell }) {
  const [amount, setAmount] = useState(product.Amount);
  const [alert, setAlert] = useState(undefined);

  const doSell = useCallback(() => {
    API.post("/sales/", { productid: product.ID })
      .then(() => setAmount((prev) => prev - 1))
      .catch(() => {
        setAlert("Não foi possível efetuar a venda.");
      });
  }, [setAmount, setAlert]);

  const showSell = useCallback(() => {
    if (!sell) return null;
    return (
      <button onClick={doSell} className="btn btn-primary">
        Vender
      </button>
    );
  }, []);

  return (
    <>
      {alert === undefined ? null : (
        <span className="alert alert-danger">{alert}</span>
      )}
      <div className="m-2 d-flex justify-content-between">
        <div>
          <span
            className={cn("mr-1 badge", {
              "badge-primary": amount !== 0,
              "badge-danger": amount === 0,
            })}
          >
            {amount}
          </span>
          <span>
            {product.Name} - R${product.Price.toFixed(2)}
          </span>
        </div>
        <div>{showSell()}</div>
      </div>
    </>
  );
}
