package com.calculator.util;

import java.util.*;

public class Evaluator {

    public float answer;

    public Evaluator(String infix) throws Exception { //crucial code piece
        answer = evaluate(infix); //constructer for finding result from a normal infix expression
    }

    static float evaluate(String infix) throws Exception {
        try {
            StringBuilder infixSb = new StringBuilder(infix); //if bracket available solve those brackets first
            if (BracketParser.isBracketAvailable(infixSb)) {
                infix = BracketParser.bracketSolving(infixSb);
            } //bracket solver also calls it but since it is solving smallest bracket a time it passes the if condition because there are no bracket inside smallest expression.
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        //System.out.println(infix);
        Convert c = new Convert(infix); //convert infix to postfix
        StringBuilder postfix = new StringBuilder(c.Postfix);
        //System.out.println(postfix);
        Stack<Float> numStack = new Stack<Float>(); //initialise number stack to store operands
        int i = 0;
        boolean isNextNegetive = false; //for handeling negation operation
        while (i < postfix.length()) {
            if (
                !Utils.isOperator(postfix.charAt(i)) && postfix.charAt(i) != '~'
            ) {
                int j = i;

                while (postfix.charAt(j) != '`') {
                    j++;
                }
                // System.out.println("i: "+i+" j: "+j);
                String sub = postfix.substring(i, j);
                // System.out.println(sub);
                if (isNextNegetive) { //if this number is having negation operation
                    numStack.add(-1 * Float.parseFloat(sub));
                    //System.out.println(numStack.peek());
                    isNextNegetive = false;
                } else {
                    numStack.add(Float.parseFloat(sub));
                }
                i = j + 1;
            } else if (postfix.charAt(i) == '~') {
                //System.out.println("negation found");
                isNextNegetive = true;
                i++;
            } else if (Utils.isOperator(postfix.charAt(i))) {
                // System.out.println(" Stack Elements: "+numStack.lastElement());
                float operand1 = numStack.peek();
                numStack.pop();
                float operand2 = numStack.peek();
                numStack.pop();
                // System.out.print(operand1+" "+postfix.charAt(i)+" "+operand2);
                numStack.push(
                    MathUnit.mathReturn(postfix.charAt(i), operand1, operand2)
                );
                i++;
            }
        }

        return numStack.pop(); //return the result which is left in stack
    }
    /*public static void main(String args[]) throws Exception {
		String test = "(43.36-((42.61*5.21)-32))/(0.0051-14)";
		//String test = "-133";
		// 9 sept notes:: ADD Support for Negation

		System.out.println(evaluate(test));
		// System.out.println(c.Postfix);
	}
	*/
}
