// Calculator API response type
export interface CalculationResponse {
    expression: string;
    result: number;
    formattedResult: string;
    success: boolean;
    errorMessage: string | null;
  }
  
  // Calculator API request type
  export interface CalculationRequest {
    expression: string;
  }
  