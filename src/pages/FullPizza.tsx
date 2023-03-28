import React from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

type FullPizzaProps = {
  title: string;
  price: number;
  imageUrl: string;
}

const FullPizza = () => {
  const [pizza, setPizza] = React.useState<FullPizzaProps>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6404d49ceed195a99f76e7a3.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container fullpizza">
      <img className="fullpizza-img" src={pizza.imageUrl} alt='' />
      <h2 className="fullpizza-title">{pizza.title}</h2>
      <h4 className="fullpizza-price">{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add fullpizza-btn">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
