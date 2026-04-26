import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadShop } from "../../redux/actions/shop";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  const { allProducts } = useSelector((state) => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    if (shop?._id) {
      dispatch(getAllOrdersOfShop(shop._id));
    }
  }, [dispatch, shop?._id]);

  const availableBalance = shop.availableBalance.toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };
    setPaymentMethod(false);
    dispatch(loadShop());

    await axios
      .put(`${server}/shop/update-payment-method`, {
        withdrawMethod,
      })
      .then((res) => {
        console.log(res.data.shop);
        toast.success("Withdraw method added successfully");
        setOpen(false);
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  const handleDelete = async (e) => {
    await axios
      .delete(
        `${server}/shop/delete-withdraw-method/${shop.withdrawMethod._id}`,
      )
      .then((res) => {
        toast.success("Withdraw method deleted successfully");

        dispatch(loadShop());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const error = () => {
    toast.error("You don't have enough balance to withdraw");
  };

  const withdrawHandler = async () => {
    const amount = Number(withdrawAmount);

    if (amount < 50 || amount > availableBalance) {
      toast.error("You cannot withdraw this amount");
      return;
    }

    try {
      await axios.post(`${server}/withdraw/create-withdraw-request`, {
        amount,
      });

      toast.success("Amount withdrawn successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="w-full h-[90vh] p-8 ">
      <div className="w-full bg-white h-full rounded-sm flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance : ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white h-[42px]! rounded!`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full flex top-0 left-0 fixed items-center justify-center bg-[#0000004e] h-screen z-[999]">
          <div
            className={`800:w-[50%] bg-white shadow ${paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"} min-h-[40vh] rounded w-[95%] p-3`}
          >
            <div className="w-full justify-end flex">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div className="p-2">
                <h3 className="text-[22px] font-poppins text-center font-[600]">
                  Add new Payment Methods:
                </h3>
                <form
                  action="
                "
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label htmlFor="">
                      Bank name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Enter your bank name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      placeholder="Enter your bank country"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank swift code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your bank swiift code"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label htmlFor="">
                      Bank account number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter your bank account number"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Holder name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      placeholder="Enter your bank account holder name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="">
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="Enter your bank address"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`${styles.button} mb-3 text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-poppins">
                  Available withdraw Methods:
                </h3>
                {shop && shop.withdrawMethod ? (
                  <div>
                    <div className="800:flex w-full justify-between items-center">
                      <div className="800:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            shop.withdrawMethod.bankAccountNumber.length - 3,
                          ) + shop.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {shop.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="*00:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => handleDelete}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="800:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800:w-[100px] w-full border 800:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} h-[42px]! text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <p className="text-[18px] pt-2">
                      No withdraw Methods Available
                    </p>
                    <div className="w-full flex items-center ">
                      <div
                        className={`${styles.button} text-white text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
