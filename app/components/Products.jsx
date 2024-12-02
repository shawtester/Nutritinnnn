"use client";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import MyRating from "./MyRating";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense } from "react";

// RatingReview component to show rating and review counts
function RatingReview({ product }) {
  const [counts, setCounts] = useState(null);

  // Use useEffect for asynchronous logic
  useEffect(() => {
    const fetchReviewCounts = async () => {
      try {
        const data = await getProductReviewCounts({ productId: product?.id });
        setCounts(data);
      } catch (error) {
        console.error("Error fetching review counts:", error);
      }
    };

    if (product?.id) {
      fetchReviewCounts();
    }
  }, [product?.id]); // Run effect when product ID changes

  // Render loading state until counts are fetched
  if (!counts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-3 items-center">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews})
      </h1>
    </div>
  );
}

export default function ProductsGridView({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

// ProductCard component to display individual product details
export function ProductCard({ product }) {
  const [selectedWeight, setSelectedWeight] = useState(product?.weights?.[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0]);

  const handleWeightChange = (event) => {
    const weight = product.weights.find((w) => w.weight === event.target.value);
    setSelectedWeight(weight);
  };

  const handleFlavorChange = (event) => {
    const flavor = product.flavors.find((f) => f.name === event.target.value);
    setSelectedFlavor(flavor);
  };

  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <div className="relative w-full">
        <img
          src={product?.imageList[0]}
          className="rounded-lg h-48 w-full object-contain"
          alt={product?.title}
        />
        <div className="absolute top-1 right-1">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
      </Link>

      {/* Flavor Selector */}
      <div className="text-xs text-gray-500">
        {product?.flavors?.length > 0 && (
          <div className="flex gap-2 items-center mt-2 flex-wrap md:flex-nowrap">
            <label htmlFor="flavors" className="text-xs">
              Flavor:
            </label>
            <select
              id="flavors"
              value={selectedFlavor?.name}
              onChange={handleFlavorChange}
              className="border px-2 py-1 rounded text-xs w-full md:w-auto"
            >
              {product.flavors.map((flavor) => (
                <option key={flavor.name} value={flavor.name}>
                  {flavor.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Weight Selector */}
      {selectedWeight && (
        <div className="mt-2">
          <div className="flex gap-2 items-center flex-wrap md:flex-nowrap">
            <label htmlFor="weights" className="text-xs">
              Weight:
            </label>
            <select
              id="weights"
              value={selectedWeight?.weight}
              onChange={handleWeightChange}
              className="border px-2 py-1 rounded text-xs w-full md:w-auto"
            >
              {product.weights.map((weight) => (
                <option key={weight.weight} value={weight.weight}>
                  {weight.weight}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-green-500 text-sm font-semibold mt-2">
            ₹ {selectedWeight?.salePrice}{" "}
            <span className="line-through text-xs text-gray-600">
              ₹ {selectedWeight?.price}
            </span>
          </h2>
        </div>
      )}

      {/* Short Description */}
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.shortDescription}
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <RatingReview product={product} />
      </Suspense>

      {/* Stock Status */}
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-red-500 rounded-lg text-xs font-semibold">
            Out Of Stock
          </h3>
        </div>
      )}

      {/* Add To Cart */}
      <div className="flex items-center gap-4 w-full">
        <AuthContextProvider>
          <AddToCartButton
            productId={product?.id}
            selectedWeight={selectedWeight}
            selectedFlavor={selectedFlavor}
            price={selectedWeight?.price}
            salePrice={selectedWeight?.salePrice}
          />
        </AuthContextProvider>
      </div>
    </div>
  );
}
