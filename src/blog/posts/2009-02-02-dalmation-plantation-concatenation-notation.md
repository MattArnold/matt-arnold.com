---
layout: layouts/post.njk
title: Dalmation Plantation Concatenation Notation
date: 2009-02-02T02:14:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/263989.html'
userpic: ''
---
I and are sitting in Espresso Royale practicing programming in Ruby. We did the same exercise for making singular and plural sentences. When I looked at the way she did it in her version, I didn't recognize what the hash sign followed by curly braces is supposed to do. She explained it for a while. I summarized. ![](http://lh5.ggpht.com/_ENXtTKU9j1A/SYZeFWep2FI/AAAAAAAAGOc/eM5wW2KmrUI/s400/concatenationdalmations.gif)"So it's a concatenation notation." "Yeah." "For a dalmation plantation." "It'll be a sensation!" **Breaking out into song**

> A concatenation notation, Where our population can roam If this new location Our whole aggregation Will love our plantation home!

Then she made new code to demonstrate how it works in terms I would understand:

#!/usr/bin/ruby

def pluralize(unit, quantity)

if quantity == 1 then

return "#{quantity} #{unit}"

else

return "#{quantity} #{unit}s"

end

end

print "Concatenation for the Dalmation Plantation: ", \\

pluralize("Dalmation", 101),"\\n"

Output:

Concatenation for the Dalmation Plantation: 101 Dalmations

## Comments

---

**[ext_364011](https://www.dreamwidth.org/users/ext_364011)** on Feb. 2, 2009 7:37 AM

You didn't ask me, but if you did I'd tell you about an invaluable software engineering axiom called DRY ([Don't Repeat Yourself](http://c2.com/cgi/wiki?DontRepeatYourself)). The premise is that if something occurs twice in code, that's twice you have to remember to keep it updated when something changes. And by golly, it'll change. In this instance, observe how many times the format string appears in your function, versus in mine. I also changed the argument order because code is poetry, it should read as you would speak it: `pluralize 101 dalmations`. This is known as the [Principle of Least Surprise](http://c2.com/cgi/wiki?PrincipleOfLeastSurprise) because one day, maybe tomorrow, you're going to forget which way you defined those arguments ... was it dog then number? number then dog?

def pluralize(quantity, unit)

unit\_suffix = ""

if 0 == quantity or 1 < quantity then

unit\_suffix = "s"

end

return "#{quantity} #{unit}#{unit\_suffix}"

end

It's never too early to start forming good habits.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Feb. 2, 2009 3:46 PM

Thanks! Is there a bit of advice on programming style, concerning why 0 should come before the = and quantity comes after? Is there a reason to avoid "if quantity != 1"? However, both pieces of code expect a positive number and make no provision for negative numbers. Why is "0== quantity or 1 < quantity" more helpful?

---

**[ext_364011](https://www.dreamwidth.org/users/ext_364011)** on Feb. 2, 2009 7:02 PM

concerning why 0 should come before the = and quantity comes after? That particular one is not style as much as safety. In a lot of languages, the difference between equality tests and assignment is one character ("==" vs. "="). Since most of those languages don't allow expressions to be assigned values, putting the constant on the left will make that kind of error a compilation one, not a runtime one. The general answer (in the absence as any safety issues) is to strive for the expression to read well. There is a famous web designer who's thesis is "don't make me think" and (as weird as it sounds) it applies in programming, too. The less bandwidth taken up by your mind parsing the programming language, the more cycles that are available to solve problems. Is there a reason to avoid "if quantity != 1"? Yeah, you caught me there. :-) I realized after I posted (ain't that always the way?) that in English -1 is read as plural, so you're right, only the 1 quantity is special. In light of that, I would invert the test and have the majority of quantities be plural and 1 be the exception.
