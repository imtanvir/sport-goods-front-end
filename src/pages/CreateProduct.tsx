import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  setProductsIs,
  storeProducts,
} from "../redux/features/product/productsSlice";

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock_quantity: string;
  brand: string;
  rating: string;
  images: File[] | null;
}

const initialData: ProductData = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock_quantity: "",
  brand: "",
  rating: "",
  images: null,
};

const CreateProduct = ({
  isProcessing,
  isCreating,
  setIsProcessing,
  setIsCreating,
}: {
  isProcessing: boolean;
  isCreating: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<ProductData>(initialData);
  const allProduct = useAppSelector(storeProducts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData((prevData) => ({
        ...prevData,
        images: fileList,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const toastId = toast.loading("Product Creating...");

    e.preventDefault();
    setIsProcessing(true);

    try {
      const submissionData = new FormData();

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock_quantity: parseInt(formData.stock_quantity),
        brand: formData.brand,
        rating: 0,
      };

      submissionData.append("data", JSON.stringify(productData));

      if (formData.images) {
        formData.images.forEach((file) => {
          submissionData.append("file", file);
        });
      }

      // Send form data to the backend
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/product/create-product`,
        {
          method: "POST",
          body: submissionData,
        }
      );

      const result = await response.json();
      console.log({ result, t: result?.success === true });
      if (result?.success === true) {
        dispatch(
          setProductsIs({
            data: [result?.data, ...(allProduct ?? [])],
          })
        );
        toast.success("Product created successfully!", {
          id: toastId,
          className: "bg-green-500 text-white border-green-400",
        });
        setIsProcessing(false);
        setIsCreating(false);
        setTimeout(() => {
          navigate("/manage-products");
        }, 500);
      } else {
        toast.error("Something went wrong1", {
          id: toastId,
          className: "bg-red-500 text-white border-red-400",
        });
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong2", { id: toastId });
    }
  };

  return (
    <section className="container mx-auto py-20">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create New Product
        </h2>
        <Button
          className="bg-orange-400 mb-3 hover:bg-orange-500 dark:text-slate-900 p-medium"
          onClick={() => {
            setIsProcessing(false);
            setIsCreating(!isCreating);
          }}
        >
          Cancel
        </Button>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product name"
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product description"
            />
          </div>

          {/* Product Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product price"
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Product Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter product category"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label
              htmlFor="stock_quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock_quantity"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter stock quantity"
              min="1"
            />
          </div>

          {/* Brand */}
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter brand name"
            />
          </div>

          {/* File input for images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Product Images
            </label>
            <input
              type="file"
              id="images"
              onChange={handleFileChange}
              required
              multiple
              accept="image/*"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              disabled={isProcessing}
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-950 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
