import { User } from "@firebase/auth";

/**
 * Interface defining the shape of the authentication context
 * 
 * @property {User | null} user - Current authenticated Firebase user
 * @property {boolean} loading - Authentication state loading status
 * @property {Object} userData - Additional user data from Firestore
 * @property {function} handleLogout - Function to handle user logout
 */
export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  userData: { firstName?: string; lastName?: string } | undefined;
  callbackUrl: string;
  setCallbackUrl: React.Dispatch<React.SetStateAction<string>>;
  handleLogout: () => Promise<void>;
}
