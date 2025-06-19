---
layout: layouts/post.njk
title: Python Version of My Java Homework
date: 2009-01-17T22:25:00.000Z
tags:
  - hacking
  - computer
  - java
  - python
  - computers
original_url: 'https://nemorathwald.dreamwidth.org/260024.html'
userpic: ''
---
knows Java really well, which has come in handy for tutoring, I can tell you. However, she also has a copy of "Beginning Python From Novice To Professional" by Magnus Lie Hetland lying around. Since Python is the language I want to make actual real projects in, I was curious. So I decided to do my homework again, in Python. This time it was six lines long. However, I decided to take it further. The new version properly uses singular and plural English. In other words, it will say "1 hour" instead of "1 hours."

>     totalSeconds = input("How many seconds?")
>     
>     hours = totalSeconds / 3600
>     
>     remainingSeconds = totalSeconds % 3600
>     
>     minutes = remainingSeconds / 60
>     
>     seconds = remainingSeconds % 60
>     
>     if hours == 1:
>     
>     pluralHour = ""
>     
>     else:
>     
>     pluralHour = "s"
>     
>     if minutes == 1:
>     
>     pluralMinute = ""
>     
>     else:
>     
>     pluralMinute = "s"
>     
>     if seconds == 1:
>     
>     pluralSecond = ""
>     
>     else:
>     
>     pluralSecond = "s"
>     
>     print str(hours) + " hour" + str(pluralHour) + ", " + str(minutes) + " minute" + str(pluralMinute) + ", and " + str(seconds) + " second" + str(pluralSecond) + "."

So while I was doing this, she also did the exercise in Python, except she didn't want to type the singlular/plural decision into her version three times like I did. She felt it was more elegant to make one set of pluralization instructions and have Python repeat it for hours, minutes, and seconds. She cursed at the computer for a half hour and came up with the version she will post in the comments. I do not curse at the computer. I expect coding to be painful, and have been pleasantly surprised to be proven wrong.

    pain = False
    
    if not pain:
    
    gain = False

## Comments

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Jan. 18, 2009 2:32 AM

Here's a neat trick I've recently learned in Python for conditional assignments: This:

if hour == 1:

pluralHour  = ""

else

pluralHour = "s"

Is the same as this:

pluralHour = "s" if hour == 1 else ""

I think the second actually shows a little more clearly what is being done, especially in cases like this where the if clause is short. (When the if clause is really long, it tends to make the lines get unreadably long when you do it this way) In lojban terms, think of it as a sort of SE variety of conditianals -- the x2 gets rotated out to the front and then x1 and x3 follow. Or I also think of it as "inside out" notation, because the part that's normally in the middle comes first.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 18, 2009 2:53 AM

Oh, that's good!

---

**[ext_50639](https://www.dreamwidth.org/users/ext_50639)** on (None)



---

**[ext_50639](https://www.dreamwidth.org/users/ext_50639)** on Jan. 18, 2009 3:46 AM

As requested, here is my code. Let me just say that at least half of the cursing was from Matt's request \*after\* I had coded it the first time, to display my loop in the same format as his did, with the same spacing, punctuation, and pluralization. ;P The print function -- which I had used originally -- has extra spaces by default that make the same formatting in a loop impossible to implement. Here's what I came up with:

> seconds = input('Enter the number of seconds: ') time = \[("hour",seconds/3600), ("minute",(seconds%3600)/60), ("second",(seconds%3600)%60)\] result = '' for index,item in enumerate(time):     name,value = item     if value != 1:         name = name + "s"     if index == len(time)-1:         result += "and "     result += \`value\` + " " + name     if index != len(time)-1:         result += ", " print "\\t", result

I've read that using index to refer to loops is not very Pythonic (damn you, Java, for corrupting me!). Is there another way that I could run the loop without making explicit \[numerical\] reference to the last item of the list?

---

**[ext_362568](https://www.dreamwidth.org/users/ext_362568)** on Jan. 18, 2009 8:31 AM

My first python program :)

def plural( num):

if num == 1:

return ""

else:

return "s"

totalSeconds = input("How many seconds?")

hours = totalSeconds / 3600

remainingSeconds = totalSeconds % 3600

minutes = remainingSeconds / 60

seconds = remainingSeconds % 60

print str(hours) + " hour" + plural( hours) + ", " + str(minutes) + " minute" + plural( minutes) + ", and " + str(seconds) + " second" + plural( seconds) + "."

---

**[ext_50639](https://www.dreamwidth.org/users/ext_50639)** on Jan. 18, 2009 4:08 PM

Nice!

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 18, 2009 4:58 PM

I like that approach best. What other programming languages have you used?

---

**[ext_362568](https://www.dreamwidth.org/users/ext_362568)** on Jan. 18, 2009 6:36 PM

Most of them. Enough to be proficient? Recently enough to remember them? Just C and [lsl](http://wiki.secondlife.com/wiki/LSL_Portal).
