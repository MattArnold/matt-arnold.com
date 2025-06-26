---
layout: layouts/post.njk
title: (no subject)
date: 2009-01-16T15:21:00.000Z
tags:
  - python
  - hacking
original_url: 'https://nemorathwald.dreamwidth.org/259156.html'
userpic: ../userpics/_.jpg
---
I've received some very good comments to my blog, concerning the style of my comments in source code. It's true that in professional projects, very obvious comments are counterproductive, especially when changes are made to the code they are explaining. However, for the time being, I'm trying to remember Java itself, not the decisions particular to a specific program. So I am temporarily commenting my learning exercises in such a way that a complete newcomer might be able to follow it. I wish I had done that on [Herdcat](http://matt-arnold.livejournal.com/190189.html) when Bruce and I wrote it in Python a year ago, because going back now, I don't understand the code or remember the keywords. Fortunately I still have my [Quizlet list about Python keywords and punctuation](http://quizlet.com/63205/python-keywords-and-punctuation-flash-cards/) set up, and that is giving me a refresher. Here is part two of my first Java homework assignment. Enhance the application so that it prompts for and reads a double value representing a monetary amount. Then determine the fewest number of each bill and coin needed to represent that amount, starting with the highest (assume that a ten dollar bill is the maximum size needed). For example, if the value entered is 47.63, then the program should print the equivalent amount as: 4 ten dollar bills 1 five dollar bills 2 one dollar bills 1 dimes 0 nickels 2 pennies Here is my solution.

    // Import the Scanner class to receive console input.

## Comments

---

**Anonymous** on Feb. 7, 2009 7:53 AM — *Overkill*

Keeping track of the change is overkill. You don't need to. Just picture it with real pennies. It's extra unnecessary computation. As for partial penny issue, multiply by 100.0, not 100. Converting to integers is the right way to do this problem since if you try to divide the values as a double, you would have to round all the values and sometimes get a missing penny if you don't which is waste of space and processing. Try it with $100.07 and you'll see you'd get 1 penny at the end instead of two. import java.util.Scanner; public class Money { public static void main (String\[\] args) { System.out.print("Enter amount: "); Scanner in = new Scanner(System.in); double dblmoney = in.nextDouble(); int money = (int)(dblmoney \* 100.0); int tens = money / 1000; int fives = (money % 1000) / 500; int ones = (money % 500) / 100; int quarters = (money % 100) / 25; int dimes = (money % 25) / 10; int nickels = (money % 10) / 5; int pennies = (money % 5); System.out.println(tens + " ten dollar bills"); System.out.println(fives + " five dollar bills"); System.out.println(ones + " one dollar bills"); System.out.println(quarters + " quarters"); System.out.println(dimes + " dimes"); System.out.println(nickels + " nickels"); System.out.println(pennies + " pennies"); } }
