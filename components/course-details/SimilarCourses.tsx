// ------------ Utils ----------------
import CoursesApi from "@/app/_utils/CoursesApi";
// Utility module for making API calls related to courses

// ------------ Types ----------------
import { TCourse } from "@/types";
// Importing type definitions for better type safety

// ------------ Component ----------------
import { CoursesList } from "../common";
// Importing reusable CoursesList component for displaying courses

// Type definition for component props
type TSimilarCourses = {
    courseCategory: string;  // Category to find similar courses in
    courseTitle: string;     // Current course title to exclude from results
}

/**
 * SimilarCourses component displays courses from the same category,
 * excluding the current course being viewed.
 * 
 * @param {TSimilarCourses} props - Component props
 * @param {string} props.courseCategory - Category to filter similar courses
 * @param {string} props.courseTitle - Current course title to exclude
 * @returns {JSX.Element} Rendered list of similar courses
 */
const SimilarCourses = async ({ courseCategory, courseTitle }: TSimilarCourses) => {
    // Fetch courses from the same category using the API utility
    const similarCourses = await CoursesApi.getSearchResultCourses(`category=${courseCategory}`);
    
    // Filter out the current course from the results to avoid showing duplicate
    const filteredSimilarCourses = similarCourses?.data.filter(
        (course: TCourse) => course.title !== courseTitle
    );

    // Render the filtered courses using the CoursesList component
    return <CoursesList courses={filteredSimilarCourses} />;
}

export default SimilarCourses;