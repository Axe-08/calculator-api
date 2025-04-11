package com.calculator.util;

public class MathUnit {

    public static float mathReturn(
        char operator,
        float operand1,
        float operand2
    ) {
        switch (operator) { //return for basic operations
            case '+':
                return operand2 + operand1;
            case '-':
                return operand2 - operand1;
            case '*':
                return operand2 * operand1;
            case '/':
                return operand2 / operand1;
            case '^':
                return (float) Math.pow(operand2, operand1);
            case '%':
                return operand2 % operand1;
            default:
                return 0;
        }
    }
}
