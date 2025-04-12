import axios from "axios";
import { CalculationResult } from "../types/calculator.types";

const API_BASE_URL = "http://localhost:8080/api";

export const calculatorService = {
  async calculate(a: number, b: number, operation: string): Promise<CalculationResult> {
    const response = await axios.get(`${API_BASE_URL}/calculate`, {
      params: { a, b, operation }
    });
    return response.data;
  },
  
  // Add other API calls as needed
};

