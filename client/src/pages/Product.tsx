// import React, { useEffect, useState, memo } from "react";
// import { useLocation } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/bazarSlice";
// import toast from "react-hot-toast";
// import { ProductsType, StoreState } from "types";
// import QuantityButton from "@/components/QuantityButton";
// import Container from "@/components/Container";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Box, Image as ImageIcon, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Spline from '@splinetool/react-spline';

// // KOMPONEN 3D MEMOIZED: Mendukung pemuatan scene dinamis
// const ThreeDViewer = memo(({ scene, onLoad }: { scene: string; onLoad: () => void }) => {
//   return (
//     <div className="w-full h-full pointer-events-auto touch-none bg-white">
//       <Spline 
//         scene={scene} 
//         onLoad={onLoad} // Trigger saat model Spline selesai dimuat
//       />
//     </div>
//   );
// });

// const Product = () => {
//   const [product, setProduct] = useState<any>(null);
//   const [is3DMode, setIs3DMode] = useState(false); 
//   const [isLoading3D, setIsLoading3D] = useState(true);
  
//   const { productData } = useSelector((state: StoreState) => state.bazar);
//   const [existingProduct, setExistingProduct] = useState<ProductsType | null>(null);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // ============================================================
//   // PERBAIKAN LOGIKA 3D (CRUCIAL UNTUK THESIS)
//   // ============================================================

//   // 1. Daftar ID produk yang memiliki fitur 3D
//   const compatibleIDs = ["headphone-3d-test", "watch-3d-test"];
  
//   // 2. Cek apakah produk yang dibuka kompatibel
//   const is3DCompatible = product && compatibleIDs.includes(product._id);

//   // 3. Fungsi untuk mengarahkan link Spline yang tepat berdasarkan ID
//   const getSplineScene = () => {
//     if (product?._id === "headphone-3d-test") {
//       return "https://prod.spline.design/Wvnl8OOb5nGSW8nU/scene.splinecode";
//     }
//     if (product?._id === "watch-3d-test") {
//       // LINK SMARTWATCH KAMU
//       return "https://prod.spline.design/G4Q-UhZG7npUYKZc/scene.splinecode"; 
//     }
//     return "";
//   };

//   // ============================================================

//   useEffect(() => {
//     if (location.state?.item) setProduct(location.state.item);
//   }, [location]);

//   useEffect(() => {
//     if (product?._id) {
//       const matchedProduct = productData?.find((item) => item._id === product._id);
//       matchedProduct && setExistingProduct(matchedProduct);
//     }
//   }, [product, productData]);

//   // Reset loading state saat user berpindah mode
//   useEffect(() => {
//     if (is3DMode) setIsLoading3D(true);
//   }, [is3DMode]);

//   if (!product) return <div className="py-20 text-center font-bold uppercase text-gray-500 tracking-widest">Loading Product...</div>;

//   return (
//     <div className="pb-20">
//       <Container className="my-10 flex flex-col md:flex-row gap-10">
        
//         {/* --- AREA VISUAL --- */}
//         <div className="w-full md:w-2/5 relative rounded-lg border bg-white overflow-hidden shadow-sm h-[550px]">
          
//           {/* TOGGLE BUTTONS: Muncul otomatis jika ID terdaftar di is3DCompatible */}
//           {is3DCompatible && (
//             <div className="absolute top-4 left-4 z-50 flex gap-2">
//               <Button 
//                 variant={!is3DMode ? "default" : "outline"} 
//                 size="sm" 
//                 onClick={() => setIs3DMode(false)}
//                 className="shadow-sm transition-all"
//               >
//                 <ImageIcon className="w-4 h-4 mr-2" /> 2D
//               </Button>
//               <Button 
//                 variant={is3DMode ? "default" : "outline"} 
//                 size="sm" 
//                 onClick={() => setIs3DMode(true)}
//                 className="shadow-sm transition-all font-bold"
//               >
//                 <Box className="w-4 h-4 mr-2" /> 3D View
//               </Button>
//             </div>
//           )}

//           {/* LOADING SPINNER: Menggunakan z-index tinggi agar di atas model */}
//           {is3DMode && is3DCompatible && isLoading3D && (
//             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gray-50/90 backdrop-blur-sm transition-opacity">
//               <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
//               <p className="mt-4 text-sm font-bold text-gray-700 uppercase tracking-widest">Memuat Model Interaktif...</p>
//               <p className="text-xs text-gray-400 mt-1 italic">Mohon tunggu sebentar</p>
//             </div>
//           )}

//           {/* KONTEN UTAMA: Switch 2D (Foto) vs 3D (Spline) */}
//           {is3DCompatible && is3DMode ? (
//             <ThreeDViewer 
//               scene={getSplineScene()} // Memuat scene dinamis berdasarkan fungsi
//               onLoad={() => setIsLoading3D(false)} // Matikan spinner saat model siap
//             />
//           ) : (
//             <div className="w-full h-full group overflow-hidden bg-gray-50 flex items-center justify-center">
//               <img
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 src={product?.image}
//                 alt={product?.title}
//               />
//             </div>
//           )}

//           <div className="absolute top-4 right-0 z-10">
//             {product?.isNew && <p className="bg-black text-white font-semibold px-8 py-1 uppercase text-xs tracking-wider">Eksperimen</p>}
//           </div>
//         </div>

//         {/* --- DETAIL PRODUK --- */}
//         <div className="w-full md:w-3/5 space-y-6">
//           <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
          
//           <div className="flex items-center space-x-2">
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className={`w-5 h-5 ${i < product.rating ? "fill-current" : "text-gray-300"}`} />
//               ))}
//             </div>
//             <span className="text-sm text-muted-foreground font-medium">
//               Multimedia Comparative Study - Object {product?._id === "headphone-3d-test" ? "A" : "B"}
//             </span>
//           </div>

//           <p className="text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          
//           <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-indigo-100 pl-4 py-2 italic">
//             {product.description}
//           </p>
          
//           <div className="flex gap-4 pt-4">
//             {existingProduct ? (
//               <QuantityButton existingProduct={existingProduct} />
//             ) : (
//               <Button 
//                 size="lg" 
//                 onClick={() => { dispatch(addToCart({ ...product, quantity: 1 })); toast.success(`${product.title} ditambahkan!`); }} 
//                 className="bg-black text-white px-10 py-6 uppercase hover:bg-gray-800 transition-all tracking-widest font-bold"
//               >
//                 Add to Cart
//               </Button>
//             )}
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Product;





import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import Container from "@/components/Container";
import { Box, Image as ImageIcon, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spline from '@splinetool/react-spline';

const Product = () => {
  const [product, setProduct] = useState<any>(null);
  const [is3DMode, setIs3DMode] = useState(false); 
  const [isLoading3D, setIsLoading3D] = useState(true);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  
  const splineRef = useRef<any>(null);
  const location = useLocation();

  // --- RESET INTERAKSI ---
  const forceReset = useCallback(() => {
    setActiveInfo(null);
    document.body.style.cursor = 'default';
    if (splineRef.current) {
      splineRef.current.emitEvent('mouseOut', 'airpods_max_silver_earbuds');
      splineRef.current.emitEvent('mouseOut', 'Strap'); 
    }
  }, []);

  // --- HANDLER EVENT (Kunci Munculnya Teks) ---
  const handleSplineEvent = useCallback((e: any) => {
    const name = e.target.name;

    if (name === 'airpods_max_silver_earbuds') {
      document.body.style.cursor = 'pointer';
      setActiveInfo("☁️ Soft Memory Foam: Bantalan premium untuk kenyamanan maksimal dan isolasi suara.");
    } 
    else if (name === 'Strap') {
      document.body.style.cursor = 'pointer';
      setActiveInfo("⌚ Premium Silicone Strap: Bahan fleksibel dan tahan keringat, nyaman untuk olahraga.");
    }
    else {
      forceReset();
    }
  }, [forceReset]);

  const getSplineScene = () => {
    const title = product?.title?.toLowerCase() || "";
    if (title.includes("watch")) return "https://prod.spline.design/G4Q-UhZG7npUYKZc/scene.splinecode";
    return "https://prod.spline.design/Wvnl8OOb5nGSW8nU/scene.splinecode";
  };

  useEffect(() => {
    if (location.state?.item) setProduct(location.state.item);
    return () => { document.body.style.cursor = 'default'; };
  }, [location]);

  if (!product) return <div className="py-20 text-center font-bold text-gray-400 uppercase">Loading...</div>;

  return (
    <div className="pb-20">
      <Container className="my-10 flex flex-col md:flex-row gap-10">
        
        {/* AREA VISUALISASI */}
        <div className="w-full md:w-2/5 relative rounded-2xl border bg-white overflow-hidden shadow-2xl h-[550px]">
          
          <div className="absolute top-6 left-6 z-[100] flex gap-2">
            <Button variant={!is3DMode ? "default" : "outline"} size="sm" onClick={() => { setIs3DMode(false); forceReset(); }}>
              <ImageIcon className="w-4 h-4 mr-2" /> 2D
            </Button>
            <Button variant={is3DMode ? "default" : "outline"} size="sm" onClick={() => setIs3DMode(true)}>
              <Box className="w-4 h-4 mr-2" /> 3D View
            </Button>
          </div>

          {/* INFORMASI INDIGO (Ditingkatkan Z-Index-nya ke 1000) */}
          {is3DMode && activeInfo && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[92%] pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300">
              <div className="bg-indigo-950/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-indigo-400/30 flex items-start gap-4">
                <Info className="w-6 h-6 text-indigo-300 shrink-0 mt-1" />
                <p className="text-sm leading-relaxed flex-1 font-medium italic">
                  {activeInfo}
                </p>
              </div>
            </div>
          )}

          {is3DMode ? (
            <div className="w-full h-full relative" onMouseLeave={forceReset}>
              {isLoading3D && (
                <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-white">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                  <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center px-4">
                    Preparing 3D Research Object...
                  </p>
                </div>
              )}
              <Spline 
                scene={getSplineScene()} 
                onLoad={(splineApp) => {
                  splineRef.current = splineApp;
                  splineApp.addEventListener('mouseHover', handleSplineEvent);
                  setIsLoading3D(false);
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full p-10 flex items-center justify-center bg-gray-50/30">
              <img className="max-h-full object-contain drop-shadow-xl" src={product?.image} alt={product?.title} />
            </div>
          )}
        </div>

        {/* DETAIL PRODUK */}
        <div className="w-full md:w-3/5 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{product?.title}</h1>
            <span className="inline-block mt-2 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
              Multimedia Comparative Study
            </span>
          </div>

          <p className="text-4xl font-black text-indigo-600">${product.price.toFixed(2)}</p>
          
          <div className="bg-indigo-50/50 p-6 rounded-2xl border-l-4 border-indigo-500 text-gray-700 italic">
            "{product.description}"
          </div>

          <Button 
            size="lg" 
            onClick={() => { toast.success(`${product.title} added to cart!`); }} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-8 text-lg font-bold rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest"
          >
            Add to Cart
          </Button>

          <div className="flex items-center gap-2 text-gray-400 border-t pt-4">
             <Info className="w-4 h-4" />
             <p className="text-[10px] font-bold uppercase tracking-widest italic">Arahkan kursor ke objek 3D untuk detail teknis.</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;