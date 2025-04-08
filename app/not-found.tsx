'use client'
// ------------ Components ----------------
import Image from "next/image";
import Link from "next/link"; // Import Next.js Link
// ------------ Images ----------------
import NotFoundImage from '../assets/svg/not-found.svg';

const NotFound = () => {
  return (
    <div className="bg-background-color dark:bg-background-dark-color relative flex items-center justify-center overflow-hidden pt-20">
      <div className="relative mx-auto h-full px-4 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row py-16">
          <div className="relative">
            <div className="lg:max-w-xl lg:pr-5 relative">
              {/* Main Image */}
              <div className="relative mb-8">
                <Image
                  src={NotFoundImage}
                  className="w-full h-auto opacity-50"
                  width={300}
                  height={300}
                  alt="Space Illustration"
                />
              </div>

              <p className="flex text-sm uppercase text-g1 dark:text-gray-600">404 Error</p>
              <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug text-primary tracking-tight text-g1 sm:text-7xl sm:leading-snug">
                Page Not
                <span className="my-1 inline-block border-b-8 border-g4 text-gray-300 bg-white dark:bg-background-dark-secondary-color px-4 font-bold text-g4 animate__animated animate__flash">
                  Found
                </span>
              </h2>
              <p className="text-base text-gray-700">
                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
              </p>
              <div className="mt-10 flex flex-col items-center md:flex-row">
                {/* Next.js Link for "Go Home" */}
                <Link
                  href="/"
                  className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-gray-400 px-6 font-medium tracking-wide text-white shadow-md transition duration-300 hover:bg-primary focus:outline-none md:mr-4 md:mb-0 md:w-auto"
                >
                  Go Home
                </Link>
                {/* Next.js Link for "Contact Support" */}
                <Link
                  href="/support"
                  aria-label="Contact Support"
                  className="group inline-flex items-center font-semibold text-g1 dark:text-primary"
                >
                  Contact Support
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;