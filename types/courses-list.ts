import { TCourse } from "./course.types";

export type TCoursesList = {
    loading: boolean;
    error: Error | null;
    courses: TCourse[];
}