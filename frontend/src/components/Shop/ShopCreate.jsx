import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);

    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("address", address);
    newForm.append("zipCode", zipCode);

    try {
      setLoading(true);
      const res = await axios.post(
        `${server}/shop/create-shop`,
        newForm,
        config,
      );
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/dashboard");
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setPhoneNumber("");
        setAddress("");
        setZipCode("");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error caught:", error);

      // Safely get backend message
      const msg =
        error?.response?.data?.message || // from backend
        error?.message || // axios default message
        "Something went wrong"; // fallback

      toast.error(msg);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    console.log("ffff");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-130">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  id=""
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone"
                  id=""
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  id=""
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div> */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  id=""
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="zip"
                  name="zip"
                  id=""
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id=""
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none border-gray-300 rounded-md w-full shadow-sm block py-2 px-3 border placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="bloc text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full rounded-full w-full object-cover"
                    />
                  ) : (
                    <RxAvatar className=" h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="justify-center border-gray-300 ml-5 flex items-center px-4 py-2 border rounded-md shadow-sm ttext-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full  h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Loading" : "Submit"}
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
