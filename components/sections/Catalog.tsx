import React from "react";
import ProductCard from "../ProductCard";
import { products } from "@/mockdata/productsdata";

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
