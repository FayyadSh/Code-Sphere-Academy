// ------------ Icons ----------------
import { LogOut, User } from 'lucide-react';
// ------------ Components ----------------
import Link from 'next/link';

interface DropDownMenuProps {
    showDropdown: boolean;
    userName: string | null | undefined;
    userData: {
        firstName?: string | undefined,
        lastName?: string | undefined
    } | undefined;
    handleLogout: () => void;
}

const DropdownMenu = ({showDropdown, userName, userData, handleLogout: logout}: DropDownMenuProps) => {

    const handleLogout = () => {
        logout()
    }
    return (
        <div style={{visibility: showDropdown ? 'visible' : 'hidden'}} >
            <div className={`opacity-${showDropdown ? '100' : '0'} flex flex-col gap-3 transition-all duration-150 text-primary bg-background-color dark:bg-zinc-900 p-4 absolute w-fit top-20 right-32 rounded-lg z-20 shadow-md`}>
                <p className='border-b border-primary text-sm dark:border-gray-800 pb-2' >  
                    {userName ? 
                        userName 
                        : 
                        userData?.firstName + ' ' + userData?.lastName
                    } 
                </p>
                <Link
                    href='/account'
                    className='text-sm flex items-center justify-between gap-3'
                >
                    Account <User />
                </Link>
                <button
                    onClick={() => handleLogout()}
                    className='text-sm flex items-center justify-between gap-3'
                >
                    Logout <LogOut />
                </button>
            </div>
        </div>
    );
}

export default DropdownMenu;
