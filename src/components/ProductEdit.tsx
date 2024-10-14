import React, { ChangeEvent, useRef, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/hook";
import { useUpdateSingleProductMutation } from "../redux/api/baseApi";
import { setProductsIs } from "../redux/features/product/productsSlice";
import { TImage, TProduct } from "../utils/interface";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const ProductEdit = ({
  products,
  product,
  isProcessing,
  isEditing,
  setIsProcessing,
  setIsEditing,
}: {
  products: TProduct[];
  product: TProduct;
  isProcessing: boolean;
  isEditing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updateProduct] = useUpdateSingleProductMutation();
  const dispatch = useAppDispatch();

  const [productData, setProductData] = useState({
    _id: product?._id,
    image: product?.image,
    name: product?.name,
    description: product?.description,
    price: product?.price,
    brand: product?.brand,
    stock_quantity: product?.stock_quantity,
    category: product?.category,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productDataImg, setProductDataImg] = useState<{
    image: File[] | null;
  }>({
    image: null,
  });
  const [isNewImgSelected, setIsNewImgSelected] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "price" || name === "stock_quantity") {
      const numericValue = value.replace(/\D/g, "");
      setProductData((prevUser) => ({
        ...prevUser,
        [name]: isNaN(parseFloat(numericValue)) ? 0 : parseFloat(numericValue),
      }));
    } else {
      setProductData((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setProductDataImg((prevData) => ({
        ...prevData,
        image: fileList,
      }));
      setIsNewImgSelected(true);
    }
  };
  const handleSelectImgRemove = () => {
    setProductDataImg((prevData) => ({
      ...prevData,
      image: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsNewImgSelected(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Bike Data updating...");
    setIsProcessing(!isProcessing);
    const submissionData = new FormData();
    const productDataUpdateIntoDb = {
      image: (productData?.image as TImage[]).map((img) =>
        isNewImgSelected === true ? { ...img, isRemove: true } : img
      ),
      name: productData?.name,
      description: productData?.description,
      price: productData?.price,
      brand: productData?.brand,
      stock_quantity: productData?.stock_quantity,
      category: productData?.category,
    };

    
    submissionData.append("data", JSON.stringify(productDataUpdateIntoDb));
    submissionData.append("_id", productData._id);

    if (productDataImg.image) {
      productDataImg.image.forEach((file) => {
        submissionData.append("file", file);
      });
    }
    const queryData = {
      id: productData._id,
      data: submissionData,
    };
    const response = await updateProduct(queryData);
    if (response?.data?.success === true) {
      const updatedBikes = products.map((product) =>
        product._id === response?.data?.data?._id
          ? { ...product, ...response.data.data }
          : product
      );

      dispatch(setProductsIs({ data: updatedBikes }));

      toast.success("Bike updated successfully", {
        id: toastId,
        duration: 2000,
        className: "bg-green-500 text-white border-green-400",
      });
      setIsProcessing(false);
      setIsEditing(false);
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <section className="dark:bg-gradient-to-b h-[90vh] overflow-auto dark:from-background dark:to-muted bg-slate-50 bg-gradient-to-b from-green-50 to-blue-50 px-5 py-10 mt-5 shadow-md rounded-md">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h1 className=" bebas-neue-regular text-3xl">Edit Bike Details</h1>
        </div>
        <Button
          className=" bg-orange-400 hover:bg-orange-500 dark:text-slate-900 p-medium "
          onClick={() => {
            setIsProcessing(false);
            setIsEditing(!isEditing);
          }}
        >
          Cancel
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2 ">
        <div className="space-y-2">
          <div
            className={`${
              isNewImgSelected === false ? "block" : "hidden"
            } w-20 h-20 rounded-full relative overflow-hidden hover:bottom-0 hover:transition-all image-circle `}
          >
            <img
              className="rounded-full w-full h-full"
              src={productData?.image?.[0]?.url}
              alt={productData?.name}
            />
            <Label
              htmlFor="image"
              className="edit-img absolute h-1/2 w-full -bottom-[50%] transition bg-white opacity-50 flex justify-center items-start pt-2 text-base"
            >
              <FaPen className="text-slate-900" />
            </Label>
          </div>
          <div className={`${isNewImgSelected ? "block" : "hidden"} relative`}>
            <Input
              ref={fileInputRef}
              type="file"
              id="image"
              onChange={handleFileChange}
              required={isNewImgSelected}
              accept="image/*"
            />
            <div
              className=" absolute right-0 rounded-lg top-1/2 -translate-y-1/2 bg-indigo-700 h-full w-[5%] flex justify-center items-center cursor-pointer"
              onClick={handleSelectImgRemove}
            >
              <IoCloseCircleOutline className="text-slate-50 text-2xl" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1  gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="dark:bg-slate-900"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              className="dark:bg-slate-900"
              id="brand"
              name="brand"
              type="text"
              value={productData.brand}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              className="dark:bg-slate-900"
              id="price"
              name="price"
              type="text"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock_quantity">Stock Quantity</Label>
            <Input
              className="dark:bg-slate-900"
              id="stock_quantity"
              name="stock_quantity"
              type="text"
              value={productData.stock_quantity}
              onChange={handleInputChange}
              pattern="[0-9]*"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              className="dark:bg-slate-900"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button
            className="bg-indigo-800 text-white hover:bg-indigo-700  dark:text-slate-100 w-full"
            disabled={isProcessing}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProductEdit;
