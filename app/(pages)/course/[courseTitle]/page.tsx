// ------------ Components ----------------
import { CourseDetails } from "../../../../components/course-details";
import { Loading, Breadcrumb } from "../../../../components/ui";
import { Suspense } from 'react';
import SimilarCourses from "../../../../components/course-details/SimilarCourses";
// ------------ Utils ----------------
import CoursesApi from "../../../_utils/CoursesApi";
// ------------ Types ----------------
import { Metadata } from 'next';
import { TCourse } from "../../../../types";

interface CourseParams {
  courseTitle: string;
}

export const generateMetadata = async ({params} : {params: Promise<CourseParams>}) : Promise<Metadata> => {
  const id = (await params).courseTitle;
  return {
    title: `${decodeURIComponent(id)}`
  }
}

const Page = async ({ params }: { params: Promise<CourseParams> }) => {

  const courseTitle = (await params).courseTitle;
  const searchQuery = `query=${decodeURIComponent(courseTitle).toLowerCase()}`;

  const response = await CoursesApi.getSearchResultCourses(searchQuery);
  const course: TCourse = response.data[0];

  return (
    <section className="relative pt-32 px-6 sm:px-16 lg:px-40 bg-background-color dark:bg-background-dark-color">
      <Breadcrumb path={`/courses/${courseTitle}`} />

      <div>
        <CourseDetails course={course} />
        <h2 className="mt-24 text-xl text-light-color mb-8">
          Similar Courses
        </h2>

        <Suspense fallback={<Loading height="screen" />}>
          <SimilarCourses 
            courseCategory={course?.category} 
            courseTitle={course?.title}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
