---
layout: layouts/post.njk
title: 'Python Version of Homework #3'
date: 2009-01-27T03:33:00.000Z
tags:
  - python
  - hacking
  - computers
  - computer
original_url: 'https://nemorathwald.dreamwidth.org/262214.html'
userpic: ''
---
\# Finds out how many months it takes to pay off a $1000 purchase with no downpayment.

rate = .015 # Interest rate of 1.5% per month.

payment = 50 # Monthly payment.

balance = 1000 # How much debt remains.

months = 0 # How many monthly payments have been made so far.

while balance > 0:

thismonthsinterest = balance \* rate # How much debt accrues this month

balance = balance + thismonthsinterest - payment

months += 1

print months, ' Interest: $%.2f' % thismonthsinterest, ' Balance: $%.2f' % balance

This gives the output:

1  Interest: $15.00  Balance: $965.00

2  Interest: $14.47  Balance: $929.48

3  Interest: $13.94  Balance: $893.42

4  Interest: $13.40  Balance: $856.82

5  Interest: $12.85  Balance: $819.67

6  Interest: $12.30  Balance: $781.97

7  Interest: $11.73  Balance: $743.70

8  Interest: $11.16  Balance: $704.85

9  Interest: $10.57  Balance: $665.42

10  Interest: $9.98  Balance: $625.40

11  Interest: $9.38  Balance: $584.79

12  Interest: $8.77  Balance: $543.56

13  Interest: $8.15  Balance: $501.71

14  Interest: $7.53  Balance: $459.24

15  Interest: $6.89  Balance: $416.13

16  Interest: $6.24  Balance: $372.37

17  Interest: $5.59  Balance: $327.95

18  Interest: $4.92  Balance: $282.87

19  Interest: $4.24  Balance: $237.11

20  Interest: $3.56  Balance: $190.67

21  Interest: $2.86  Balance: $143.53

22  Interest: $2.15  Balance: $95.68

23  Interest: $1.44  Balance: $47.12

24  Interest: $0.71  Balance: $-2.17

## Comments

---

**[ext_53192](https://www.dreamwidth.org/users/ext_53192)** on Jan. 27, 2009 4:29 PM

Slight bug there at the end. It's not difficult to fix, though, and I'm guessing you've already seen it.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 27, 2009 5:18 PM

Are you talking about the negative balance? I don't see that as a problem.

---

**[ext_53192](https://www.dreamwidth.org/users/ext_53192)** on Jan. 27, 2009 5:30 PM

I'd consider it a problem, since balanced owed generally shouldn't be able to go negative. I suppose it depends on the scope of the assignment, although the last paragraph of the description seems to indicate that the last payment should be smaller: "The last payment may be less that $50 if the debt is small, but do not forget the interest." I suppose it all depends on the definition of "may".

---

**[ext_680893](https://www.dreamwidth.org/users/ext_680893)** on Feb. 15, 2009 4:15 AM

Perhaps it has uses to know exactly how much was required to pay it off on the last payment?
