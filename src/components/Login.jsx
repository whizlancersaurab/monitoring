import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/api";

const Login = ({isLoggedIn}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading ,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  // Email regex for validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setError('')
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true)
    try {

      const { data } = await login(formData)
      if (data.success) {
        toast.success(data.message)
        localStorage.setItem('token', data.token)
        isLoggedIn=true
        navigate("/")
      }

    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }finally{
        setLoading(false)
    }


  };

  return (
    <div
      className="min-h-screen flex items-center justify-center md:justify-end bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/19643543/pexels-photo-19643543.jpeg')",
      }}
    >
      
      <div className="w-full h-130 max-w-md md:max-w-3xl lg:max-w-4xl md:mr-10 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-violet-600 to-violet-400 items-center justify-center shadow-inner">
          <h1 className="text-white text-4xl font-extrabold tracking-widest select-none">
            TERASTAMP
          </h1>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          {error && (
            <div className="mb-4 rounded-md bg-blue-100 px-4 py-2 text-center text-sm font-medium text-red-700">
              {error}
            </div>
          )}
          <h2 className="text-2xl font-semibold mb-5 text-violet-700">
            Sign in to TERASTAMP
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full rounded-lg border px-4 py-3 text-base transition
                  focus:outline-none focus:ring-4 focus:ring-violet-400
                  ${errors.email ? "border-red-500" : "border-gray-300"}
                `}
                autoComplete="username"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-600 select-none">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`w-full rounded-lg border px-4 py-3 text-base transition
                  focus:outline-none focus:ring-4 focus:ring-violet-400
                  ${errors.password ? "border-red-500" : "border-gray-300"}
                `}
                autoComplete="current-password"
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600 select-none">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center mb-8 text-sm text-gray-600">
              <label className="flex items-center gap-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-violet-400 cursor-pointer"
                />
                Remember me
              </label>

              <a href="#" className="text-violet-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
               disabled={loading}
              className="w-full rounded-lg cursor-pointer bg-violet-600 py-3 text-white text-lg font-semibold shadow-md hover:bg-violet-700 transition"
            >
             {
                loading?'Login...':'Login'
             }
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;