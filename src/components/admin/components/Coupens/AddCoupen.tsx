import React, { useState } from 'react';

const AddCoupon: React.FC = () => {
  const [couponData, setCouponData] = useState({
    code: '',
    discountType: 'fixed',
    discountAmount: 0,
    maxDiscount: 0,
    minCart: 0,
    expiryDate: '',
    description: '',
    couponCount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission logic (e.g., send data to the server)
    console.log('Form submitted:', couponData);
  };

  return (
    <div className="rounded p-4 border border-gray-400 shadow-md  mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6">Add Coupon</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
          <input
            type="text"
            className="form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="code"
            name="code"
            placeholder="Enter the Coupon Code"
            value={couponData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">Discount Type</label>
          <select
            className="form-select mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="discountType"
            name="discountType"
            value={couponData.discountType}
            onChange={handleChange}
          >
            <option value="fixed">Fixed Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Discount Amount</label>
          <input
            type="number"
            className="form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="discountAmount"
            name="discountAmount"
            placeholder="Enter the Discount Amount"
            value={couponData.discountAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700">Max Discount</label>
          <input
            type="number"
            className="form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="maxDiscount"
            name="maxDiscount"
            placeholder="Enter the Max Discount"
            value={couponData.maxDiscount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="minCart" className="block text-sm font-medium text-gray-700">Min Cart Amount</label>
          <input
            type="number"
            className="form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="minCart"
            name="minCart"
            placeholder="Enter the Min Cart Amount"
            value={couponData.minCart}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="date"
            className="form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="expiryDate"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="form-input mt-1 w-full h-32 border border-gray-300 rounded-md p-2"
            id="description"
            name="description"
            placeholder="Enter the Description"
            value={couponData.description}
            onChange={handleChangeTextarea}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="couponCount" className="block text-sm font-medium text-gray-700">Coupon Count (Optional)</label>
          <input
            type="number"
            className="form-input mt-1 w-full h-12 border border-gray-300 rounded-md p-2"
            id="couponCount"
            name="couponCount"
            placeholder="Enter the Coupon Count"
            value={couponData.couponCount}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded block mx-auto mt-4">
        Add Coupon
      </button>
        </div>
      </form>
     
    </div>
  );
};

export default AddCoupon;
