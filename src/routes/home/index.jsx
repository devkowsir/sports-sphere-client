import { Articles } from "./articles";
import { Categories } from "./categories";
import { Hot } from "./hot";
import { Popular } from "./popular";
import { Swiper } from "./swiper";

export const HomeRoute = () => {
  return (
    <>
      <Swiper />
      <Categories />
      <Popular />
      <Hot />
      <Articles />
    </>
  );
};
