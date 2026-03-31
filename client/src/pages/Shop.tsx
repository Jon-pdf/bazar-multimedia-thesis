// import Container from "@/components/Container";
// import Products from "@/components/Products";
// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const data: any = useLoaderData(); // Mengambil data dari loader

//   useEffect(() => {
//     // 1. Data produk khusus untuk eksperimen thesis (Headphones)
//     const myThesisProduct = {
//       _id: "headphone-3d-test", 
//       title: "Premium Wireless Headphones",
//       price: 199.99,
//       description: "Experience high-quality sound with 3D visualization. Objek penelitian perbandingan visual 2D vs 3D.",
//       category: "electronics",
//       image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg", // Foto 2D untuk "Before Test"
//       rating: 4.5,
//       isNew: true
//     };

//     // 2. Logika Injeksi Data: Pastikan headphone muncul di urutan pertama
//     if (data && data.data) {
//         setProducts([myThesisProduct, ...data.data]);
//     } else {
//         setProducts([myThesisProduct]); // Fallback jika API tidak merespons
//     }
//   }, [data]);

//   return (
//     <div className="py-10">
//       <Container>
//         {/* Mengirimkan array produk yang sudah disuntikkan data thesis ke komponen Products */}
//         <Products products={products} />
//       </Container>
//     </div>
//   );
// };

// // WAJIB ADA: Tanpa baris ini, Vite akan error saat proses import di main.tsx
// export default Shop;


// import Container from "@/components/Container";
// import Products from "@/components/Products";
// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const data: any = useLoaderData();

//   useEffect(() => {
//     const myThesisProduct = {
//       _id: "headphone-3d-test", 
//       title: "Premium Wireless Headphones",
//       price: 199.99,
//       description: "Experience high-quality sound with 3D visualization. Objek penelitian perbandingan visual 2D vs 3D.",
//       category: "electronics",
//       image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
//       rating: 4.5,
//       isNew: true
//     };

//     if (data && data.data) {
//         // MENGURANGI DISTRAKSI: Batasi hanya 7 produk tambahan
//         const limitedData = data.data.slice(0, 7);
//         setProducts([myThesisProduct, ...limitedData]);
//     } else {
//         setProducts([myThesisProduct]);
//     }
//   }, [data]);

//   return (
//     <div className="py-10">
//       <Container>
//         <Products products={products} />
//       </Container>
//     </div>
//   );
// };

// export default Shop;


import Container from "@/components/Container";
import Products from "@/components/Products";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

const thesisProducts = [
  {
    _id: "headphone-3d-test", 
    title: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience premium audio with 2D vs 3D visual comparison. Objek penelitian A.",
    category: "electronics",
    image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
    rating: 4.5,
    isNew: true
  },
  {
    _id: "watch-3d-test",
    title: "Smart Luxury Watch",
    price: 299.99,
    description: "Desain smartwatch lingkaran modern dengan visualisasi 3D interaktif.",
    category: "accessories",
    image: "https://images.pexels.com/photos/14434429/pexels-photo-14434429.jpeg", // <--- Gunakan link ini
    rating: 4.8,
    isNew: true
  }
];

const Shop = () => {
  const [products, setProducts] = useState(thesisProducts);
  const data: any = useLoaderData();

  useEffect(() => {
    if (data && data.data) {
        const limitedData = data.data.slice(0, 6);
        setProducts([...thesisProducts, ...limitedData]);
    }
  }, [data]);

  return (
    <div className="py-10">
      <Container>
        <Products products={products} />
      </Container>
    </div>
  );
};

export default Shop;