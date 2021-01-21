import cn from "classnames";

export default function ProductViewer({ edit, product }) {
  return (
    <div className="m-2">
      <span
        className={cn("mr-1 badge", {
          "badge-primary": product.Amount !== 0,
          "badge-danger": product.Amount === 0,
        })}
      >
        {product.Amount}
      </span>
      <span>
        {product.Name} - R${product.Price.toFixed(2)}
      </span>
    </div>
  );
}
