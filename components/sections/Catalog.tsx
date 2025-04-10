import React from "react";
import ProductCard from "../ProductCard";
const products = [
  {
    id: "1",
    imgSrc: "/assets/keyboard1.png",
    title: "Magic Keyboard",
    price: 79.99,
    modelSrc: "/assets/keyboard.glb",
  },
  {
    id: "2",
    imgSrc: "/assets/keyboard2.png",
    title: "Dragon Keyboard",
    price: 89.99,
    modelSrc: "/assets/keyboard2.glb",
  },
  {
    id: "3",
    imgSrc: "/assets/keyboard3.png",
    title: "Gold Keyboard",
    price: 99.99,
    modelSrc: "/assets/keyboard3.glb",
  },
];

export type ProducType = {
  id: string;
  imgSrc: string;
  title: string;
  price: number;
  modelSrc: string;
};

interface CatalogProps {
  selectedProduct: ProducType;
  onproductClick: (product: ProducType) => void;
}
const Catalog = ({ selectedProduct, onproductClick }: CatalogProps) => {
  return (
    <div id="catalog" className="max-w-5xl mx-auto">
      <h2 className="text-2xl  font-semibold pl-4 md:pl-16 pb-16">
        <span className="animate-ping">/</span>
        Catalog
      </h2>
      <div className="w-full flex flex-col items-center lg:flex-row gap-6 mx-auto">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            index={index}
            title={product.title}
            imgSrc={product.imgSrc}
            price={product.price}
            isActive={selectedProduct.id === product.id}
            onClick={() => onproductClick(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
