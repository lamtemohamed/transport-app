import {
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const signupSchema = yup.object({
  name: yup
    .string()
    .required("Le nom est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: yup
    .string()
    .required("Email est requis")
    .email("Veuillez entrer un email valide"),
  password: yup
    .string()
    .required("Mot de passe est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

type SignupFormData = yup.InferType<typeof signupSchema>;

export default function SignupForm() {
  // const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    // Soumission du formulaire
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="opacity-80 mt-1">
            Rejoignez notre communauté dès maintenant
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                {...register("name")}
                type="text"
                placeholder="Nom complet"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="Adresse email"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="Mot de passe"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirmer le mot de passe"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition duration-300 flex items-center justify-center"
          >
            S'inscrire <FaArrowRight className="ml-2" />
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-red-500 mr-2" />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaFacebook className="text-blue-600 mr-2" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Vous avez déjà un compte?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
