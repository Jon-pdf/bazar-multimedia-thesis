// import { signInWithPopup } from "firebase/auth";
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider } from "../../../../firebase";
// import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "@/redux/bazarSlice";
// import { useNavigate } from "react-router";
// const GoogleLogin = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleGoogleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       if (result && result?.user) {
//         const data = result?.user?.providerData[0];
//         if (data) {
//           dispatch(addUser(data));
//         }
//       } else {
//         dispatch(removeUser());
//       }
//     } catch (error) {
//       console.error("Google login error", error);
//     } finally {
//       setIsLoading(false);
//       navigate("/");
//     }
//   };

//   return (
//     <button
//       disabled={isLoading}
//       className="border w-full text-sm flex items-center justify-center gap-2 py-2 rounded-md bg-white font-semibold hover:bg-gray-100 hoverEffect"
//       onClick={handleGoogleLogin}
//     >
//       <FcGoogle className="size-6" />
//       <span>Sign in with Google</span>
//     </button>
//   );
// };

// export default GoogleLogin;


import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
// Pastikan path ini benar-benar mengarah ke file firebase.ts lo
import { auth, googleProvider } from "../../../../firebase"; 
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "@/redux/bazarSlice";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Tips: Ganti React.FormEvent jadi React.MouseEvent karena ini adalah Button Click
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      if (result && result?.user) {
        // Ambil data pertama dari providerData
        const data = result?.user?.providerData[0];
        if (data) {
          dispatch(addUser(data));
          // Pindahkan navigate ke sini agar hanya pindah kalau berhasil dapat data
          navigate("/");
        }
      } else {
        dispatch(removeUser());
      }
    } catch (error) {
      // Biar nggak error 'error is declared but never read', kita log dia
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button" // Biasakan kasih type button biar nggak dianggap submit form
      disabled={isLoading}
      className="border w-full text-sm flex items-center justify-center gap-2 py-2 rounded-md bg-white font-semibold hover:bg-gray-100 hoverEffect disabled:opacity-50"
      onClick={handleGoogleLogin}
    >
      {isLoading ? (
        <span className="animate-spin text-indigo-600">...</span>
      ) : (
        <FcGoogle className="size-6" />
      )}
      <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
    </button>
  );
};

export default GoogleLogin;