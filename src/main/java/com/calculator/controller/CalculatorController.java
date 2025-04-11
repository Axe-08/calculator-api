package com.calculator.controller;

import com.calculator.dto.CalculationRequest;
import com.calculator.dto.CalculationResponse;
import com.calculator.service.CalculatorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculator")
@Tag(name = "Calculator", description = "Calculator operations API")
public class CalculatorController {

    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/evaluate")
    @Operation(
        summary = "Evaluate a mathematical expression",
        description = "Evaluates a given mathematical expression and returns the result"
    )
    public ResponseEntity<CalculationResponse> evaluate(
        @Valid @RequestBody CalculationRequest request
    ) {
        CalculationResponse response = calculatorService.evaluateExpression(
            request.getExpression()
        );

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Additional endpoints for specific operations

    @GetMapping("/add")
    @Operation(
        summary = "Add two numbers",
        description = "Returns the sum of two numbers"
    )
    public ResponseEntity<CalculationResponse> add(
        @RequestParam double a,
        @RequestParam double b
    ) {
        String expression = a + " + " + b;
        return ResponseEntity.ok(
            calculatorService.evaluateExpression(expression)
        );
    }

    @GetMapping("/subtract")
    @Operation(
        summary = "Subtract two numbers",
        description = "Returns the difference of two numbers"
    )
    public ResponseEntity<CalculationResponse> subtract(
        @RequestParam double a,
        @RequestParam double b
    ) {
        String expression = a + " - " + b;
        return ResponseEntity.ok(
            calculatorService.evaluateExpression(expression)
        );
    }

    @GetMapping("/multiply")
    @Operation(
        summary = "Multiply two numbers",
        description = "Returns the product of two numbers"
    )
    public ResponseEntity<CalculationResponse> multiply(
        @RequestParam double a,
        @RequestParam double b
    ) {
        String expression = a + " * " + b;
        return ResponseEntity.ok(
            calculatorService.evaluateExpression(expression)
        );
    }

    @GetMapping("/divide")
    @Operation(
        summary = "Divide two numbers",
        description = "Returns the quotient of two numbers"
    )
    public ResponseEntity<CalculationResponse> divide(
        @RequestParam double a,
        @RequestParam double b
    ) {
        String expression = a + " / " + b;
        return ResponseEntity.ok(
            calculatorService.evaluateExpression(expression)
        );
    }
}
