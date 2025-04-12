package com.calculator.util;

import java.util.Stack;

/**
 *
 */
public class Convert { //STANDARD INFIX TO POSTFIX OPERATIONS WITH SOME EXCEPTIONAL CASES HANDELING

    public StringBuilder Postfix; //initialize Postfix String

    public Convert(String infix) throws Exception {
        Stack<Character> stack = new Stack<Character>();
        String s = MultiDigitSupport(infix); //enters '`' after every decimal substring to signify end of number
        s = negationAnalyzer(s); // fix for negation(-) operation
        Postfix = new StringBuilder(); //empty postfix string
        for (int i = 0; i < s.length(); i++) {
            Character c = s.charAt(i);
            if (Character.isDigit(c) || c == '`' || c == '.' || c == '~') { //ADD UTILTY FOR IT LATER
                Postfix.append(c);
            } else if (Utils.isOperator(c)) {
                while (
                    !stack.isEmpty() &&
                    Utils.precedence(c) <= Utils.precedence(stack.peek())
                ) {
                    Postfix.append(stack.pop());
                    //System.out.println("c1");
                }
                stack.push(c);
            } else {
                throw new Exception("Invalid Input");
            }
        }
        while (!stack.isEmpty()) {
            Postfix.append(stack.pop());
        }
    }

    public static String negationAnalyzer(String s) {
        StringBuilder n = new StringBuilder(s);

        for (int i = 0; i < n.length(); i++) {
            if (
                n.charAt(i) == '-' &&
                (i == 0 ||
                    Utils.isOperator(n.charAt(i - 1)) ||
                    n.charAt(i - 1) == '(')
            ) { //if negation operator condition found
                n.setCharAt(i, '~'); //replace it character '~' for differentiation from '-'
            } //ADD UTILITY FOR LINE 42 LATER.
        }
        return n.toString();
    }

    public static String MultiDigitSupport(String Postfix) {
        //using regular expression(a tool for pattern recognition)
        String regex = "(\\d{1,})";
        //FIX THIS WHEN HANDLING DECIMAL(.)(FIXED!!!)
        //for now just adding a '`'after a number to identify different numbers in postfix expression
        String newex = Postfix.replaceAll(regex, "$1" + '`');

        String regex2 = "(`\\.)";
        //fix for decimal appearance
        return newex.replaceAll(regex2, ".");
    }
}
