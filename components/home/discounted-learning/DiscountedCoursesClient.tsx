'use client';
// ------------ Hooks ----------------
import { useState } from 'react';
// ------------ Components ----------------
import { CoursesList } from '../../common';
// ------------ Types ----------------
import { TCourse } from '../../../types';

interface DiscountedCoursesClientProps {
  discountedCourses: TCourse[];
  categories: string[];
}

const DiscountedCoursesClient: React.FC<DiscountedCoursesClientProps> = ({
  discountedCourses,
  categories,
}) => {
  // State for the selected category
  const [filteringType, setFilteringType] = useState<string>('all');

  // Filter courses based on the selected category
  const filteredCourses =
    filteringType === 'all'
      ? discountedCourses
      : discountedCourses.filter(
          (course) => course.category.toLowerCase() === filteringType.toLowerCase()
        );

  return (
    <div className="relative px-6 sm:px-16 lg:px-40 bg-background-color dark:bg-background-dark-color pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">Exclusive Deals</h1>

        {/* Category selection buttons */}
        <div className="flex items-center flex-wrap gap-4 text-white dark:text-gray-300 z-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilteringType(category)}
              className={`bg-primary/30 dark:bg-slate-800 whitespace-nowrap p-2 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-primary/70 ${
                filteringType === category ? '!bg-primary dark:!bg-primary/70' : ''
              }`}
            >
              {category === 'all'
                ? 'All Courses'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Display filtered courses */}
      <CoursesList courses={filteredCourses}/>
    </div>
  );
};

export default DiscountedCoursesClient;