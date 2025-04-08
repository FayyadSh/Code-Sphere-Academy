// ------------ Utils ----------------
import CoursesApi from '../../../app/_utils/CoursesApi';
// ------------ Components ----------------
import DiscountedCoursesClient from './DiscountedCoursesClient';
// ------------ Types ----------------
import { TCourse } from '../../../types';

const DiscountedCourses = async () => {

  // Fetch data on the server
  const response = await CoursesApi.getDiscountedCourses();
  const discountedCourses: TCourse[] = response?.data;

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(discountedCourses?.map((course) => course.category.toLowerCase()))
  );
  const categories = ['all', ...uniqueCategories];

  // Pass data to the client component
  return (
    <DiscountedCoursesClient
      discountedCourses={discountedCourses}
      categories={categories as string[]}
    />
  );
};

export default DiscountedCourses;