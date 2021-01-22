export default function SaleViewer({ sale }) {
  const date = sale.CreatedAt.substring(0, 10);
  const time = sale.CreatedAt.substring(11, 16);
  return (
    <h4>
      <span className="text-primary">{sale.User.Name}</span> vendeu um{" "}
      <span className="text-primary">{sale.Product.Name} </span>
      por <span className="text-primary">R${sale.Product.Price.toFixed(2).toString().replace(".", ",")}</span> dia{" "}
      <span className="text-primary">{date}</span> às{" "}
      <span className="text-primary">{time}</span>.
    </h4>
  );
}
