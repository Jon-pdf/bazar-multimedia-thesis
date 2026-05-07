import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/bazarSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ProductsType, StoreState } from "types";
import QuantityButton from "./QuantityButton";
import { useEffect, useState } from "react";

interface Props {
  product: ProductsType;
}

const ProductsCard = ({ product }: Props) => {
  const [existingProduct, setExistingProduct] = useState<ProductsType | null>(
    null
  );
  const { productData } = useSelector((state: StoreState) => state.bazar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  useEffect(() => {
    if (product?._id) {
      const matchedProduct = productData?.find(
        (item) => item._id === product._id
      );
      matchedProduct && setExistingProduct(matchedProduct);
    }
  }, [product, productData]);

  return (
    <div className="w-full relative group">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          src={product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-titleFont text-base font-bold">
              {product.title.substring(0, 15)}
            </h2>
          </div>
          <div className="text-sm relative w-28 flex justify-end overflow-hidden">
            <div
              className={`flex gap-2 transform transition-transform duration-500 ${
                existingProduct ? "" : "group-hover:translate-x-24"
              }`}
            >
              <p className="line-through text-gray-500">${product.oldPrice}</p>
              <p className="font-semibold">${product.price}</p>
            </div>
            <p
              onClick={() => {
                dispatch(addToCart({ ...product, quantity: 1 }));
                toast.success(`${product.title} is added`);
              }}
              className={`absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 transition-transform cursor-pointer duration-500 ${
                existingProduct?.quantity ? "" : "group-hover:translate-x-0"
              }`}
            >
              add to cart
              <span>
                <BsArrowRight />
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className=" line-clamp-1">{product.category}</p>
          {existingProduct && (
            <QuantityButton
              label={false}
              existingProduct={existingProduct}
              className="w-auto p-0 border-0"
            />
          )}
        </div>
      </div>
      <div className="absolute top-4 right-0">
        {product.isNew && (
          <p className="bg-black text-white font-semibold font-titleFont px-6 py-1">
            Sale
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;

