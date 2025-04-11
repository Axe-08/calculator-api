package com.calculator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.calculator.dto.CalculationResponse;
import com.calculator.service.CalculatorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CalculatorApiApplicationTests {

    @Autowired
    private CalculatorService calculatorService;

    @Test
    void contextLoads() {}

    @Test
    void testBasicAddition() {
        CalculationResponse response = calculatorService.evaluateExpression(
            "2 + 2"
        );
        assertTrue(response.isSuccess());
        assertEquals(4.0f, response.getResult(), 0.001);
    }

    @Test
    void testComplexExpression() {
        CalculationResponse response = calculatorService.evaluateExpression(
            "(3 + 5) * 2 / (7 - 2)"
        );
        assertTrue(response.isSuccess());
        assertEquals(3.2f, response.getResult(), 0.001);
    }
}
