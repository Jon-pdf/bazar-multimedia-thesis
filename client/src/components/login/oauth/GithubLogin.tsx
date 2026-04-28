// import { signInWithPopup } from "firebase/auth";
// import { useState } from "react";
// import { auth, githubProvider } from "../../../../firebase";
// import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "@/redux/bazarSlice";
// import { useNavigate } from "react-router";
// import { FaGithub } from "react-icons/fa";
// const GithubLogin = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleGithubLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, githubProvider);
//       console.log(result, "result");

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
//       onClick={handleGithubLogin}
//     >
//       <FaGithub className="size-6" />
//       <span>Sign in with Github</span>
//     </button>
//   );
// };

// export default GithubLogin;



import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, githubProvider } from "../../../../firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "@/redux/bazarSlice";
import { useNavigate } from "react-router";
import { FaGithub } from "react-icons/fa";

const GithubLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ganti ke MouseEvent karena ini klik tombol, bukan submit form
  const handleGithubLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);

      if (result && result?.user) {
        const data = result?.user?.providerData[0];
        if (data) {
          dispatch(addUser(data));
          navigate("/"); // Navigasi ke home hanya jika berhasil
        }
      } else {
        dispatch(removeUser());
      }
    } catch (error) {
      // Kita panggil error-nya supaya linter tidak komplain "error is declared but never read"
      console.error("Github login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      className="border w-full text-sm flex items-center justify-center gap-2 py-2 rounded-md bg-white font-semibold hover:bg-gray-100 hoverEffect disabled:opacity-50"
      onClick={handleGithubLogin}
    >
      {isLoading ? (
        <span className="animate-spin text-gray-600">...</span>
      ) : (
        <FaGithub className="size-6" />
      )}
      <span>{isLoading ? "Connecting..." : "Sign in with Github"}</span>
    </button>
  );
};

export default GithubLogin;