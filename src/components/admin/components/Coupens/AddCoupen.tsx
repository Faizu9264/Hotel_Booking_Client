import React, { useState, useEffect } from "react";
import adminApi from "../../../../services/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCouponsSuccess } from "../../../../redux/slices/couponSlice";
import { CouponData } from "../../../../types/coupon";

const AddCoupon: React.FC = () => {
  const coupons: CouponData[] = useSelector(
    (state: RootState) => state.coupon.coupons
  );
  const navigate = useNavigate();
  const couponId = new URLSearchParams(window.location.search).get("couponId");
  const dispatch = useDispatch();

  const [couponData, setCouponData] = useState({
    code: "",
    discountType: "fixed",
    discountAmount: 0,
    discountPercentage: 0,
    maxDiscount: 0,
    minCart: 0,
    expiryDate: "",
    description: "",
    couponCount: 0,
  });

  const [errors, setErrors] = useState({
    code: "",
    discountAmount: "",
    discountPercentage: "",
    discountType: "",
    maxDiscount: "",
    minCart: "",
    expiryDate: "",
    description: "",
  });

  useEffect(() => {
    if (couponId) {
      const existingCoupon = coupons.find((coupon) => coupon._id === couponId);
      if (existingCoupon) {
        setCouponData(existingCoupon);
      } else {
      }
    }
  }, [couponId, coupons]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "code" ||
      name === "discountType" ||
      name === "expiryDate" ||
      name === "description"
    ) {
      setCouponData((prevData) => ({
        ...prevData,
        [name]: name === "code" ? value.toUpperCase() : value,
      }));
    } else if (
      name === "maxDiscount" ||
      name === "minCart" ||
      name === "couponCount" ||
      name === "discountAmount" ||
      name === "discountPercentage"
    ) {
      setCouponData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    }
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      code: "",
      discountAmount: "",
      discountPercentage: "",
      discountType: "",
      maxDiscount: "",
      minCart: "",
      expiryDate: "",
      description: "",
    };

    const existingCoupon = coupons.find(
      (coupon) => coupon.code === couponData.code && coupon._id !== couponId
    );
    if (existingCoupon) {
      newErrors.code = "Coupon code already exists!";
      valid = false;
    }

    if (couponData.code.trim() === "") {
      newErrors.code = "Coupon code cannot be empty!";
      valid = false;
    }

    if (couponData.discountType === "fixed") {
      if (couponData.discountAmount <= 0) {
        newErrors.discountAmount = "Discount amount must be greater than zero.";
        valid = false;
      }
    } else if (couponData.discountType === "percentage") {
      if (
        couponData.discountPercentage <= 0 ||
        couponData.discountPercentage > 100
      ) {
        newErrors.discountPercentage =
          "Discount percentage must be between 1 and 100.";
        valid = false;
      }
    }

    if (couponData.minCart <= 0) {
      newErrors.minCart = "Min cart amount must be greater than zero.";
      valid = false;
    }

    if (
      couponData.discountType === "fixed" &&
      couponData.maxDiscount <= 0 &&
      couponData.maxDiscount > couponData.discountAmount
    ) {
      newErrors.maxDiscount =
        "Max discount must be greater than discount Amount.";
      valid = false;
    }

    const today = new Date();
    const expiryDate = new Date(couponData.expiryDate);
    if (expiryDate <= today) {
      newErrors.expiryDate = "Expiry date must be greater than today.";
      valid = false;
    }

    if (couponData.description.trim() === "") {
      newErrors.description = "Description cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (couponId) {
          const res = await adminApi.editCoupon(couponId, couponData);
          if (res.status === 200) {
            toast.success("Coupon edited successfully");
          }
          const updatedCoupons = coupons.map((coupon) =>
            coupon._id === couponId ? { ...coupon, ...couponData } : coupon
          );
          dispatch(fetchCouponsSuccess(updatedCoupons));
        } else {
          const response = await adminApi.addCoupon(couponData);
          toast.success("Coupon added successfully");

          dispatch(fetchCouponsSuccess([...coupons, response]));
        }

        navigate(-1);
      } catch (error: any) {
        console.error("Error adding/editing coupon:", error.message);
      }
    }
  };

  return (
    <div className="rounded p-4 border border-gray-400 shadow-md mx-auto">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-6">
        {couponId ? "Edit Coupon" : "Add Coupon"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Coupon Code
          </label>
          <input
            type="text"
            className={`form-input mt-1 w-full h-12 border ${
              errors.code ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
            id="code"
            name="code"
            placeholder="Enter the Coupon Code"
            value={couponData.code}
            onChange={handleChange}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="discountType"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Type
          </label>
          <select
            className={`form-select mt-1 w-full h-12 border ${
              errors.discountType ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
            id="discountType"
            name="discountType"
            value={couponData.discountType}
            onChange={handleChange}
          >
            <option value="fixed">Fixed Amount</option>
            <option value="percentage">Percentage</option>
          </select>
          {errors.discountType && (
            <p className="text-red-500 text-sm mt-1">{errors.discountType}</p>
          )}
        </div>

        {couponData.discountType === "fixed" && (
          <div className="mb-4">
            <label
              htmlFor="discountAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Amount
            </label>
            <input
              type="number"
              className={`form-input mt-1 w-full h-12 border ${
                errors.discountAmount ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              id="discountAmount"
              name="discountAmount"
              placeholder="Enter the Discount Amount"
              value={couponData.discountAmount}
              onChange={handleChange}
            />
            {errors.discountAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountAmount}
              </p>
            )}
          </div>
        )}

        {couponData.discountType === "percentage" && (
          <div className="mb-4">
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              className={`form-input mt-1 w-full h-12 border ${
                errors.discountPercentage ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              id="discountPercentage"
              name="discountPercentage"
              placeholder="Enter the Discount Percentage"
              value={couponData.discountPercentage}
              onChange={handleChange}
            />
            {errors.discountPercentage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountPercentage}
              </p>
            )}
          </div>
        )}

        {couponData.discountType !== "percentage" && (
          <div className="mb-4">
            <label
              htmlFor="maxDiscount"
              className="block text-sm font-medium text-gray-700"
            >
              Max Discount
            </label>
            <input
              type="number"
              className={`form-input mt-1 w-full h-12 border ${
                errors.maxDiscount ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              id="maxDiscount"
              name="maxDiscount"
              placeholder="Enter the Max Discount"
              value={couponData.maxDiscount}
              onChange={handleChange}
            />
            {errors.maxDiscount && (
              <p className="text-red-500 text-sm mt-1">{errors.maxDiscount}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="minCart"
            className="block text-sm font-medium text-gray-700"
          >
            Min Cart Amount
          </label>
          <input
            type="number"
            className={`form-input mt-1 w-full h-12 border ${
              errors.minCart ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
            id="minCart"
            name="minCart"
            placeholder="Enter the Min Cart Amount"
            value={couponData.minCart}
            onChange={handleChange}
          />
          {errors.minCart && (
            <p className="text-red-500 text-sm mt-1">{errors.minCart}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiry Date
          </label>
          <input
            type="date"
            className={`form-input mt-1 w-full h-12 border ${
              errors.expiryDate ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
            id="expiryDate"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            className={`form-input mt-1 w-full  border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
            id="description"
            name="description"
            placeholder="Enter the Description"
            value={couponData.description}
            onChange={handleChangeTextarea}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div
          className={`mb-4 ${
            couponData.discountType === "percentage" ? "mb-1" : ""
          }`}
        >
          <label
            htmlFor="couponCount"
            className="block text-sm font-medium text-gray-700"
          >
            Coupon Count (Optional)
          </label>
          <input
            type="number"
            className={`form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2`}
            id="couponCount"
            name="couponCount"
            placeholder="Enter the Coupon Count"
            value={couponData.couponCount}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded block mx-auto mt-4"
        >
          {couponId ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
