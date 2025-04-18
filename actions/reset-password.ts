'use server';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "@firebase/auth";
import { auth } from "@/lib/firebase";
import { validatePassword, validateConfirmPassword } from "@/validators";

export async function resetPassword(pre: any, formData: FormData){

  const currentPassword = formData.get('current-password') as string;
  const newPassword = formData.get('new-password') as string;
  const confirmNewPassword = formData.get('confirm-new-password') as string;

  const newPasswordValidation = validatePassword(newPassword);
  if (!newPasswordValidation.isValid) {
    return { error: newPasswordValidation.error };
  }

  const confirmNewPasswordValidation = validateConfirmPassword(confirmNewPassword, newPassword);
  if (!confirmNewPasswordValidation.isValid) {
    return { error: confirmNewPasswordValidation.error };
  }

  try {
    const user = auth.currentUser; // Get the currently signed-in user
    if (user && user.email) {
      // Reauthenticate the user with their current password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the user's password with the new password
      await updatePassword(user, newPassword);

      // Provide feedback to the user and reset the form fields
      return {
        success: true,
        message: 'Password Changed Successfully'
      }
    } else {
      return { error: 'No User Is Currently Signed In' }
    }
  } catch (err) {
    // Handle errors and display appropriate messages
    if (err instanceof Error) {
      return { error: err.message }
    } else {
      return { error: 'An Unknown Error Occurred' }
    }
  }
}