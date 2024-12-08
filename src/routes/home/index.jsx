import { Articles } from "./articles";
import { Categories } from "./categories";
import { HotProduct } from "./hot-product";
import { PopularProducts } from "./popular-products";
import { Swiper } from "./swiper";

export const HomeRoute = () => {
  return (
    <>
      <Swiper />
      <Categories />
      <PopularProducts />
      <HotProduct />
      <Articles />
    </>
  );
};
