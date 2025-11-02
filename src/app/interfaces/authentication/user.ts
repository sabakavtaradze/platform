
/**
 * Defines the user attributes expected in your application, 
 * replacing the structure previously provided by AWS Cognito.
 */
export interface UserAttributes {
  sub: string;
  email: string;
  family_name: string;
  // Add any other attributes your components use (e.g., name, phone_number, etc.)
}
export interface UnseenCountResponse { 
    data: number; 
    isSuccess: boolean; 
    errorMessage: string; 
}
/**
 * Defines the overall authenticated user object structure.
 */
export interface AuthenticatedUser {
  attributes: UserAttributes;
  // Add any other top-level user properties if necessary
}