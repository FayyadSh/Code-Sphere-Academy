// ------------ Utils ----------------
import CoursesApi from '../../../app/_utils/CoursesApi';
// ------------ Components ----------------
import BestSellingCoursesList from './BestCoursesList';
// ------------ Types ----------------
import { TCourse } from '../../../types';

const BestSellingCourses: React.FC = async () => {

  const response = await CoursesApi.getBestSellingCourses();
  const bestSellingCourses: TCourse[] = response?.data
  return (
    <section className="relative px-6 sm:px-16 lg:px-40 pb-9 bg-background-color dark:bg-background-dark-color">
      {/* Section Title */}
      <h1 className="text-3xl self-start font-bold text-primary mb-16">
        Top Courses
      </h1>

      <BestSellingCoursesList courses={bestSellingCourses} />
    </section>
  );
};

export default BestSellingCourses;
