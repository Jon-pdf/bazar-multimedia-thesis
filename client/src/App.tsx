// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";
// import Banner from "./components/Banner";
// import Products from "./components/Products";

// function App() {
//   const [products, setProducts] = useState<any[]>([]);
//   const data: any = useLoaderData();

//   useEffect(() => {
//     // 1. Data produk khusus untuk tesis kamu agar muncul di Home
//     const myThesisProduct = {
//       _id: "headphone-3d-test",
//       title: "Premium Wireless Headphones",
//       price: 199.99,
//       description: "Nikmati kualitas audio premium dengan teknologi noise-cancellation tercanggih. Objek penelitian perbandingan visual 2D vs 3D.",
//       category: "electronics",
//       image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
//       rating: 4.5,
//       isNew: true
//     };

//     // 2. Logika penggabungan data: Headphone ditaruh di depan agar paling terlihat
//     if (data && data.data) {
//       setProducts([myThesisProduct, ...data.data]);
//     } else {
//       setProducts([myThesisProduct]);
//     }
//   }, [data]);

//   return (
//     <div className="min-h-screen">
//       <Banner />
//       <div className="py-10">
//         {/* Mengirimkan data produk yang sudah digabung ke komponen Products */}
//         <Products products={products} />
//       </div>
//     </div>
//   );
// }

// export default App;


// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";
// import Banner from "./components/Banner";
// import Products from "./components/Products";

// function App() {
//   const [products, setProducts] = useState<any[]>([]);
//   const data: any = useLoaderData();

//   useEffect(() => {
//     const myThesisProduct = {
//       _id: "headphone-3d-test",
//       title: "Premium Wireless Headphones",
//       price: 199.99,
//       description: "Nikmati kualitas audio premium dengan teknologi noise-cancellation tercanggih. Objek penelitian perbandingan visual 2D vs 3D.",
//       category: "electronics",
//       image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
//       rating: 4.5,
//       isNew: true
//     };

//     if (data && data.data) {
//       // MENGURANGI NOISE: Ambil hanya 7 produk teratas dari API
//       const curatedData = data.data.slice(0, 7); 
//       setProducts([myThesisProduct, ...curatedData]);
//     } else {
//       setProducts([myThesisProduct]);
//     }
//   }, [data]);

//   return (
//     <div className="min-h-screen">
//       <Banner />
//       <div className="py-10">
//         <Products products={products} />
//       </div>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Banner from "./components/Banner";
import Products from "./components/Products";

const thesisProducts = [
  {
    _id: "headphone-3d-test",
    title: "Premium Wireless Headphones",
    price: 199.99,
    description: "Nikmati audio premium dengan perbandingan visual 2D vs 3D. Objek penelitian A.",
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

function App() {
  const [products, setProducts] = useState<any[]>(thesisProducts); 
  const data: any = useLoaderData();

  useEffect(() => {
    if (data && data.data) {
      const curatedData = data.data.slice(0, 6); 
      setProducts([...thesisProducts, ...curatedData]);
    }
  }, [data]);

  return (
    <div className="min-h-screen">
      <Banner />
      <div className="py-10">
        <Products products={products} />
      </div>
    </div>
  );
}

export default App;