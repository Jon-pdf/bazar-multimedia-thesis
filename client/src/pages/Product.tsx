
// import { useEffect, useState, useCallback, useRef } from "react";
// import { useLocation } from "react-router";
// import toast from "react-hot-toast";
// import Container from "@/components/Container";
// import { Box, Image, Loader2, Info } from "lucide-react"; // VERSI AMAN
// import { Button } from "@/components/ui/button";
// import Spline from '@splinetool/react-spline';

// const Product = () => {
//   const [product, setProduct] = useState<any>(null);
//   const [is3DMode, setIs3DMode] = useState(false); 
//   const [isLoading3D, setIsLoading3D] = useState(true);
//   const [activeInfo, setActiveInfo] = useState<string | null>(null);
  
//   const splineRef = useRef<any>(null);
//   const location = useLocation();

//   const forceReset = useCallback(() => {
//     setActiveInfo(null);
//     document.body.style.cursor = 'default';
//     if (splineRef.current) {
//       splineRef.current.emitEvent('mouseOut', 'airpods_max_silver_earbuds');
//       splineRef.current.emitEvent('mouseOut', 'Strap'); 
//     }
//   }, []);

//   const handleSplineEvent = useCallback((e: any) => {
//     const name = e.target.name;
//     if (name === 'airpods_max_silver_earbuds') {
//       document.body.style.cursor = 'pointer';
//       setActiveInfo("☁️ Soft Memory Foam: Bantalan premium untuk kenyamanan maksimal.");
//     } else if (name === 'Strap') {
//       document.body.style.cursor = 'pointer';
//       setActiveInfo("⌚ Premium Silicone Strap: Bahan fleksibel dan nyaman.");
//     } else {
//       forceReset();
//     }
//   }, [forceReset]);

//   const getSplineScene = () => {
//     const title = product?.title?.toLowerCase() || "";
//     if (title.includes("watch")) return "https://prod.spline.design/G4Q-UhZG7npUYKZc/scene.splinecode";
//     return "https://prod.spline.design/Wvnl8OOb5nGSW8nU/scene.splinecode";
//   };

//   useEffect(() => {
//     if (location.state?.item) {
//       setProduct(location.state.item);
//     }
//   }, [location]);

//   // Jika produk belum ada, tampilkan loading sederhana (biar gak blank putih)
//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="pb-20">
//       <Container className="my-10 flex flex-col md:flex-row gap-10">
//         <div className="w-full md:w-2/5 relative rounded-2xl border bg-white overflow-hidden shadow-2xl h-[550px]">
//           <div className="absolute top-6 left-6 z-[100] flex gap-2">
//             <Button variant={!is3DMode ? "default" : "outline"} size="sm" onClick={() => { setIs3DMode(false); forceReset(); }}>
//               <Image className="w-4 h-4 mr-2" /> 2D
//             </Button>
//             <Button variant={is3DMode ? "default" : "outline"} size="sm" onClick={() => setIs3DMode(true)}>
//               <Box className="w-4 h-4 mr-2" /> 3D View
//             </Button>
//           </div>

//           {is3DMode && activeInfo && (
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[92%] pointer-events-none animate-in fade-in slide-in-from-bottom-5">
//               <div className="bg-indigo-950/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl flex items-start gap-4">
//                 <Info className="w-6 h-6 text-indigo-300 shrink-0 mt-1" />
//                 <p className="text-sm italic">{activeInfo}</p>
//               </div>
//             </div>
//           )}

//           {is3DMode ? (
//             <div className="w-full h-full relative" onMouseLeave={forceReset}>
//               {isLoading3D && (
//                 <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-white">
//                   <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
//                   <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading 3D...</p>
//                 </div>
//               )}
//               <Spline 
//                 scene={getSplineScene()} 
//                 onLoad={(splineApp) => {
//                   splineRef.current = splineApp;
//                   splineApp.addEventListener('mouseHover', handleSplineEvent);
//                   setIsLoading3D(false);
//                 }}
//               />
//             </div>
//           ) : (
//             <div className="w-full h-full p-10 flex items-center justify-center bg-gray-50/30">
//               <img className="max-h-full object-contain" src={product?.image} alt={product?.title} />
//             </div>
//           )}
//         </div>

//         <div className="w-full md:w-3/5 space-y-8">
//           <h1 className="text-4xl font-black text-gray-900">{product?.title}</h1>
//           <p className="text-4xl font-black text-indigo-600">${product?.price?.toFixed(2)}</p>
//           <div className="bg-indigo-50/50 p-6 rounded-2xl border-l-4 border-indigo-500 italic">
//             "{product?.description}"
//           </div>
//           <Button size="lg" onClick={() => toast.success("Added to cart!")} className="bg-indigo-600 text-white px-12 py-8 rounded-2xl uppercase font-bold">
//             Add to Cart
//           </Button>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Product;

// src/pages/Product.tsx

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
      splineRef.current.emitEvent('mouseOut', 'Screen'); 
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

          {/* KOTAK VISUALISASI DIKECILKAN LAGI KHUSUS MOBILE & TABLET */}
          <div className="w-full h-[30vh] md:h-[38vh] lg:h-[75vh] relative rounded-3xl border-2 border-gray-100 bg-white overflow-hidden shadow-2xl group">
            
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