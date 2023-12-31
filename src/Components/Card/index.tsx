import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const Card = (data) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = (product) => {
    context.openProductDetail();
    context.setProductShow(product)
  }

  const addProductsToCart = (event, product) => {
    event.stopPropagation();
    context.setCartProducts([...context.cartProducts, product]);
    context.setCount(context.count + 1);
    context.openCheckoutSideMenu();
  }

  const renderIcon = (idProduct) => {
    const isInCart = context.cartProducts?.filter(
      (product) => product.id === idProduct
    ).length > 0;

    if (isInCart) {
      return (
        <button
          className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1"
        >
          <CheckIcon className="w-4 h-4 text-white"></CheckIcon>
        </button>
      );
    }
      return (
        <button
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductsToCart(event, data)}
        >
          <PlusIcon className="w-4 h-4 text-black"></PlusIcon>
        </button>
      );
  }


  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.images[0]}
          alt="Headphones"
        />
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{data.title}</span>
        <span className="text-lg font-medium">{data.price}</span>
      </p>
    </div>
  );
};


export default Card;
