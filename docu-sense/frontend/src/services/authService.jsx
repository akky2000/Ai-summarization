export const registerUser = async (data) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      return { status: false, message: 'Registration failed' };
    }
  };
  
  export const verifyUser = async ({ email, otp }) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      return await response.json();
    } catch (error) {
      return { status: false, message: 'OTP verification failed' };
    }
  };
  
  // ✅ ADD THIS FUNCTION
  export const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch('/api/v1/auth/login', {  // Corrected URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await response.json();
    } catch (error) {
      return { status: false, message: 'Login failed' };
    }
  };
  