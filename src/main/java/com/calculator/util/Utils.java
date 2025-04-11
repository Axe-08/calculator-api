package com.calculator.util;

public class Utils {

    // Operator list
    private static Character[] operators = { '+', '-', '*', '/', '%', '^' };

    // Utility to check if character is number or a decimal point
    public static boolean isNumberOrDecimal(char c) {
        return (c >= '0' && c <= '9') || c == '.';
    }

    // Utility to check if character is operator
    public static boolean isOperator(char c) {
        for (Character element : operators) {
            if (element == c) {
                return true;
            }
        }
        return false;
    }

    // Utility to manage precedence
    public static int precedence(char operator) {
        switch (operator) {
            case '^':
                return 3;
            case '*':
            case '/':
            case '%':
                return 2;
            case '+':
            case '-':
                return 1;
            default:
                return 0;
        }
    }
}
