// ------------ Components ----------------
import {
  Hero,
  BestSellingCourses,
  DiscountedCourses,
  NewCourses,
  Overview,
} from "../components/home";

export default function Home() {
  return (
    <section>
      <Hero />
      <BestSellingCourses />
      <NewCourses />
      <DiscountedCourses />
      <Overview />
    </section>
  );
}
