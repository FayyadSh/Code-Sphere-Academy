import { usePathname, useSearchParams } from "next/navigation";

const useNavActive = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    const currentPath = pathname.split('/')[1];
    const currentCategory = searchParams.get('category');
    const hasSearchQuery = searchParams.has('query'); // Proper way to check for query param
  
    switch (true) {
      // Don't highlight "Subjects" if there's a search query
      case (href === 'search' && currentPath === 'search' && hasSearchQuery):
        return 'hover:text-primary';
        
      case (href.startsWith('search') && currentPath === 'search' && href === 'search'):
      case (href.split('search?category=')[1] === currentCategory):
        return 'text-primary';
        
      case (currentPath === href):
        return 'text-primary';
  
      default:
        return 'hover:text-primary';
    }
  };

  return { isActive };
};

export default useNavActive;