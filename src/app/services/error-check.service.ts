import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorCheckeService {

  constructor() { }
  public getErrorString(error: any): string {
    if (error.message) {
      const errorMessage = error.message;

      // Check if the error message contains the text "Incorrect password".
      // If it does, return the incorrect password error message.
      if (errorMessage.includes('Incorrect password')) {
        return 'Incorrect password.';
      }

      // Otherwise, return the error message.
      return errorMessage;
    } else {
      return error;
    }
  }
  extractMessage(error: any): string {
    // 1. Handle errors from AWS Amplify (Amplify errors often have a simple 'message' property)
    if (error && error.message && typeof error.message === 'string') {
      return error.message;
    }
    
    // 2. Handle HTTP errors where the API wraps the message in a complex object
    // (e.g., from your C# backend: { error: { errorMessage: '...' } })
    if (error && error.error && error.error.errorMessage && typeof error.error.errorMessage === 'string') {
      return error.error.errorMessage;
    }

    // 3. Handle a standard Axios/HttpClient error response containing the error object directly
    if (error && error.error && typeof error.error === 'string') {
      return error.error;
    }
    
    // 4. Handle simple string errors
    if (typeof error === 'string') {
      return error;
    }
    
    // 5. Default fallback message
    return 'An unexpected error occurred. Please try again.';
  }
}
