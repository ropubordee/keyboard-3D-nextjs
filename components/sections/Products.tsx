'use client'
import React, { useState } from "react";
import Catalog, { ProducType } from "./Catalog";
import Preview from "./Preview";

const Products = () => {

  const [selectedProduct,setSelectedProduct] = useState({
    id: "1",
    imgSrc: "/assets/keyboard1.png",
    title: "Magic Keyboard",
    price: 79.99,
    modelSrc: "/assets/keyboard.glb",
  })


  const handelProductClick =(product : ProducType) =>{
    setSelectedProduct(product)

  }

  return (
    <div className="max-w-[1536px] flex flex-col mx-auto pt-8">
      <Catalog selectedProduct={selectedProduct} onproductClick={handelProductClick} />
      <Preview selectedProduct={selectedProduct}/>
    </div>
  );
};

export default Products;
