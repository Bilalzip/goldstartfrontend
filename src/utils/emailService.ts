import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY");

export const sendVerificationEmail = async (
  email: string, 
  verificationLink: string
) => {
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_VERIFICATION_TEMPLATE_ID",
      {
        to_email: email,
        verification_link: verificationLink,
      }
    );
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (
  email: string, 
  resetLink: string
) => {
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_RESET_PASSWORD_TEMPLATE_ID",
      {
        to_email: email,
        reset_link: resetLink,
      }
    );
    return true;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
}; 