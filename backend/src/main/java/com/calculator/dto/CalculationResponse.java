package com.calculator.dto;

import lombok.Data;

@Data
public class CalculationResponse {

    private String expression;
    private float result;
    private String formattedResult;
    private boolean success;
    private String errorMessage;

    // Default constructor
    public CalculationResponse() {}

    // Full constructor
    public CalculationResponse(
        String expression,
        float result,
        String formattedResult,
        boolean success,
        String errorMessage
    ) {
        this.expression = expression;
        this.result = result;
        this.formattedResult = formattedResult;
        this.success = success;
        this.errorMessage = errorMessage;
    }

    public static CalculationResponse success(String expression, float result) {
        return new CalculationResponse(
            expression,
            result,
            String.valueOf(result),
            true,
            null
        );
    }

    public static CalculationResponse error(
        String expression,
        String errorMessage
    ) {
        return new CalculationResponse(
            expression,
            0,
            "Error",
            false,
            errorMessage
        );
    }

    // Add a getter for success field (Lombok should generate this, but to be safe)
    public boolean isSuccess() {
        return success;
    }
}
