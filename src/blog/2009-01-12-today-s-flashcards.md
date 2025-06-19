---
layout: layouts/post.njk
title: Today's Flashcards
date: 2009-01-12T22:33:00.000Z
tags:
  - hacking
  - java
original_url: 'https://nemorathwald.dreamwidth.org/258058.html'
userpic: ../userpics/_.jpg
---
Over the holidays I started reading the textbook and creating flashcards in Supermemo on my handheld. These are the ones that were discussed in the first class. Let me know if you know a better way to put the questions, assuming that's your kind of thing. Start a multi-line comment with: /\*\* Each line of a multi-line comment starts with: \* End a multi-line comment with: \*/ boolean defines a variable as true or false char defines a variable as a Unicode character byte defines a variable as an integer up to 1 byte short defines a variable as an integer up to 2 bytes long defines a variable as an integer up to 4 byte long defines a variable as an integer up to 8 byte float defines a variable as a floating point up to 4 bytes double defines a variable as a floating point up to 8 bytes What characters are allowed in variable identifiers? letters, digits, underscore Are variable names case-sensitive? Yes. Can a variable identifier start with a number? No. What does every assignment statement end with? ;

## Comments

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Jan. 13, 2009 2:01 PM

Comment about your "comment" markers -- the compiler only requires /\* before and \*/ after comments; the second star on the first line and the star on every line thereafter are just a convention some programmers like because it makes it easier to tell apart comment lines from code. There are, of course, those who dislike the extra characters. For example, I prefer the // style comments for 1 or 2 line comments, and I only use the leading \* if it's actually a comment (as opposed to commented out code). Oh, and the ; ends any kind of statement, not just assignments. Think of it like the end of the line in Python.

---

**Anonymous** on Jan. 16, 2009 5:34 AM — *left out*

comments related to Javadocs, not that I would expect this to be part of the class and it is also more relavent to methods. also add int and it's byte size, which I blieve is the same as long... just another way to declare a long.
