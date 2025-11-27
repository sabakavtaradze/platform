// src/app/interfaces/authentication/register-data.ts

// Interface for the data sent to the registration API endpoint (the request body)
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  /** ISO date string for the user's birthdate. */
  BirthDate?: string | null;
}

/**
* A unified interface to handle responses from authentication-related API calls.
* This includes UserID for registration and Token for verification/login.
*/
export interface RegistrationResponse {
  isSuccess: boolean;
  errorMessage: string | null;
  data?: number; // UserID on initial registration
  token?: string; // JWT token on verification/login
}