'use client'
// ------------ Swiper ----------------
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
// ------------ Components ----------------
import CourseCard from "./CourseCard";
import { Suspense } from "react";
import { Loading, NoContent } from "../../ui";
// ------------ Types ----------------
import { TCourse } from "../../../types";

const BestSellingCoursesList = ({courses} : {courses: TCourse []}) => {
    return (
        <Suspense fallback={<Loading height='[50vh]' />}>
          {/* Swiper component to display best-selling courses in a carousel */}
          {courses?.length > 0 ?
          <Swiper
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            scrollbar={{ draggable: true }}
            className="px-64 cursor-grab !py-6"
          >
            {courses.map(course => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
            
            {/* Custom navigation buttons */}
            <div className="swiper-button-prev !text-light-color !hover:text-primary" />
            <div className="swiper-button-next !text-light-color !hover:text-primary" />
            <div className="swiper-pagination flex mt-9 !pl-3 gap-2" />
          </Swiper>

          // Display empty page if no courses are found
          : <NoContent />
        }
      </Suspense>
    )
}

export default BestSellingCoursesList;