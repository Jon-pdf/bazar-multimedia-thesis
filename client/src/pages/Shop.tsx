
// import Container from "@/components/Container";
// import Products from "@/components/Products";
// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";

// const thesisProducts = [
//   {
//     _id: "headphone-3d-test", 
//     title: "Premium Wireless Headphones",
//     price: 199.99,
//     oldPrice: 250.00,
//     description: "Experience premium audio with 2D vs 3D visual comparison. Objek penelitian A.",
//     category: "electronics",
//     image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
//     rating: 4.5,
//     isNew: true
//   },
//   {
//     _id: "watch-3d-test",
//     title: "Smart Luxury Watch",
//     price: 299.99,
//     oldPrice: 350.00,
//     description: "Desain smartwatch lingkaran modern dengan visualisasi 3D interaktif.",
//     category: "accessories",
//     image: "https://images.pexels.com/photos/14434429/pexels-photo-14434429.jpeg",
//     rating: 4.8,
//     isNew: true
//   }
// ];

// const Shop = () => {
//   // Memberi tahu TypeScript bahwa products adalah array of any agar fleksibel
//   const [products, setProducts] = useState<any[]>(thesisProducts);
//   const data: any = useLoaderData();

//   useEffect(() => {
//     if (data && data.data) {
//         const limitedData = data.data.slice(0, 6);
//         // Casting hasil gabungan ke any agar tidak konflik dengan state
//         setProducts([...thesisProducts, ...limitedData] as any[]);
//     }
//   }, [data]);

//   return (
//     <div className="py-10">
//       <Container>
//         {/* Casting products ke any agar komponen Products mau menerimanya */}
//         <Products products={products as any} />
//       </Container>
//     </div>
//   );
// };

// export default Shop;

import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import Container from "@/components/Container";
import { Box, Image, Loader2, Info } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Spline from '@splinetool/react-spline';

const Product = () => {
  const [product, setProduct] = useState<any>(null);
  const [is3DMode, setIs3DMode] = useState(false); 
  const [isLoading3D, setIsLoading3D] = useState(true);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  
  const splineRef = useRef<any>(null);
  const location = useLocation();

  const forceReset = useCallback(() => {
    setActiveInfo(null);
    document.body.style.cursor = 'default';
    if (splineRef.current) {
      // Membersihkan event hover pada objek headphone dan smartwatch
      splineRef.current.emitEvent('mouseOut', 'airpods_max_silver_earbuds');
      splineRef.current.emitEvent('mouseOut', 'Strap'); 
      splineRef.current.emitEvent('mouseOut', 'Screen'); // Tambahan objek smartwatch
    }
  }, []);

  const handleSplineEvent = useCallback((e: any) => {
    const name = e.target.name;
    
    // Interaksi untuk Headphone
    if (name === 'airpods_max_silver_earbuds') {
      document.body.style.cursor = 'pointer';
      setActiveInfo("☁️ Soft Memory Foam: Bantalan premium untuk kenyamanan maksimal.");
    } 
    // Interaksi untuk Smartwatch (Strap & Screen)
    else if (name === 'Strap') {
      document.body.style.cursor = 'pointer';
      setActiveInfo("⌚ Premium Silicone Strap: Bahan fleksibel, tahan keringat, dan nyaman di pergelangan.");
    } else if (name === 'Screen' || name === 'Watch_Face') { 
      // Catatan: Pastikan nama grup/objek layar di Spline kamu bernama 'Screen' atau 'Watch_Face'
      document.body.style.cursor = 'pointer';
      setActiveInfo("📱 AMOLED Display: Layar sentuh responsif dengan visibilitas tinggi.");
    } else {
      forceReset();
    }
  }, [forceReset]);

  // Fungsi untuk mendapatkan scene 3D berdasarkan judul produk
  const getSplineScene = () => {
    const title = product?.title?.toLowerCase() || "";
    
    if (title.includes("watch")) {
      return "https://prod.spline.design/G4Q-UhZG7npUYKZc/scene.splinecode";
    }
    if (title.includes("headphones") || title.includes("headset")) {
      return "https://prod.spline.design/Wvnl8OOb5nGSW8nU/scene.splinecode";
    }
    
    return null;
  };

  useEffect(() => {
    if (location.state?.item) {
      setProduct(location.state.item);
    }
  }, [location]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  const currentScene = getSplineScene();

  return (
    <div className="pb-20">
      <Container className="my-10 flex flex-col items-center">
        
        {/* 1. HEADER AREA */}
        <div className="w-full max-w-4xl text-center space-y-4 mb-10">
          <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">
            {product?.title}
          </h1>
          
          <p className="text-4xl font-bold text-indigo-600">
            ${product?.price?.toFixed(2)}
          </p>

          <div className="bg-indigo-50/80 p-6 rounded-2xl border-l-8 border-indigo-500 shadow-sm mx-auto max-w-2xl">
            <p className="text-lg text-gray-700 font-medium italic leading-relaxed">
              "Nikmati audio premium dengan perbandingan visual 2D vs 3D. Objek penelitian A."
            </p>
          </div>
        </div>

        {/* 2. VISUAL AREA */}
        <div className="w-full max-w-6xl space-y-6 flex flex-col items-center">
          
          {/* Toggle Buttons */}
          <div className="flex gap-4 p-1.5 bg-gray-100 rounded-full shadow-inner">
            <Button 
              variant={!is3DMode ? "default" : "ghost"} 
              className={`rounded-full px-8 ${!is3DMode ? "bg-white text-indigo-600 shadow-md hover:bg-white" : "text-gray-500"}`}
              onClick={() => { setIs3DMode(false); forceReset(); }}
            >
              <Image className="w-4 h-4 mr-2" /> 2D STATIC
            </Button>
            <Button 
              variant={is3DMode ? "default" : "ghost"} 
              className={`rounded-full px-8 ${is3DMode ? "bg-indigo-600 text-white shadow-md" : "text-gray-500"}`}
              onClick={() => { setIs3DMode(true); setIsLoading3D(true); }}
            >
              <Box className="w-4 h-4 mr-2" /> 3D INTERACTIVE
            </Button>
          </div>

          {/* PERBAIKAN UTAMA: Mengoptimasi tinggi container berdasarkan ukuran layar perangkat */}
          {/* Menggunakan h-[45vh] untuk mobile, h-[55vh] untuk tablet, dan lg:h-[75vh] untuk laptop */}
          <div className="w-full h-[45vh] sm:h-[55vh] lg:h-[75vh] relative rounded-3xl border-2 border-gray-100 bg-white overflow-hidden shadow-2xl group">
            
            {/* Tooltip Hotspot */}
            {is3DMode && activeInfo && currentScene && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[90%] md:w-[60%] pointer-events-none animate-in fade-in slide-in-from-bottom-5">
                <div className="bg-indigo-950/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
                  <Info className="w-8 h-8 text-indigo-300 shrink-0" />
                  <p className="text-base font-medium italic">{activeInfo}</p>
                </div>
              </div>
            )}

            {is3DMode ? (
              <div className="w-full h-full relative" onMouseLeave={forceReset}>
                {currentScene ? (
                  <>
                    {/* State Loading */}
                    {isLoading3D && (
                      <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                        <p className="mt-4 text-xs font-black text-indigo-900 uppercase tracking-[0.3em]">Calibrating 3D Experience...</p>
                      </div>
                    )}
                    <Spline 
                      scene={currentScene} 
                      onLoad={(splineApp) => {
                        splineRef.current = splineApp;
                        splineApp.addEventListener('mouseHover', handleSplineEvent);
                        setIsLoading3D(false);
                      }}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <Box className="w-24 h-24 mb-6 opacity-10" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-300">3D Model Belum Tersedia</h3>
                    <p className="text-sm font-medium mt-2">Maaf, objek penelitian ini baru tersedia dalam versi 2D.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full p-12 flex items-center justify-center bg-gray-50/30">
                <img 
                  className="max-h-full max-w-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-500" 
                  src={product?.image} 
                  alt={product?.title} 
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. ACTION AREA */}
        <div className="mt-12">
          <Button 
            size="lg" 
            onClick={() => toast.success("Added to cart!")} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-20 py-10 rounded-2xl uppercase font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Add to Cart
          </Button>
        </div>

      </Container>
    </div>
  );
};

export default Product;