import { RiDeleteBin6Line } from "react-icons/ri";

import { IoMdClose } from "react-icons/io";

import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
import Placeholder from "../assets/product-placeholder.png";
import ProductEdit from "../components/ProductEdit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/api/baseApi";
import {
  setProductsIs,
  storeProducts,
  TProductManagement,
} from "../redux/features/product/productsSlice";
import { TProduct } from "../utils/interface";
import CreateProduct from "./CreateProduct";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useGetProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<TProductManagement | null>(null);
  const allProduct: TProductManagement[] = useAppSelector(storeProducts);
  useEffect(() => {
    if (data?.data) {
      dispatch(setProductsIs({ data: data?.data }));
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  const handleDeleteProduct = async (id: string) => {
    setIsProcessing(!isProcessing);
    const toastId = toast.loading("Product deleting...");
    const response = await deleteProduct(id);
    if (response?.data?.success === true) {
      const updatedProducts = allProduct?.filter(
        (product) => product._id !== id && product
      );
      dispatch(setProductsIs({ data: updatedProducts }));

      toast.success("Product deleted successfully", {
        id: toastId,
        duration: 2000,
        className: "bg-green-500 text-white border-green-400",
      });
      setIsProcessing(!isProcessing);
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <section className="container mx-auto">
      {isEditing ? (
        <ProductEdit
          products={allProduct as TProduct[]}
          product={selectedProduct as TProduct}
          isProcessing={isProcessing}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsProcessing={setIsProcessing}
        />
      ) : isCreating ? (
        <CreateProduct
          isProcessing={isProcessing}
          isCreating={isCreating}
          setIsProcessing={setIsProcessing}
          setIsCreating={setIsCreating}
        />
      ) : (
        <div className="px-2">
          <div className="w-full border rounded-lg overflow-hidden shadow-md">
            <div className="flex justify-end p-4">
              <Button
                className="bg-slate-700 text-white hover:bg-slate-800  dark:text-slate-100"
                onClick={() => setIsCreating(true)}
              >
                Create Product
              </Button>
            </div>
            <Table>
              <TableHeader className="sticky top-0 z-10 dark:bg-slate-700  bg-slate-700 hover:bg-slate-700 ">
                <TableRow className="text-center flex flex-row justify-around items-center hover:bg-slate-700 dark:hover:bg-slate-700">
                  <TableHead className="md:flex-1 flex-auto md:w-auto w-[100px] text-center text-slate-50 pt-4 box-border">
                    Product
                  </TableHead>
                  <TableHead className="md:flex-1 flex-auto md:w-auto w-[100px] text-center text-slate-50 pt-4 box-border">
                    Name
                  </TableHead>
                  <TableHead className="md:flex-1 flex-auto md:w-auto w-[100px] text-center text-slate-50 pt-4 box-border">
                    Stock Quantity
                  </TableHead>
                  <TableHead className="md:flex-1 flex-auto md:w-auto w-[100px] text-center text-slate-50 pt-4 box-border">
                    Category
                  </TableHead>
                  <TableHead className="md:flex-1 flex-auto md:w-auto w-[100px] text-center text-slate-50 pt-4 box-border">
                    Price
                  </TableHead>
                  <TableHead className="md:flex-1 flex-auto md:w-auto w-[100px] text-center text-slate-50 pt-4 box-border">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
            </Table>
            <div className="max-h-[70vh] overflow-y-auto">
              <Table>
                <TableBody>
                  {allProduct &&
                    allProduct?.length !== 0 &&
                    allProduct?.map((item: TProductManagement) => (
                      <TableRow
                        key={item._id}
                        className="dark:hover:bg-slate-800 text-center flex flex-row justify-around items-center"
                      >
                        <TableCell className="font-medium md:flex-1 flex-auto flex justify-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div className="cursor-pointer rounded-lg flex justify-center items-center overflow-hidden w-20 h-20">
                                <img
                                  className="w-20 h-20 object-cover rounded-lg transition hover:transition-transform hover:scale-125"
                                  src={`${
                                    item?.image?.[0]?.url ?? Placeholder
                                  }`}
                                  alt={item.name ?? "product"}
                                />
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="flex flex-col items-end">
                              <AlertDialogCancel className="w-10 h-10 p-0">
                                <IoMdClose className="text-xl" />
                              </AlertDialogCancel>
                              <img
                                src={`${item?.image?.[0]?.url ?? Placeholder}`}
                                alt={item.name ?? "product"}
                              />
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                        <TableCell className="md:flex-1 flex-auto text-center">
                          {item.name}
                        </TableCell>
                        <TableCell className="md:flex-1 flex-auto text-center">
                          {item.stock_quantity}
                        </TableCell>
                        <TableCell className="md:flex-1 flex-auto text-center">
                          {item.category}
                        </TableCell>
                        <TableCell className="md:flex-1 flex-auto text-center">
                          {item.price}
                        </TableCell>
                        <TableCell className="w-[150px] text-center flex gap-2 justify-center">
                          <Button
                            className="bg-slate-600 hover:bg-slate-700 text-slate-100"
                            onClick={() => {
                              setIsEditing(true);
                              setSelectedProduct(item as TProductManagement);
                            }}
                          >
                            <FaRegEdit />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="bg-red-600 hover:bg-red-700 text-slate-100">
                                <RiDeleteBin6Line />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-950 border-slate-950 text-slate-100 w-[90%] rounded-lg">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="md:text-2xl text-xl p-bold text-slate-100 dark:text-slate-900 flex gap-6 items-center">
                                  Are you absolutely sure? <RiDeleteBin6Line />
                                </AlertDialogTitle>
                                <AlertDialogDescription className="dark:text-slate-800 text-base text-start text-slate-200 font-semibold">
                                  This action cannot be undone. This will
                                  permanently delete the product data!
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className=" bg-white hover:bg-white text-slate-950 dark:text-slate-900 p-medium border-white hover:border-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProduct(item._id)}
                                  className="bg-orange-700 text-white hover:bg-orange-800  dark:text-slate-100 "
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
      {allProduct?.length === 0 && (
        <div>
          {" "}
          <h3>No Products found</h3>
        </div>
      )}
    </section>
  );
};

export default ProductManagement;
