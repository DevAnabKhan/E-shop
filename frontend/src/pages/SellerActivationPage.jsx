import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          setError(false);
          const res = await axios.post(`${server}/shop/shop-activation`, {
            activation_token,
          });
        } catch (error) {
          console.log("Error caught:", error);

          // Safely get backend message
          const msg =
            error?.response?.data?.message || // from backend
            error?.message || // axios default message
            "Something went wrong"; // fallback
          setError(true);
          toast.error(msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is Expired!</p>
      ) : (
        <p>Your account has been created successfully</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
