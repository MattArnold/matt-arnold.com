---
layout: layouts/post.njk
title: 'Java Homework  #4'
date: 2009-02-16T18:27:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/267315.html'
userpic: ../userpics/_.jpg
---
First, a proviso: "class" will be referred to in lower case to mean an instructor teaching a group of students, and "Class" will be in upper case to refer to a document written in Java. Up until now my Java homework was not difficult to accomplish. This one, creating a calculator that takes roman numerals and gives roman numeral output, required me to dispense with some incorrect notions. I thought the point of the exercise was to put to use what we have been learning: a demonstrator Class that calls methods from other Classes, and creating new kinds of objects. I was really stuck as I tried to figure out how to warp this project into something that needs those techniques. In reality, the project just needed to be one Class, containing a series of methods, none of which create fancy new custom objects. It also doesn't help that the assignment (according to ) appears to have been lifted from the instructor's other class teaching the C++ programming language, and not sufficiently modified for Java. It actually mentions "C++" outright. His description, as shown below, asks for multiple different types of output from the same method. C++ can do that but Java can't, so it would require outputting an array, which he hasn't taught us yet. You are to design and implement a Roman numeral calculator Class. The subtractive Roman numeral notation commonly in use today was used only rarely during the time of the Roman Republic and Empire. For ease of calculation, the Romans most frequently used a purely additive notation in which a number was simply the sum of its digits (4 equals IIII in this notation, not IV). Each number starts with the digit of highest value and ends with the digit of smallest value. This is the notation you will use in this program. You class inputs two Roman numbers and an arithmetic operator and prints out the result of the operation, also as a Roman number. The values of the Roman digits are as follows: I 1 V 5 X 10 L 50 C 100 D 500 M 1000 Thus, the number MDCCCCLXXXXVI represents 1996, because 1996 is really consists of: 1000 + 500 + 100 + 100 + 100 + 100 + 50 + 10 + 10 + 10 + 10 + 5 + 1. M + D + C + C + C + C + L + X + X + X + X + V + I The arithmetic operators that your program should recognize in the input are +, -, \*, and /. These should perform the C++ operations of integer addition, subtraction, multiplication, and division. One way of approaching this problem is to convert the Roman numbers into integers, perform the required operation, and then convert the result back into a Roman number for printing. The following might be a sample run of the class: MCCXXVI The first number is 1226 LXVIIII The second number is 69 The desired arithmetic operation: + The sum of MCCXXVI and LXVIIII is MCCLXXXXV (1295). The program should check for errors in the input, such as illegal digits or arithmetic operators, and display an error message when these errors are found. Assume that the input numbers are in purely additive form – this is, digits are followed only by digits of the same or lower value. REQUIREMENTS: This class is to be done by including the following methods. METHOD get\_Data get\_Data(); This method gets one line of data, checks for incorrect data and sends back the values read in and a boolean variable indicating whether or not there was an error. If an error occurs, the method will print an error message and set the boolean variable to true. METHOD print\_Result print\_Result(); This void method receives the two roman numbers, the roman result and the integer result and prints out the messages. It does not have to return anything. METHOD convert\_To\_Roman convert\_to\_Roman(); This method is to receive an integer and return its corresponding roman number as a string. METHOD convert\_From\_Roman convert\_from\_Roman(); This method is to receive a string and return its corresponding integer number as an integer. METHOD calc\_Romans calc\_Romans(); This method is given two integers and a char and returns the result of the two integers based on the char (operator). There are two roman numbers and an operator per line Example, MCCXXVI MCC - would produce the output: The first number is MCCXXVI ( 1226 ) The second number is MCC ( 1200 ) The operator is - The result of MCCXXVI and MCC is XXVI ( 26 ) Hint: Write this program in stages, concentrating on one method at a time. E.g. Write the Get\_Data method and a main class to test it. Make sure that it works and can read the data in correctly before working on any of the other methods. Your main class will be quite short with lots of method calls to do all the work.

// Programmer: Matt Arnold 02/16/09

import java.util.Scanner;

public class RomanNumeralCalculator 

{	

public static void main(String\[\] args) 

{	// ask for the first roman numeral

String firstNumeral = get\_Data();

// turn 1st roman numeral into an integer

int number1 = convert\_From\_Roman(firstNumeral);

// ask for the second roman numeral

String secondNumeral = get\_Data();

// turn 2nd roman numeral into an integer

int number2 = convert\_From\_Roman(secondNumeral); 

// ask for a math operator

char operAtor = get\_Operator();

// perform selected math operation on the 2 integers

int resultInteger = calc\_Romans(number1, number2, operAtor);

// turn the result into a roman numeral

String resultRomanNumeral = convert\_To\_Roman(resultInteger); 

print\_Result(resultRomanNumeral);

}

// Asks the user to input a roman numeral, and passes that as a string.

public static String get\_Data()

{

Scanner keyboard = new Scanner(System.in);

String firstInput;

System.out.println("Enter a Roman Numeral and press Enter.");

firstInput = keyboard.nextLine();

firstInput = firstInput.toUpperCase();

// Uses the class is\_bad\_Roman\_Numeral to decide whether to repeat

while (is\_bad\_Roman\_Numeral(firstInput))

{

System.out.println("That is not a valid Roman Numeral. Try that one again.");

firstInput = keyboard.nextLine();

firstInput = firstInput.toUpperCase();

}

return firstInput;

}

// checks for valid Roman Numeral

public static boolean is\_bad\_Roman\_Numeral(String romanNumeral)

{

for (int i = 0; i < romanNumeral.length(); i++)

{

switch (romanNumeral.charAt(i)) 

{

case 'M':

case 'D':

case 'C':

case 'L':

case 'X':

case 'V':

case 'I':

break;

default:

return true;

}

}

return false;

}

// takes a Roman Numeral as a string, converts it to, & passes, an integer.

public static int convert\_From\_Roman(String romanNumeral)

{

int number1 = 0;

for (int i = 0; i < romanNumeral.length(); i++)

{

switch (romanNumeral.charAt(i)) 

{

case 'M':

number1 += 1000;

break;

case 'D':

number1 += 500;

break;

case 'C':

number1 += 100;

break;

case 'L':

number1 += 50;

break;

case 'X':

number1 += 10;

break;

case 'V':

number1 += 5;

break;

case 'I':

number1 += 1;

break;

default:

System.out.println("That is not a valid Roman Numeral.");

break;

}

}

return number1;

}

// Asks the user what math operation to perform, & passes it as a character.

public static char get\_Operator()

{	

System.out.println("Enter an operator character and press Enter.");

Scanner keyboard = new Scanner(System.in);

String operatorInput;

operatorInput = keyboard.nextLine();

char operAtor = operatorInput.charAt(0);

return operAtor;

}

/\* Performs the desired type of calculation on two integers and returns the

resulting integer. Be aware that this method performs integer division.\*/

public static int calc\_Romans(int number1, int number2, char operAtor)

{

if (operAtor == '+')

return number1 + number2;

else if (operAtor == '-')

return number1 - number2;

else if (operAtor == '\*')

return number1 \* number2;

else

return number1 / number2;

}

// Takes an integer and turns it into a Roman Numeral.

public static String convert\_To\_Roman(int Nnum)

{

int Mnum = Nnum / 1000;

int Mmod = Nnum % 1000;

int Dnum = Mmod / 500;

int Dmod = Mmod % 500;

int Cnum = Dmod / 100;

int Cmod = Dmod % 100;

int Lnum = Cmod / 50;

int Lmod = Cmod % 50;

int Xnum = Lmod / 10;

int Xmod = Lmod % 10;

int Vnum = Xmod / 5;

int Inum = Xmod % 5;

String romanNumeral = "";

while (Mnum > 0)

{

romanNumeral = romanNumeral += "M";

Mnum--;

}

while (Dnum > 0)

{

romanNumeral = romanNumeral += "D";

Dnum--;

}

while (Cnum > 0)

{

romanNumeral = romanNumeral += "C";

Cnum--;

}

while (Lnum > 0)

{

romanNumeral = romanNumeral += "L";

Lnum--;

}

while (Xnum > 0)

{

romanNumeral = romanNumeral += "X";

Xnum--;

}

while (Vnum > 0)

{

romanNumeral = romanNumeral += "V";

Vnum--;

}

while (Inum > 0)

{

romanNumeral = romanNumeral += "I";

Inum--;

}

return romanNumeral;

}

public static void print\_Result(String romanNumeral)

{

System.out.println("The result is: " + romanNumeral);

}

}

## Comments

---

**[ext_528971](https://www.dreamwidth.org/users/ext_528971)** on Feb. 18, 2009 6:20 AM

a couple ways using the [Arrays class](http://java.sun.com/j2se/1.5.0/docs/api/java/util/Arrays.html), which has some nifty built in functions..

import java.util.Arrays;

// some code

// i havent tried this but the java docs say it should work like this

String str = Arrays.tostring(yourarray);

System.out.println(str);

or there's the more traditional for loop/string concatenation.

String str = new String();

for (int i=0;i
