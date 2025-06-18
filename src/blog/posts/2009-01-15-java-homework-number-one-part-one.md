---
layout: layouts/post.njk
title: 'Java Homework Number One, Part One'
date: 2009-01-15T18:21:00.000Z
tags:
  - computers
  - java
original_url: 'https://nemorathwald.dreamwidth.org/258665.html'
userpic: ../userpics/_.jpg
---
Write an application that reads a value representing a number of seconds, then print the equivalent amount of time as a combination of hours, minutes and seconds. For example, 9999 seconds is equivalent to 2 hours, 46 minutes, and 39 seconds. Here is my solution. // Import the Scanner class to receive console input. import java.util.Scanner; // The name of this program, or "class", is "time". public class time { public static void main(String\[\] args) { // Use the Scanner class to find out what the user types. Scanner keyboard = new Scanner(System.in); // Print a request for the user to enter the input. System.out.println("How many seconds? Enter an integer followed by space or return."); /\*\* \* keyboard.nextInt() reads one integer from the keyboard. \* Then it is defined as a variable to hold their input as a total number of seconds. \* I am using long in case the user has a lot of patience to type for a long time, so that they are less likely to break it with large numbers. \*/ long totalSeconds = keyboard.nextInt(); // Dividing any number of seconds by 3600 (60 \* 60) will result in hours if using one of the integer types. // Java will drop the remainder when it is looking for an integer. long hours = totalSeconds / 3600; // Remaindering the total number of seconds by 3600 will result in the number of seconds that will be converted into minutes, named remainingSeconds. long remainingSeconds = totalSeconds % 3600; // The process repeats, on remainingSeconds. Dividing it, this time by 60, gives us the number of minutes. long minutes = remainingSeconds / 60; // Once again we do the remaindering step, this time by 60, to get the number of seconds that will be printed. long seconds = remainingSeconds % 60; // Print results by concatenating strings with the output of those operations. System.out.println("There are " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds in " + totalSeconds + " seconds."); } }

## Comments

---

**[ext_255504](https://www.dreamwidth.org/users/ext_255504)** on Jan. 15, 2009 6:42 PM

What if one uses commas or periods? So if I inputed 99,999,999,999,999 or 7.777.777.777 or 5,555,555,555.555?

---

**[ext_255504](https://www.dreamwidth.org/users/ext_255504)** on Jan. 15, 2009 6:43 PM

Or if I inputed non numeric?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 15, 2009 6:45 PM

It throws an exception because it is looking for a value of type "long", which is an integer.

---

**Anonymous** on Jan. 15, 2009 9:07 PM — *Style*

A comment on style: most professional programmers would prefer that you not comment every line of code. If it's obvious what is going on (like in your println statements) you shouldn't add a comment. The comments about the division are probably fine, for example, since the code can be cryptic by itself. Of course, if your teacher wants you to comment every line, by all means do it.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 16, 2009 1:39 AM — *Re: Style*

Thanks for your advice! Once I'm done with learning exercises, I will definitely do as you describe; but until I am confident that I will remember what System.out.println means, I will comment it as a study aid. My instructor does prefer more comments over less as a general rule.

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Jan. 16, 2009 2:55 PM — *Re: Style*

Along those lines, once you do remember what those are for, try to focus your comments osn why you are doing something rather than just what you are doing. Nothing is worse that reading code like this:

// add x and y to get the total

total = (x\*y) + z;

Something changed -- it probably used to be just x+y -- but now the comments are out of date and likely worse than no comments at all.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 16, 2009 3:20 PM — *Re: Style*

That's a very good point. Thanks!

---

**[ext_119840](https://www.dreamwidth.org/users/ext_119840)** on Jan. 16, 2009 11:45 PM — *Re: Style*

And the important part is the "why" - the addition example isn't the very best, but in general, you can parse out what the code is actually doing. What you may not understand (in a week, a month, a year, another hundred lines of logic, or another programmer's skin) is what the point of the line (or subroutine) of code is. Knowing your intent is incredibly important in later debugging. "This routine is to use the index numbers (not array elements) from every entry in this array to be used as a check in routine Zeta" is a much more useful comment than: "Get index numbers". Go you with the programming!
