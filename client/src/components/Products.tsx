// src/components/Products.tsx
import { useEffect } from "react";
import Container from "./Container";
import ProductsCard from "./ProductsCard";
import { ProductsType } from "types";

interface Props {
  products: ProductsType[];
}

const Products = ({ products }: Props) => {
  // Masukkan useEffect ini untuk diagnosis
  useEffect(() => {
    if (products.length > 0) {
        console.log("Struktur data produk dari API:", products);
        console.log("Properti produk pertama:", products[0]);
    }
  }, [products]);

  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4 px-4">
        <h1 className="text-2xl bg-black text-white py-2 px-12 text-center uppercase tracking-tighter font-bold shadow-md">
          Featured Collection
        </h1>
        <span className="w-20 h-[3px] bg-indigo-600"></span>
        <p className="max-w-[750px] text-gray-600 text-center leading-relaxed font-medium">
          Selamat datang di platform simulasi belanja Bazar. Jelajahi koleksi kami dan temukan pengalaman interaktif 3D pada produk pilihan.
        </p>
      </div>

      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
        {products.map((item: ProductsType) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </Container>
      
      <div className="flex justify-center mt-4">
        <p className="text-xs text-gray-400 italic">
          * Part of Multimedia UX Comparative Study - BINUS University
        </p>
      </div>
    </div>
  );
};

export default Products;