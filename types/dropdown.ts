
// Define the props interface for the DropdownMenu component
export interface DropDownMenuProps {
    showDropdown: boolean;          // Controls whether the dropdown is visible
    userName: string | null | undefined;  // User's display name (could be email or username)
    userData: {                     // Optional user details
        firstName?: string | undefined,
        lastName?: string | undefined
    } | undefined;
    handleLogout: () => void;       // Callback function for logout action
    handleCloseDropdown: () => void;
}

/**
 * DropdownMenu Component
 * 
 * A user profile dropdown menu that appears when activated (typically from a user avatar/button).
 * Contains user information, account link, and logout option.
 * 
 * @param {boolean} showDropdown - Controls the visibility of the dropdown
 * @param {string|null|undefined} userName - The user's display name
 * @param {Object} userData - Optional object containing user's first and last name
 * @param {function} handleLogout - Callback function to handle logout action
 */