---
layout: layouts/post.njk
title: 'Java Homework  #3'
date: 2009-01-27T01:30:00.000Z
tags:
  - java
  - computer
  - hacking
  - computers
original_url: 'https://nemorathwald.dreamwidth.org/262108.html'
userpic: ../userpics/_.jpg
---
Any advice on a quick tool to preserve code formatting in a blog post? You have just purchased a stereo system that cost $1,000 on the following credit plan: • no down payment, • an interest rate of 18% per year (and hence 1.5% per month), • monthly payment of $50. The monthly payment of $50 is used to pay the interest, and whatever is left is used to pay part of the remaining debt. Hence, the first month you pay 1.5% of $1,000 in interest. That is $15 in interest. So, the remaining $35 is deducted from your debt, which leaves you with a debt of $965.00. The next month, you pay interest of 1.5% of $965.00, which is $14.48. Hence, you can deduct $35.52 (which is $50 - $14.48) from the amount you owe. Write a program that tells you how many months it will take you to pay off the loan, as well as the total amount of interest and the size of the debt after each month. (Your final program need not output the monthly amount of interest paid and remaining debt, but you may want to write a preliminary version of the program that does output these values.) Use a variable to count the number of loop iterations and hence the number of months until the debt is zero. You may want to use other variables as well. The last payment may be less that $50 if the debt is small, but do not forget the interest. If you owe $50, your monthly payment of $50 will not pay off your debt, although it will come close. One month's interest on $50 is only 75 cents.

* * *

> /\* Programmer: Matt Arnold
> 
> \* Finds out how many months it takes to pay off a $1000 purchase with no downpayment.
> 
> \*/
> 
> import java.text.\*;
> 
> public class InterestCalculator 
> 
> {
> 
> static final double RATE = 0.015; // Interest rate is 1.5% per month.
> 
> static final double PAYMENT = 50; // Payments are $50 per month.
> 
> public static void main(String\[\] args) 
> 
> {
> 
> double balance = 1000.00; // How much debt remains.
> 
> double thisMonthsInterest; // How much debt accrues on the current month's balance in one month.
> 
> int months = 0; // How many monthly payments have been made so far.
> 
> DecimalFormat Currency = new DecimalFormat("#0.00");
> 
> while (balance > 0.00)
> 
> {
> 
> thisMonthsInterest = balance \* RATE;
> 
> balance = balance + thisMonthsInterest - PAYMENT;
> 
> months++;
> 
> System.out.println(months + " Interest: $" + Currency.format(thisMonthsInterest) + " Balance: $" + Currency.format(balance));
> 
> }    
> 
> }
> 
> }

## Comments

---

**[ext_528971](https://www.dreamwidth.org/users/ext_528971)** on Jan. 27, 2009 4:15 AM

does the html {pre}somecode.. {/pre} tags work?

system.out.println("jello world");

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 27, 2009 4:22 AM

That's great. Thanks!
