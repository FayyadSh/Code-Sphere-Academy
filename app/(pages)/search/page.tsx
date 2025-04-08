// ------------ Components ----------------
import { CoursesList } from "../../../components/common";
// ------------ Utils ----------------
import CoursesApi from "../../_utils/CoursesApi";
// ------------ Types ----------------
import { TCourse } from "../../../types";
import { Metadata } from "next";

type TParams = { searchParams: Promise<{query?: string, category?: string}> }
type TResponse = { 
  data: TCourse[];
}
export const generateMetadata = async ({searchParams} : TParams) : Promise<Metadata> => {
    
    const title = (await searchParams).query;
    const category = (await searchParams).category;
    const query = title ? title : category as string;

    return {
      title: `search | ${decodeURIComponent(query)}`
    }
}

const Page = async ({searchParams} : TParams) => {

    const title = (await searchParams).query;
    const category = (await searchParams).category;
    const query = title ? `query=${title}` : `category=${category}`;
    query.toLowerCase().replace('%20', ' ')?.replace('-', ' ');

    const searchResultCourses: TResponse = await CoursesApi.getSearchResultCourses(query) || [];

    // Rendering the CoursesList component with filtered courses, loading state, and error
    return <CoursesList courses={searchResultCourses?.data} />;
}

export default Page;