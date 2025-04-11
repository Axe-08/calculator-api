package com.calculator.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CalculationRequest {

    @NotBlank(message = "Expression cannot be empty")
    private String expression;

    // Default constructor
    public CalculationRequest() {}

    // Constructor with expression
    public CalculationRequest(String expression) {
        this.expression = expression;
    }

    // Getter (Lombok should generate this, but to be safe)
    public String getExpression() {
        return expression;
    }

    // Setter
    public void setExpression(String expression) {
        this.expression = expression;
    }
}
