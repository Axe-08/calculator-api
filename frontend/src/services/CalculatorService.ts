import axios from 'axios';
import { CalculationRequest, CalculationResponse } from '../types';

// Define the base API URL
const API_URL = 'http://localhost:8080/api/calculator';

/**
 * Evaluates a mathematical expression using the backend API
 * @param expression The mathematical expression to evaluate
 * @returns A promise resolving to the calculation result
 */
const evaluate = async (expression: string): Promise<CalculationResponse> => {
  try {
    const request: CalculationRequest = { expression };
    const response = await axios.post(`${API_URL}/evaluate`, request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If we got a response from the server with an error
      return error.response.data as CalculationResponse;
    }
    
    // For network errors or other failures
    return {
      expression,
      result: 0,
      formattedResult: 'Error',
      success: false,
      errorMessage: 'Network error or server unavailable'
    };
  }
};

// Export the service methods
export const CalculatorService = {
  evaluate
};