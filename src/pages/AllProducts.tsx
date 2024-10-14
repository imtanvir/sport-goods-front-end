import { useEffect, useState } from "react";

import { PiArrowsDownUpThin } from "react-icons/pi";

import { useParams } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion.tsx";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Checkbox } from "../components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { useGetProductsQuery } from "../redux/api/baseApi";

import ProductCard from "../ui/home/Card.tsx";

import { TProduct } from "../utils/interface.ts";

interface FilterTerm {
  sortOrder: string;

  searchQuery: string;

  brands: string[];

  categories: string[];

  rating: string;
}

const AllProducts = () => {
  const { category } = useParams();

  const [searchAndFilterTerm, setSearchAndFilterTerm] = useState<FilterTerm>({
    sortOrder: "asc",

    searchQuery: "",

    brands: [],

    categories: [],

    rating: "",
  });

  const { data } = useGetProductsQuery(undefined);

  const brandsArray =
    (data?.data as TProduct[])?.map((product) => product?.brand) || [];

  const brands = [...new Set(brandsArray)]; // Unique categories for filters

  const categoriesArray =
    (data?.data as TProduct[])?.map((product) => product?.category) || [];

  const categories = [...new Set(categoriesArray)];

  useEffect(() => {
    if (category === "all") {
      setSearchAndFilterTerm((prev) => ({
        ...prev,

        brands: [],

        categories: [],
      }));
    }
  }, [category]); // Filtered products based on search and filters

  const filteredProducts = (data?.data || []).filter((product: TProduct) => {
    const matchesBrand =
      searchAndFilterTerm.brands.length === 0 ||
      searchAndFilterTerm.brands.includes(product.brand);

    const matchesCategory =
      category === "all" ||
      product.category.toLowerCase() === category?.toLowerCase();

    const matchesRating =
      searchAndFilterTerm.rating === "" ||
      product.rating >= Number(searchAndFilterTerm.rating);

    const matchesSearch =
      searchAndFilterTerm.searchQuery === "" ||
      product.name

        .toLowerCase()

        .includes(searchAndFilterTerm.searchQuery.toLowerCase());

    return matchesBrand && matchesCategory && matchesRating && matchesSearch;
  });

  const sortedProducts = filteredProducts.sort((a: TProduct, b: TProduct) => {
    if (searchAndFilterTerm.sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleSortChange = (order: string) => {
    setSearchAndFilterTerm((prev) => ({ ...prev, sortOrder: order }));
  };

  const handleSearch = (term: string) => {
    setSearchAndFilterTerm((prev) => ({ ...prev, searchQuery: term }));
  };

  const handleBrandChange = (brand: string) => {
    setSearchAndFilterTerm((prev) => {
      const isSelected = prev.brands.includes(brand);

      return {
        ...prev,

        brands: isSelected
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  const handleCategoryChange = (category: string) => {
    setSearchAndFilterTerm((prev) => {
      const isSelected = prev.categories.includes(category);

      return {
        ...prev,

        categories: isSelected
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleRatingChange = (rating: string) => {
    setSearchAndFilterTerm((prev) => ({ ...prev, rating }));
  };

  const clearFilters = () => {
    setSearchAndFilterTerm({
      sortOrder: "asc",

      searchQuery: "",

      brands: [],

      categories: [],

      rating: "",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Filter Section */}
        <Accordion type="single" collapsible defaultValue="filter">
          <AccordionItem value="filter">
            <div className="grid gap-6">
              <Card className="md:h-[60vh]">
                <CardHeader>
                  <CardTitle>
                    <AccordionTrigger>Filter</AccordionTrigger>
                  </CardTitle>
                </CardHeader>

                <AccordionContent>
                  <CardContent>
                    <div className="grid gap-4">
                      {/* Brand Filter */}

                      <div className="overflow-y-auto max-h-36">
                        <Label className="mb-2 block font-bold">Brand</Label>

                        <div className="grid gap-2">
                          {brands.map((brand) => (
                            <Label
                              key={brand}
                              className="flex items-center gap-2 font-normal"
                            >
                              <Checkbox
                                checked={searchAndFilterTerm.brands.includes(
                                  brand
                                )}
                                onCheckedChange={() => handleBrandChange(brand)}
                              />
                              {brand}
                            </Label>
                          ))}
                        </div>
                      </div>
                      {/* Category Filter */}

                      <div className="overflow-y-auto max-h-36">
                        <Label className="mb-2 block font-bold">Category</Label>

                        <div className="grid gap-2">
                          {categories.map((category) => (
                            <Label
                              key={category}
                              className="flex items-center gap-2 font-normal"
                            >
                              <Checkbox
                                checked={searchAndFilterTerm.categories.includes(
                                  category
                                )}
                                onCheckedChange={() =>
                                  handleCategoryChange(category)
                                }
                              />
                              {category}
                            </Label>
                          ))}
                        </div>
                      </div>
                      {/* Rating Filter */}

                      <div>
                        <Label className="mb-2 block">Rating</Label>

                        <Select
                          value={searchAndFilterTerm.rating}
                          onValueChange={handleRatingChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="0">Any</SelectItem>

                            <SelectItem value="1">1 star and above</SelectItem>

                            <SelectItem value="2">2 stars and above</SelectItem>

                            <SelectItem value="3">3 stars and above</SelectItem>

                            <SelectItem value="4">4 stars and above</SelectItem>

                            <SelectItem value="5">5 stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <Button
                      className="bg-[#111111] text-white hover:bg-[#111111b7]"
                      onClick={clearFilters}
                    >
                      Clear
                    </Button>
                  </CardFooter>
                </AccordionContent>
              </Card>
            </div>
          </AccordionItem>
        </Accordion>
        {/* Product Section */}
        <div className="grid gap-6">
          <div className="flex gap-4">
            <Input
              placeholder="Search products..."
              value={searchAndFilterTerm.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <PiArrowsDownUpThin /> Sort by
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup
                  value={searchAndFilterTerm.sortOrder}
                  onValueChange={handleSortChange}
                >
                  <DropdownMenuRadioItem value="asc">
                    Price: Low to High
                  </DropdownMenuRadioItem>

                  <DropdownMenuRadioItem value="desc">
                    Price: High to Low
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center relative">
            {sortedProducts.length !== 0 ? (
              sortedProducts.map((product: TProduct) => (
                <ProductCard
                  product={product}
                  isReadOnly={true}
                  key={product._id}
                />
              ))
            ) : (
              <div className="absolute left-1/2 -translate-x-1/2 -top-1/2">
                <h3 className="text-center font-semibold text-xl">
                  No product found based on your search!
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
