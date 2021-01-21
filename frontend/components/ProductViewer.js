import cn from "classnames";
import { useCallback, useRef, useState } from "react";
import General from "../styles/General.module.css";
import API from "../services/API";

export default function ProductViewer({ product, edit, sell, refresh }) {
  const [amount, setAmount] = useState(product.Amount);
  const [alert, setAlert] = useState(undefined);
  const [canSave, setCanSave] = useState(false);
  const amountRef = useRef(undefined);

  const doSell = useCallback(() => {
    if (amount === 0) return;
    setAmount((prev) => prev - 1);
    API.post("/sales/", { productid: product.ID }).catch(() => {
      setAlert("Não foi possível efetuar a venda.");
    });
  }, [setAmount, setAlert]);

  const doDelete = useCallback(() => {
    API.delete(`/products/${product.ID}/`)
      .then(() => refresh())
      .catch(() => {
        setAlert("Não foi possível efetuar a venda.");
      });
  }, [setAlert]);

  const doSave = useCallback(() => {
    API.put(`/products/${product.ID}/`, {
      amount: Number.parseInt(amountRef.current.value, 10),
      price: product.Price,
    })
      .then(() => refresh())
      .catch(() => {
        setAlert("Não foi possível efetuar a venda.");
      });
  }, [setAlert, amountRef]);

  const showSell = useCallback(() => {
    if (!sell) return null;
    return (
      <button onClick={doSell} className="btn btn-primary">
        Vender
      </button>
    );
  }, []);

  const showEdit = useCallback(() => {
    if (!edit) return null;
    return (
      <>
        {canSave ? (
          <button onClick={doSave} className="btn btn-success mx-1">
            Salvar
          </button>
        ) : null}
        <button onClick={doDelete} className="btn btn-danger">
          Apagar
        </button>
      </>
    );
  }, [canSave]);

  const showAmount = useCallback(() => {
    if (edit) {
      return (
        <div className="d-inline mr-3">
          <label>Quantidade:</label>
          <input
            ref={amountRef}
            className={cn("form-control mx-1", General.amount_input)}
            defaultValue={amount}
            onChange={(e) => setCanSave(e.target.value !== amount.toString())}
          />
        </div>
      );
    }
    return (
      <span
        className={cn("mr-1 badge", {
          "badge-primary": amount !== 0,
          "badge-danger": amount === 0,
        })}
      >
        {amount}
      </span>
    );
  }, [amount]);

  return (
    <>
      {alert === undefined ? null : (
        <span className="alert alert-danger">{alert}</span>
      )}
      <div className="m-2 d-flex justify-content-between">
        <div>
          {showAmount()}
          <span>
            {product.Name} - R${product.Price.toFixed(2)}
          </span>
        </div>
        <div>
          {showSell()}
          {showEdit()}
        </div>
      </div>
    </>
  );
}
