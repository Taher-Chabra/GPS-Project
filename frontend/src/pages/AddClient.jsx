import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const clientSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  ledgerName: yup
    .string()
    .matches(
      /^[A-Z][A-Z0-9_]*$/,
      "Ledger name must start with a capital letter and contain only A-Z, 0-9 and _"
    )
    .required("Ledger name is required"),
  role: yup
    .string()
    .oneOf(["administrator", "client", "guest"])
    .required("Role is required"),
  expireOn: yup.date().required("Expiration date is required"),
});

function AddClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(clientSchema),
  });

  const onSubmit = (data) => {
    console.log("Client added", data);
    reset();
  };

  return (
    <section className="w-full h-full max-w-md my-2 p-4 bg-white border border-gray-100 rounded-lg shadow-md shadow-gray-700 dark:shadow-gray-500 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6">
        Add Client
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
        <div className="mb-6">
          <label
            htmlFor="_clemail"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Client Email
          </label>
          <div className="flex">
            <input
              type="email"
              id="_clemail"
              {...register("email")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Client Email"
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_clpass"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="flex">
            <input
              type="password"
              id="_clpass"
              {...register("password")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Client Password"
              required
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_ledger"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ledger Name
          </label>
          <div className="flex">
            <input
              type="text"
              id="_ledger"
              {...register("ledgerName")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ledger Name"
              required
            />
          </div>
          {errors.ledgerName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ledgerName.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_clrole"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="_clrole"
            {...register("role")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue="choose a role">choose a role</option>
            <option value="administrator">Administrator</option>
            <option value="client">Client</option>
            <option value="guest">Guest</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_expiry"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Expire On
          </label>
          <div className="flex">
            <input
              type="date"
              id="_expiry"
              {...register("expireOn")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-gray-400"
              required
            />
          </div>
          {errors.expireOn && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expireOn.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-3">
          <button
            id="_clregister"
            className="px-4 py-2 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-101"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddClient;
