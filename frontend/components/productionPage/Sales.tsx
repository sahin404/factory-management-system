"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useProductStore } from "@/stores/productStore";
import { Loader2Icon } from "lucide-react";

const sales = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<string>("");
  const [error, setError] = useState<String>("");
  const [success, setSuccess] = useState<String>("");
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const { product, isLoadingProductById, getProductById, isAddingSales, addSales } = useProductStore();

  const handleButtonClick = async () => {
    setIsOpen(true);
    await getProductById(productId);
  };


  const handleAddSale = async () => {
    
    setSuccess("");
    setError("");

    const salesNum = Number(quantity);
    
    // check invalid output
    if (salesNum < 0 || !salesNum) {
      setError("Please enter a valid number.");
      return;
    }

    // check is greater than total product
    if (product) {
      if (product?.quantity < salesNum) {
        setError("Not enough stock!");
        return;
      }
    }

    try{
      // call to the zustand store
      await addSales(productId, salesNum);
      setSuccess(salesNum + " Products sales successfully.")
      setQuantity("");
    }
    catch{
      setError("An error occured to sales products.");
    }
    

  };

  const handleInputOnchange = (e:any) =>{
    setQuantity(e.target.value);
    const tempNum = Number(e.target.value);
    if(product) setCalculatedPrice(tempNum*product?.price); 
  }

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        className=" dark:text-gray-300 hover: cursor-pointer bg-blue-800 hover:bg-blue-700"
      >
        Add Sales
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Sale">
        <div className="space-y-6">
          {isLoadingProductById ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading product...
            </p>
          ) : product ? (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Product Information
                </h3>
                <div className="grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Name:</span> {product.name}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> {product.price}{" "}
                    BDT
                  </p>
                  <p>
                    <span className="font-medium">Unit:</span> {product.unit}
                  </p>
                  <p>
                    <span className="font-medium">Available Quantity:</span>{" "}
                    {product.quantity} Unit
                  </p>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="space-y-3">
                <label
                  htmlFor="quantity"
                  className="block text-gray-800 dark:text-gray-200 font-medium"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleInputOnchange}
                  placeholder="Enter quantity to sell"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                {calculatedPrice > 0 && (
                  <p className="text-gray-700 dark:text-gray-300">
                    Total Price:{" "}
                    <span className="font-semibold">{calculatedPrice} BDT</span>
                  </p>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  disabled={isAddingSales}
                  onClick={handleAddSale}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg"
                >
                  {isAddingSales ? (
                    <div className="flex gap-2 items-center">
                      Saving <Loader2Icon className="animate-spin" />
                    </div>
                  ) : (
                    "Save sales"
                  )}
                </Button>

                {success && (
                  <p className="text-green-600 text-sm text-center">{success}</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <Button onClick={() => setIsOpen(false)} variant="secondary">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Product not found!</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default sales;
