import { AnimatePresence, LazyMotion, wrap } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa6";

const slides = [
  {
    backgroundImg: "/images/circle-slider-1-1.jpg",
    bgColor: "#f3ebf6",
    brandImg: "/images/brand-slider-1-1.svg",
    productInfo: "New tracksuit for women",
    productDesc:
      "Stay stylish and comfortable with our newst women's tracksuit collection, designed for active lifestyles.",
    athleteImg: "/images/athlete-slider-1-1.png",
    buyFullKitText: "Or you can buy the whole kit at once",
  },
  {
    backgroundImg: "/images/circle-slider-1-2.jpg",
    bgColor: "#ece5dd",
    brandImg: "/images/brand-slider-1-2.svg",
    productInfo: "Weights of distribution",
    productDesc:
      "Efficeiently manage distribution weights: Streamline operations for optimal performance and results. Maximize performance.",
    athleteImg: "/images/athlete-slider-1-2.png",
    buyFullKitText: "Purchase the complete kit all at once.",
  },
  {
    backgroundImg: "/images/circle-slider-1-3.jpg",
    bgColor: "#dce3eb",
    brandImg: "/images/brand-slider-1-3.svg",
    productInfo: "Professional equipment",
    productDesc:
      "Unleash the power of professional equipment: elevate your performance with precision and expertise. It's your performance.",
    athleteImg: "/images/athlete-slider-1-3.png",
    buyFullKitText: "Or you can purchase the entire set in one go.",
  },
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  animate: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

const loadFeatures = async () => (await import("../../lib/motion-features-dom-max")).default;

const swipeConfidenceThreshold = 5000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Swiper = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const slideIndex = wrap(0, slides.length, page);
  const slide = slides[slideIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const dragEndHandler = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <div className={`mb-12 relative h-[55rem] overflow-hidden cursor-grab xl:h-[40rem]`}>
      <LazyMotion features={loadFeatures} strict>
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="animate"
            exit="exit"
            transition={{
              x: { type: "ease-out", duration: 0.5 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={dragEndHandler}
            style={{ backgroundColor: slide.bgColor }}
            className="absolute px-2 w-full h-full flex items-center"
          >
            <m.div className="container w-full flex flex-col gap-12 xl:flex-row xl:gap-4">
              <m.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "ease-out", delay: 0.3 }}
                className="flex-1 space-y-2 xl:w-14"
              >
                <m.img src={slide.brandImg} className="w-28" />
                <m.h2 className="text-4xl font-display tracking-wide font-bold">{slide.productInfo}</m.h2>
                <m.p className="hidden text-gray-500 2xl:block">{slide.productDesc}</m.p>
                <m.button className="btn group px-6 rounded-3xl flex items-center gap-2 bg-white">
                  <span className="text-sm text-slate-700">Read More</span>
                  <FaArrowRight className="icon text-secondary group-[&:hover]:translate-x-2 transition" />
                </m.button>
              </m.div>
              <m.div
                className="self-center max-w-md bg-center bg-cover bg-no-repeat xl:w-1/2"
                style={{ backgroundImage: `url(${slide.backgroundImg})` }}
              >
                <m.img
                  initial={{ x: "10%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1.1 }}
                  transition={{
                    x: { type: "ease-out", delay: 0.4, duration: 0.5 },
                    opacity: { type: "ease-out", delay: 0.4, duration: 0.1 },
                  }}
                  drag="x"
                  dragPropagation
                  dragConstraints={{ left: 0, right: 0 }}
                  src={slide.athleteImg}
                  className="object-contain"
                />
              </m.div>
              <m.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "ease-out", delay: 0.3 }}
                className="flex-1 self-end space-y-2 text-right xl:w-1/4"
              >
                <m.h3 className="text-xl font-display tracking-wide font-bold">{slide.buyFullKitText}</m.h3>
                <m.button className="w-full flex items-center justify-end gap-2 group">
                  <FaPlus className="flex w-12 h-12 p-3 text-white text-sm bg-secondary/50 rounded-full group-[&:hover]:bg-secondary transition" />
                  <span className="text-slate-800">Buy kit now</span>
                </m.button>
              </m.div>
            </m.div>
          </m.div>
        </AnimatePresence>
        {[1, -1].map((paginateDirection) => (
          <div
            key={paginateDirection}
            className={`absolute top-1/2 -translate-y-1/2 z-[2] w-10 aspect-square flex justify-center items-center text-xl font-bold select-none cursor-pointer bg-white rounded-full ${
              paginateDirection == 1 ? "right-3" : "left-3 scale-[-1]"
            }`}
            onClick={() => paginate(paginateDirection)}
          >
            <FaArrowRight />
          </div>
        ))}
      </LazyMotion>
    </div>
  );
};
