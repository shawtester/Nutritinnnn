"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(null);

  // Address form fields
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    pincode: "",
    landmark: "",
    state: "",
  });

  // Extract UID and totalAmount from the URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const uid = urlParams.get("uid");
      const totalAmount = urlParams.get("totalAmount");

      setUserId(uid);
      setAmount(totalAmount || ""); // Set amount from URL if available
    }
  }, []);

  // Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      mobile,
      amount,
      userId,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      addressLine3: address.addressLine3,
      pincode: address.pincode,
      landmark: address.landmark,
      state: address.state,
      MUID: "MUID" + Date.now(),
      transactionId: "T" + Date.now(),
    };

    console.log("Data to be sent: ", data);

    try {
      const response = await axios.post("http://localhost:3000/api/order", data);
      if (response.data && response.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      console.error("Error during payment request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-green-500">
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg lg:flex lg:flex-row">
        {/* Left Section: Video */}
        <div className="w-full lg:w-1/2 lg:px-8">
          <div className="p-6">
            <video
              src="https://www.phonepe.com/webstatic/8020/videos/page/home-fast-secure-v3.mp4"
              autoPlay
              loop
              muted
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Right Section: Payment Form */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:px-8">
          <div className="p-8 bg-green-500 rounded-lg shadow-md">
            <h2 className="mb-6 text-3xl font-bold text-center text-white">Make a Payment</h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <div className="relative mt-2">
                  <input
                    id="Name"
                    name="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="block w-full py-2 pl-10 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="Mobile" className="block text-sm font-medium text-white">
                  Mobile
                </label>
                <div className="relative mt-2">
                  <input
                    id="Mobile"
                    name="Mobile"
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Enter your mobile number"
                    className="block w-full py-2 pl-10 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="Amount" className="block text-sm font-medium text-white">
                  Amount
                </label>
                <div className="relative mt-2">
                  <input
                    id="Amount"
                    name="Amount"
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    placeholder="Enter amount"
                    className="block w-full py-2 pl-10 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div>
                <label htmlFor="addressLine1" className="block text-sm font-medium text-white">
                  Address Line 1
                </label>
                <div className="relative mt-2">
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    value={address.addressLine1}
                    onChange={handleAddressChange}
                    required
                    placeholder="Enter address line 1"
                    className="block w-full py-2 pl-4 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="addressLine2" className="block text-sm font-medium text-white">
                  Address Line 2
                </label>
                <div className="relative mt-2">
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    value={address.addressLine2}
                    onChange={handleAddressChange}
                    placeholder="Enter address line 2"
                    className="block w-full py-2 pl-4 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-white">
                  Landmark
                </label>
                <div className="relative mt-2">
                  <input
                    id="landmark"
                    name="landmark"
                    type="text"
                    value={address.landmark}
                    onChange={handleAddressChange}
                    placeholder="Enter landmark"
                    className="block w-full py-2 pl-4 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-white">
                  State
                </label>
                <div className="relative mt-2">
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                    placeholder="Enter state"
                    className="block w-full py-2 pl-4 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-white">
                  Pincode
                </label>
                <div className="relative mt-2">
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    required
                    placeholder="Enter pincode"
                    className="block w-full py-2 pl-4 pr-4 text-gray-900 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
