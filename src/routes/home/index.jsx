import { useEffect } from "react";
import { SiteName } from "../../config";
import { Articles } from "./articles";
import { Categories } from "./categories";
import { Hot } from "./hot";
import { Popular } from "./popular";
import { Swiper } from "./swiper";

export const HomeRoute = () => {
  useEffect(() => {
    document.title = `${SiteName}`;
  }, []);

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
