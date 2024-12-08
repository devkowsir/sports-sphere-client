import { Categories } from "./categories";
import { Hot } from "./hot";
import { PopularProducts } from "./popular-products";
import { Swiper } from "./swiper";

export const HomeRoute = () => {
  return (
    <>
      <Swiper />
      <Categories />
      <PopularProducts />
      <Hot />
    </>
  );
};
