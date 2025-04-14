'use client';
// ------------ Utils ----------------
import CoursesApi from "@/app/_utils/CoursesApi";
// ------------ Components ----------------
import CourseCard from "./CourseCard";
import { Error, Loading, NoContent } from "../ui";
// ------------ Swiper ----------------
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
// ------------ Hooks ----------------
import { useFetch } from "@/hooks";
// ------------ Types ----------------
import { TCourse } from "@/types";

const BestSellingCourses = () => {
  
  const {
    data: bestSellingCourses,
    loading,
    error,
  } = useFetch(() => CoursesApi.getBestSellingCourses()) as { data: TCourse[], loading: boolean, error: Error | null};

  return (
    <section className="relative px-6 sm:px-16 lg:px-40 pb-9 bg-background-color dark:bg-background-dark-color">
      {/* Section Title */}
      <h1 className="text-3xl self-start font-bold text-primary mb-16">
        Top Courses
      </h1>

      {error ? 
        <Error error={error} />
       : loading ? 
        <Loading height="1/2" />
       : bestSellingCourses && bestSellingCourses?.length> 0 ? 
        <div className="relative">
          <Swiper
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            scrollbar={{ draggable: true }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: -100,
              depth: 200,
              modifier: 3.5,
              // slideShadows: true,
            }}
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            className="px-64 cursor-grab !py-6"
          >
            {bestSellingCourses?.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !w-12 !h-12 after:!text-3xl !left-[65%] md:!left-[90%] !top-115 md:!top-full !bottom-0 !text-light-color hover:!text-primary" />
          <div className="swiper-button-next !w-12 !h-12 after:!text-3xl !left-11/12 md:!left-full  !top-115 md:!top-full !bottom-0 !text-light-color hover:!text-primary" />
          
          {/* Custom pagination */}
          <div className="swiper-pagination !relative flex justify-center !left-0 !-bottom-3 gap-2 [&>.swiper-pagination-bullet-active]:!bg-primary" />
        </div>
       : 
        // Display empty page if no courses are found
        <NoContent />
      }
    </section>
  );
};

export default BestSellingCourses;