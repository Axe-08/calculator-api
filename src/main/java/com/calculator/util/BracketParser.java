package com.calculator.util;

public class BracketParser {

    //check if bracket is available in given expression
    public static Boolean isBracketAvailable(StringBuilder exp)
        throws Exception {
        int openBrackets = 0, closingBrackets = 0;
        for (int i = 0; i < exp.length(); i++) {
            if (exp.charAt(i) == '(') openBrackets++;
            if (exp.charAt(i) == ')') closingBrackets++;
        }
        if (openBrackets == closingBrackets) {
            if (openBrackets != 0) return true; //bracket available
            else return false; //bracket not available
        } else throw new Exception("Invalid Bracket Placement"); //bracket available but not equal amount of closed and open brackets
    } //Future note: check exception for unique case where close bracket is before open bracket.

    //             as this will bypass above checks.

    public static int findFirstClosingBracket(StringBuilder exp) {
        return exp.indexOf(")"); //finds first closing bracket such as "32-3*(13+(13))" or "(42-23)*32-(2/2*(32-1))"
    } //												   ^ 			 ^

    public static int findLastOpenBracket(
        StringBuilder exp,
        int closingBracketIndex
    ) {
        return exp.lastIndexOf("(", closingBracketIndex); //finds last opening bracket just before first closing bracket
    } // essentially finding smallest bracket set

    public static String bracketSolving(StringBuilder exp) {
        try {
            while (isBracketAvailable(exp)) {
                int firstClosingBracket = findFirstClosingBracket(exp);
                int lastOpenBracket = findLastOpenBracket(
                    exp,
                    firstClosingBracket
                );
                String brackExp = exp.substring(
                    lastOpenBracket + 1,
                    firstClosingBracket
                ); //sending expression inside bracket to evaluator
                float brackResult = Evaluator.evaluate(brackExp);
                exp.replace(
                    lastOpenBracket,
                    firstClosingBracket + 1,
                    Float.toString(brackResult)
                ); //replaces the bracket and inner expression with result for further calculation.
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return exp.toString();
    }
}
