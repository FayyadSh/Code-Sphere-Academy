// ------------ Components ----------------
import { Error, NoContent, Loading  } from "../ui";
import { Suspense } from 'react'
import { Course } from "./index";
// ------------ Types ----------------
import {  TCourse } from "../../types";

type TCoursesList = { courses: TCourse[] }

const CoursesList = ({ courses }: TCoursesList) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {courses?.length > 0 ? 
        // Render the list of courses when available
        <Suspense fallback={<Loading height="[50vh]" />}>
          <div className="grid py-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-20 md:gap-5">
            {courses?.map(course => <Course key={course?.id} course={course} />)}
          </div>
        </Suspense>

        // Show an empty page if there are no courses
        : <NoContent /> 
      }
    </div>
  );
};

export default CoursesList;
