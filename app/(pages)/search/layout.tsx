'use client'
// ------------ Hooks ----------------
import { usePathname, useRouter } from 'next/navigation';
// ------------ Components ----------------
import { Breadcrumb } from '../../../components/ui';
import { SearchInput } from '../../../components/common';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {

  const router = useRouter(); // Accessing the router for navigation
  const path = usePathname(); // Getting the current pathname

  const handleNavigation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value; // Getting the selected category
    if (target) {
      router.push(target); // Navigating to the selected category
    }
  };

  return (
    <div className='px-6 sm:px-16 lg:px-40 pt-40 md:pt-24 bg-background-color dark:bg-background-dark-color'>
      <Breadcrumb path={path} />
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6'>
        
        <SearchInput otherClasses='!focus:outline-none !text-[12px]' />

        <select 
          className='mt-50 cursor-pointer w-[50%] lg:w-[25%] p-2 bg-background-secondary-color dark:bg-background-dark-secondary-color text-light-color rounded-lg border-none outline-none' 
          onChange={handleNavigation} 
          defaultValue=""
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value='/search?category=web-development'>Frontend</option>
          <option value='/search?category=backend'>Backend</option>
          <option value='/search?category=mobile-development'>Mobile Development</option>
          <option value='/search?category=desktop'>Desktop</option>
          <option value='/search?category=data-science'>Data Science</option>
          <option value='/search?category=cyber-security'>Cyber Security</option>
        </select>

      </div>
      {children} {/* Rendering the children components */}
    </div>
  );
}

export default Layout;
