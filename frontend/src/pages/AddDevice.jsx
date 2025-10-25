import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const deviceSchema = yup.object().shape({
  deviceType: yup
    .string()
    .oneOf(["GT06", "AIS140"])
    .required("Device type is required"),
  deviceNumber: yup.string().required("Device number is required"),
  vehicleRegNumber: yup
    .string()
    .required("Vehicle registration number is required"),
  vehicleType: yup
    .string()
    .oneOf(["Car", "Truck", "Bike"])
    .required("Vehicle type is required"),
  clientId: yup.string().required("Client ID is required"),
});

function AddDevice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(deviceSchema),
  });

  const onSubmit = (data) => {
    console.log("Device added", data);
    reset();
  };

  return (
    <section className="w-full h-full max-w-md p-4 bg-white border border-gray-100 rounded-lg shadow-md shadow-gray-700 dark:shadow-gray-500 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 my-2">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6">
        Add Device
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-4">
        <div className="mb-6">
          <label
            htmlFor="_dvtype"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Device
          </label>
          <select
            id="_dvtype"
            {...register("deviceType")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue="choose a device">
              choose a device
            </option>
            <option value="GT06">GT06</option>
            <option value="AIS140">AIS140</option>
          </select>
          {errors.deviceType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deviceType.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_serialno"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Device No
          </label>
          <div className="flex">
            <input
              type="text"
              id="_serialno"
              {...register("deviceNumber")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Device Serial Number"
              required
            />
          </div>
          {errors.deviceNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deviceNumber.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_vregno"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vehicle Registration No
          </label>
          <div className="flex">
            <input
              type="text"
              id="_vregno"
              {...register("vehicleRegNumber")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Vehicle Reg. Number"
              required
            />
          </div>
          {errors.vehicleRegNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehicleRegNumber.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_vtype"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vehicle Type
          </label>
          <select
            id="_vtype"
            {...register("vehicleType")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue="choose a vehicle">
              choose a vehicle
            </option>
            <option value="Car">CAR</option>
            <option value="Bike">BIKE</option>
            <option value="Truck">TRUCK</option>
          </select>
          {errors.vehicleType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehicleType.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="_client"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Client / Guest ID
          </label>
          <div className="flex">
            <input
              type="text"
              id="_client"
              {...register("clientId")}
              className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Client ID"
              required
            />
          </div>
          {errors.clientId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.clientId.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-3">
          <button
            id="_register"
            className="px-4 py-2 text-white font-medium bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-101"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddDevice;
