package com.calculator.service;

import com.calculator.dto.CalculationResponse;
import com.calculator.util.Evaluator;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public CalculationResponse evaluateExpression(String expression) {
        try {
            // Trim any whitespace
            expression = expression.trim();
            expression = expression.replaceAll("\\s+", "");

            // Validate input
            if (expression.isEmpty()) {
                return CalculationResponse.error(
                    expression,
                    "Expression cannot be empty"
                );
            }

            // Use your existing Evaluator
            Evaluator evaluator = new Evaluator(expression);
            float result = evaluator.answer;

            return CalculationResponse.success(expression, result);
        } catch (Exception e) {
            // Log the exception - in a production app you'd use a proper logger
            System.err.println(
                "Error evaluating expression: " + e.getMessage()
            );
            e.printStackTrace();

            return CalculationResponse.error(
                expression,
                "Invalid expression: " + e.getMessage()
            );
        }
    }
}
