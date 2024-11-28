import "./card.css";

interface CardProps {
  price: number;
  title: string;
  image: string;
  onAddToCart: () => void;
}

export function Card(props: CardProps) {
  return (
    <div className="card">
      <img src={props.image} alt={props.title}></img>
      <h3 className="title">{props.title}</h3>
      <p className="price">
        <b>Valor: R$ </b>
        {props.price}
      </p>
      <div className="add-to-cart">
        <button onClick={props.onAddToCart}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
}
