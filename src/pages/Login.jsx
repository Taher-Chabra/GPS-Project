import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  captcha: yup.string().required("Captcha is required"),
});

function Login() {
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const captchaGenerator = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  const onSubmit = (data) => {
    if (data.captcha !== generatedCaptcha) {
      alert("Captcha does not match. Please try again.");
      return;
    }
    console.log("Form submitted", data);
    reset();
  };

  useEffect(() => {
    const captcha = captchaGenerator();
    setGeneratedCaptcha(captcha);
  }, []);

  return (
    <section className="w-full h-full max-w-md p-4 bg-white border border-gray-100 rounded-lg shadow-md shadow-gray-700 dark:shadow-gray-500 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6">
        Login Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
        <label
          htmlFor="_email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Email
        </label>
        <div className="relative mb-6">
          <div className="absolute flex items-center pe-2 pointer-events-none">
            <span className="inline-flex items-center p-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </span>
          </div>
          <input
            type="text"
            id="_email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-13 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@mail.com"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <label
          htmlFor="_pass"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Password
        </label>
        <div className="relative mb-6">
          <div className="absolute flex items-center pe-2 pointer-events-none">
            <span className="inline-flex items-center p-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a3 3 0 00-3 3v2H6a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2v-5a2 2 0 00-2-2h-1V5a3 3 0 00-3-3zM8 7V5a2 2 0 114 0v2H8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <input
            type="password"
            id="_pass"
            {...register("password")}
            className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 ps-13 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <label
          htmlFor="_captcha"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Captcha
        </label>
        <div className="mb-6">
          <div className="flex items-center justify-between gap-5 ">
            <input
              type="text"
              id="_captcha"
              {...register("captcha")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Captcha"
              required
            />
            <div>
              <span className="inline-flex items-center px-2 sm:px-4 md:px-8 py-2.5 text-sm text-gray-900 bg-gray-200 border rounded-lg border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 tracking-[10px] font-bold">
                {generatedCaptcha}
              </span>
            </div>
          </div>
          {errors.captcha && (
            <p className="text-red-500 text-sm mt-1">
              {errors.captcha.message}
            </p>
          )}
        </div>
        <div className="flex justify-center mt-3">
          <button
            id="_login"
            className="px-4 py-2 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-101"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
