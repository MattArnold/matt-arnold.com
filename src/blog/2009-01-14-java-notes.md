---
layout: layouts/post.njk
title: Java notes
date: 2009-01-14T21:56:00.000Z
tags:
  - java
  - computers
original_url: 'https://nemorathwald.dreamwidth.org/258406.html'
userpic: ../userpics/_.jpg
---
Halfway break in Java class. Everyone was surprised that I was never taught in second grade "Please Excuse My Dear Aunt Sally". First you resolve parentheses and exponents, second you resolve multiplication and division operators, third you resolve addition and subtraction operators. However, Java doesn't have the exponent operator and it does have a remainder operator, so I decided it's "Prosecute My Dirty Rotten Aunt Sally". It's counter-intuitive for me to do integer arithmetic, in which every step, Java gets rid of the fraction. 7/2=3 It takes me a long time to perform basic arithmetic in my head, on the best of days. String fullname; fullname = "John Kennedy" secondLetter = fullname.charAt(1); It returns 'o' not 'J' because everything counts from 0. Zero is always the first number. 1 is the second number. age = age -3; // same as age -= 3; Today's flashcard: In an expression, what is the difference between variable++ and ++variable? With x++ Java waits to resolve the rest of the expression before incrementing x by 1.

## Comments

---

**[ext_119840](https://www.dreamwidth.org/users/ext_119840)** on Jan. 15, 2009 1:10 AM

I was never taught that, either. I was just taught the order of operator precedence. Oh yes. Never forget that programmers count from zero.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Jan. 15, 2009 1:22 AM

Yeah, I was always just taught the order... and yes, the 0th rule of programming is that programmers count from 0.

---

**[ext_47572](https://www.dreamwidth.org/users/ext_47572)** on Jan. 15, 2009 2:19 AM

Unless you're in VB, in which case you have to explicitly tell it to count from zero. Whee. (I still remember those pre-.NET days, heh) Also, MySQL counts from 1 when doing str positioning and what-not. >\_>

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Jan. 15, 2009 3:08 PM

"Programmers count from zero" -- except when they [don't](http://xkcd.com/163/). Matlab used to give me headaches because it starts from 1, among other reasons. But that's getting [less common](http://en.wikipedia.org/wiki/Comparison_of_programming_languages_\(array\)) these days with the rise of the so called "curly bracket languages" that tend to build on [BCPL](http://en.wikipedia.org/wiki/BCPL) conventions for counting as well as syntax.

---

**[ext_50639](https://www.dreamwidth.org/users/ext_50639)** on Jan. 17, 2009 3:56 AM

I'm guessing it might be an age thing. I wasn't taught any mnemonics when I was growing up either, but some of the younger kids I'm running into (and much younger siblings of friends) are learning some strange stuff...like [multiplication tricks](http://www.youtube.com/watch?v=6n8hKpLaWMI&feature=related) that make no sense to me and weird ways of doing addition. No, they're not the old intuitive ways I remember, like thinking of 23 \* 25 as 25^2-50 or 2(250)+75.
