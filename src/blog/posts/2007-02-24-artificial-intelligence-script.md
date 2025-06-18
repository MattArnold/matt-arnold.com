---
layout: layouts/post.njk
title: Artificial Intelligence Script
date: 2007-02-24T19:53:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/161720.html'
userpic: ../userpics/_.jpg
---
1\. Will I see many of you at [wrap-up meeting](http://www.google.com/calendar/event?eid=bWgzanB2NTM0YW02cmx2OTk4bHRka2JkZHMgOTY5dGNicmt1bzBlbWVrbGVtbW5ka2VxZ2tAZw&ctz=America/New_York) tonight for [ConFusion](http://stilyagi.org/cons/2007/)? 2. I have a [color-coded decision tree for artificial intelligence](http://docs.google.com/Doc?id=dg5wbmjw_33d9k2ng). To my surprise, says I've already done 90% of the work of programming right there in that document. What's left is to put it into syntax and formatting so that it's script code for our game. I like [this interactive online Ruby tutorial](http://tryruby.hobix.com/) and [this somewhat-less-interactive online Python tutorial](http://www.mired.org/home/mwm/try_python/), but when do I get to the part about "IF this, THEN do this, ELSE do this"? If I were being taught that, I would know precisely what application I am going to immediately put it to. I don't want to write a program, I want to write a script. The Multi User Dungeon Object Oriented can take such scripts in Perl, Python, and Ruby. The tutorial doesn't know I need knowledge _specifically_ for scripting. So it's teaching me many other things which serve unspecified purposes in terms of scripting: such as the different forms data can come in. Ordered lists, strings of text, numbers to which arithmetic can be applied, and so forth. This feels similar to the feeling I always got in math class: I don't know any uses to which I am ever going to put the content, and so my attention drifts out the window. I know from experience that I eventually find out the use for such knowledge, and when that happens, I always wish I had maintained focus in class. In fact these specific things are almost certainly going to be used for something in my script. But it would be easier to retain the knowledge if it were taught to me in the context in which I am going to use it.

## Comments

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Feb. 24, 2007 9:36 PM

I don't want to write a program, I want to write a script. For Python and Ruby purposes, those are the same thing. All a program ever really does is script a set of actions to take against data X with conditions Y. As for your decision trees and attribute tables, those are a hell of a lot better than some "professional" specifications I've seen. You'd probably do really well doing business-IT analysis, writing specs for people to turn into code. Really impressive. And for tutorial purposes, it's handing you the building blocks. So if you know what a list or a hash or an array is, you can start to see if one of those will fit the particular section of your script. It's a matter of seeing what parts, put together, will generate the actions you want to take. So, if it's a matter of finding applications, just know that such things are there, and when it comes time to figuring it out, go back through a handy language reference and see if there's a data type or storage method that'll work for the kind of information you'd want to store.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 25, 2007 1:48 AM

I would disagree with lumping scripting and programming so casually. The blurring of the technical distinction between a script (interpreted on the fly) and a program (compiled ahead of time) has blurred the utilitarian differences: Scripting is short and sweet, and does one thing in a rough way. It's usually fully procedural, largely self-encapsulated, and not deeply architected. It's often used as a glue between software packages, and is often the province of a system administrator, DBA, and other non-dedicated programmers. Programming is large, integrated, and with layers of internal architecture. It is usually object oriented or functionally structured, although enough polymorphism techniques occur in procedural language to make it possible there. It's usually the province of the dedicated programmer. The problem is that scripters often don't know (or care) about the deeper issues involved in programming. The convergence of their underlying disciplines, and the fundamental problems management has in understanding the work of programmers, means that a lot of bad programming gets done by folks who should only be scripting (at best). I would applaud Matt's effort, therefore, to make obvious the work he _doesn't_ feel comfortable doing . . .

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Feb. 25, 2007 3:03 AM

Oh, yay, I get quoted chapter and verse! I would disagree with lumping scripting and programming so casually. I would disagree with your reading comprehension, as you decided to plunge into giving me a lecture. I was speaking specifically in the context of Python and Ruby, where programs are really just scripts with embellishments. For that matter, all programs are scripts with embellishments and structure. They do a certain set of instructions, based on events and a set of input data. ...and is often the province of a system administrator, DBA, and other non-dedicated programmers. At least you've made your biases clear at this point, which is useful. Programming is large, integrated, and with layers of internal architecture. So, then, would the source code for "ls" or "cat" be merely scripting? It's not terribly deep, is it? ...It is usually object oriented or functionally structured,h although enough polymorphism techniques occur in procedural language to make it possible there. Only until the next fad comes along. Then no other programming will be Real Programming. Polymorphism, though a fun buzzword, does not make a program. Object orientation does not make a program. Again, \*thanks\* for the CS lesson here, I shouldn't have spent the money on all of those college courses when I could have just asked you! It's usually the province of the dedicated programmer. I'd disagree. Quite a bit of the most god-awful, unstructured, everything-looks-like-a-nail code that I've read was from "dedicated programmers" bent on implementing the CS fad of the decade. The problem is that scripters often don't know (or care) about the deeper issues involved in programming. The convergence of their underlying disciplines, and the fundamental problems management has in understanding the work of programmers, means that a lot of bad programming gets done by folks who should only be scripting (at best). Yes. The village elders \*should\* leave the priesthood alone. Only priests can understand the work of other priests. The laypeople shouldn't enter that back room of the temple! It is verboten! Frankly, you're coming off just a bit condescending here. Sorry if I managed to insult your mighty profession by lumping you in with mere DBAs, sysadmins and other non-dedicated programmers. I would applaud Matt's effort, therefore, to make obvious the work he doesn't feel comfortable doing . . . You assume that I'm attempting to denigrate him. This is not the case, but you wouldn't see that from your high horse. Frankly, and as I said, he's done a heck of a lot of really good work so far. I'd also say that he's identified the areas that are going to be problematic and is aware of what he'll have to put into context later. That shows a lot of good traits that would make a good PM, analyst, or dare I say, programmer? But we couldn't have that, could we?

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on (None)



---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 25, 2007 8:38 PM

_You assume that I'm attempting to denigrate him._ And you assume far more, enough so that I don't care to try refuting any of it. I've argued with asshats on the internet before; it's gotten kinda old. Have fun with your moral victory.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 25, 2007 10:23 PM

Actually, I take that back. I didn't want to get into a tangental argument on Matt's journal, but his tagline kinda encourages it, so here goes:

> ### Assumption #1: I'm an ivory tower programmer
> 
> _quoted chapter and verse! At least you've made your biases clear at this point The laypeople shouldn't enter that back room of the temple!_ I'm a system administrator. I like to program, and am working to get back into it, but 90% of what I've done with code thus far has been scripting, not programming. There is no chapter and verse here, no temple that laypeople shouldn't enter. What I know of this industry, I did not learn in school, but on my own and on the job.
> 
> ### Assumption #2: I think programmers are better.
> 
> _Quite a bit of the most god-awful, unstructured, everything-looks-like-a-nail code that I've read was from "dedicated programmers" bent on implementing the CS fad of the decade. Frankly, you're coming off just a bit condescending here. Sorry if I managed to insult your mighty profession by lumping you in with mere DBAs, sysadmins and other non-dedicated programmers._ I was talking about a particular misunderstandings; I was not summing up the ills of the industry. I know dedicated programmers can be responsible for horrid hacks, often because they treat the system as a ideal Turing machine, instead of real (limited) hardware. I deal with that type of problem all day long; I just wasn't talking about it here.
> 
> ### Assumption #3: This is a cock-waving match
> 
> _You assume that I'm attempting to denigrate him. That shows a lot of good traits that would make a good PM, analyst, or dare I say, programmer?_ You assume I was defending against some sort of attack. The entire point of what I said was "There are still real world differences between programming and scripting, despite the blurring of functional differences; I'm glad Matt can see it, and I'd like to add some clarity to that distinction." You also assume that I'm attacking scripting. Scripting has it's place, just as most gas stations can do an oil change. I don't go to a scripter for a program, and I don't go to a gas station for a transmission overhall; that doesn't mean I think they're somehow less valuable.

No, I don't think everybody should program. Yes, I think Matt is one of the people that could do a good job of it. But the important thing is focus: Matt doesn't want to focus on the architectural minutia that keeps a program from being just a large and unwieldy bag of scripts. That was the distinction I was making.

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Feb. 25, 2007 11:01 PM

Assumption #1: I'm an ivory tower programmer Sorry, that's the way you came off when you proceeded to give me a CS101 lecture. Assumption #2: I think programmers are better. Your tone and your writing directly implied that. Assumption #3: This is a cock-waving match Nope. Never thought that, and wasn't trying to out-credential you. You also assume that I'm thinking you're attacking scripting. I'm not. But that's okay, disagreement is the spice of life.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 25, 2007 11:38 PM

You also assume that I'm thinking you're attacking scripting. I'm not. This stands in direct contradiction to the two statements proceeding it. If you didn't think I was attacking scripting or scripters (as "less worthy") then why the blinkering hell were you sniping at me? **What point were you trying to prove?**

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Feb. 26, 2007 2:28 AM

I was sniping at you because you came off as rather condescending. You then proceeded to lecture me as if I knew nothing (which you could not have known). The tone that you took was insulting.

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Feb. 26, 2007 2:30 AM

Gah, that wording of the prior comment was awkward and easily misinterpreted. I meant to say that you both were condescending and proceeded to lecture me as if I knew nothing about the field.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 2:58 AM

Ah, so you were intending to prove I'm an ass? Admitted. This is the internet. Learn not to take it personally. Next time, prove your detractor wrong. That usually looks less . . . unprofessional . . . than flailing at the fact that you've been contradicted.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Feb. 25, 2007 4:15 PM

I could have been more accurate and said "I don't currently want to write a standalone app. I want to write a piece of code that plugs into the core system my team is coding." Granted, "script" was a poor way to say this. But I have heard what you're saying often enough to tend to see "programming" as "stuff that involves managing registers, memory addresses, and call stacks" (i.e. not the high-level languages) and "scripting" as "stuff an online gamer can plug into his or her second character to make the admins think she's at the keyboard and it is not a gold farmer". I tend to see scripting as automation. Shortcuts. A lot can be accomplished without necessarily knowing what's going on inside the computer, and terms like "script kiddies" reflect this. So my view was formed by seeing a lot of public sentiment.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 25, 2007 8:40 PM

That's more or less exactly what I meant. Scripting involves a subset of programming, intentionally.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 3:24 PM

The only differences between programming and scripting are scope and size. A script is a program. End of story. If you aren't comfortable with that simple truth, I don't know what else I can tell you.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 3:38 PM

In the same manner that the only differences between a hut and a skyscraper are matters of scope and size. If you're not comfortable with truths that aren't as simplistic, I know exactly what to tell you: do my job for a while, _then_ tell me the distinction is pointless.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 3:45 PM

Umm, I've done your job (if your above description is accurate). I've also developed software for years. If you're going to compare the difference between scripting and software to that between a hut and a skyscraper, I'd imagine I could probably be doing your exact job when they can you soon.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 4:04 PM

The difference is: architecture. You don't need an architect to build a hut. You do for a skyscraper. As for the pitiful jab: job security is the least of my worries. No, its the work of people who don't know the differences between programming and scripting (ie - planning ahead, config files, polymorphism, etc. ad nausem) that plagues my days. And ensures that I will _never_ be out of work, which in a way makes me glad you're around. I also find your claim that you've done my job laughable. If you did my job, you wouldn't have time for school, nor need for it. I'll allow, at best, that you've done something that had the same name. Are we done, yet? Or do you want to really get into a nasty pissing match with me, college boy? Because I've got a lot of irritation, and I'm not allowed to channel it at the asshat (at my work) who inspired my original rant, and boy howdy if you don't look like an acceptable alternative. So, please: flex those IT muscles, tell me how much more you know than me. Give me a good reason.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on (None)



---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 4:30 PM

You know, I wrote another, much more wrath-filled response, but then it occurred to me: It's a waste of time. You are one of those self-important "programmers". You probably always will be. Some people need to make what they do seem more difficult or impressive than it is to feel important. There's no point in trying to explain simple concepts to a buzzword flinging pseudo-coder. The fact that I was, to varying degrees, proficient in basic, ada, fortran, pascal, jcl, cobol, lisp, prolog, and sql by the time I graduated high school didn't make me a great programmer. Hell, the ensuing decade and change hasn't made me a great programmer either... But the fact that I'm not a self-aggrandizing child with delusions of adequacy has made me a sought after commodity for most of my programming life. When I stepped out of the business so that I could do something I \*really\* enjoy... teach... I did so knowing that I would be cutting my pay to around 20% or less of its former glory. I knew that I'd be welcoming poorness into my life for a number of years to do what I want to do. When you grow up, you can too. In the meantime, feel free to invoke whatever lofty degree of knowledge you think you can leverage from your ivory tower of mediocrity, and realize that anyone with the vaguest understanding of software design is laughing at your pitiable attempts to make what you do seem important. Oh, and [clearly I'm not the only one who thinks you do so](http://temujin9.livejournal.com/109385.html)

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 4:42 PM

Yeah, read the initial flame, and this explanation too. Still not convinced. I've met a lot of "elders" who didn't know shit. You've proven only that you know enough to be dangerous, and that you intend to pass this level of knowledge on. You've yet to even address my assertion: "There is a very real gulf between scripting and programming, as practiced in the real world by real people. Not knowing the difference causes a lot of problems." So . . . way to start the teaching career. I'm sure your students will love the "ignore the disagreement, insult the source" technique. Probably ranks right up there with Socrates and Plato.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 4:54 PM

Yes, because you haven't been throwing the ad hominems out left and right, I opted, instead, to respond in kind. Yes, there is a gulf between scripting and programming. But they are essentially the same thing. A hut and a skyscraper (to use your false metaphor\*) are both buildings. Saying one is more complicated than the other is... amusingly... exactly what I've been saying. Let me try again: Programming and scripting are the same thing. They differ only in size and scope. Now, since reading comprehension is not something you appear to have strength in, let me help you out. \*\*Programming and scripting are the same thing. Programming is merely the listing, in a very specific way, of a set of tasks that tell a computer how to achieve a desired goal. Scripting is the same. If I write a batch file who's sole purpose is to take the output of an ls -als and add it to a file, that is no less a program than the operating system itself. They are both a set of tasks. \*\*They differ only in size The magnitude of a thing. So one difference is the magnitude of the "program" or "script". Of course, there are no hard and fast rules related to this, so there are grey areas where it is almost impossible to determine whether something is a "program" or a "script". Informed programmers don't even bother trying. \*\*and scope. The boundaries of the ending system. This is similar to size, save for the fact that the scope refers to the size of the "problem" the program should be responding to. Typically, programs take on larger problems, scripts, smaller. This is not always the case. So, umm... yeah, I fail to see this wide, sweeping difference here. The software designer who writes sql scripts to populate an Excel spreadsheet with data from an Oracle database is no less a programmer than one who creates some game. Of course, game designers and OS programmers like to sound important, since they essentially make games for a living, so they try to make programming sound more important than it is. It's not. It's a matter of size and scope. Programming and scripting are the same thing, with differences only in size. \*Perhaps a more apt metaphor would be comparing the "gulf" between programming and scripting to the "gulf" between writing magazine articles and writing novels. They're the same thing, marked in difference only by size.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 5:23 PM

You're confusing the academic differences between scripting and coding with the real-world differences. Academically, they are identical; it's just a matter of invocation method that separates them. But in the real world, scripts are not generally well planned out. Their configuration is often inline. They are usually entirely self-contained, rather than modularized (oooh, buzzword, be afraid). They are written without a general concern for reuse. When somebody who programs that way tries to write an actual _program_, they usually fail in pretty predicable ways (and then I often get called in). The type of programming that is used in scripting doesn't scale. It can't handle large scope. By the inverse, the type of programming suited for large programs is completely unweildy for, say, listing the contents of a directory to file. No need to consider config files and the like when a simple "ls -al > filename" will do.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 5:31 PM

But you aren't describing programs and scripts here. You're describing a specific subset of scripts (poorly written, quick, jot-off scripts) as compared to a specific subset of programs (lengthy, involved programs). That is disingenuous, and further promotes your false metaphor. There are very lengthy, involved scripts. There are very small, simple programs. I can say, with absolute certainty (having managed such projects) that I could write simple game in VB in a much quicker fashion than a long, involved SQL script for an Oracle data pull. Further, the arbitrary distinction of "uses config files" for the difference between scripts and programs is inaccurate, at best. I've only been in academia for a year. I've been doing this in the real world for, umm, 12? 14? somewhere in there? I know how it happens in real life. I've been managing massive software design projects for about half of that time. While there are differences, to say that they're not the same beast is, quite simply, incorrect.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 6:12 PM

So, in other words, you're still niggling to death my word usage, on the basis that it doesn't fit your terminology. Despite the fact that I defined my terms several times, and pointed out several times that I did not mean scripting as "code written in an interpreted language" but "code written with a minimum of attention to architectural concerns". Fine. You've won the semantic contest. For what little is left of this thread, I'll refer to it as "non-architected coding", rather than get your panties in a twist because you can't make the translation yourself. And yes, you've made the fact that you've been in this field as long as I have painfully obvious. I'm proud of you. I'm even happier you're leaving for teaching. Your students will at least have the chance to improve on the understanding you impart; a chance you sadly seem to lack, because your knowledge is already perfect.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 6:15 PM

Umm... You deliberately misuse a term, then call the people that correct your misusage for arguing semantics? Crazy. Yes, clearly you have nothing to learn, and I'm the one with the superiority complex. Well done.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 6:34 PM

I defined my terms when I first used them, and then when took issue with them. If you disagree with those definitions, fine, but don't state the disagreement as "yer wrong". I assumed you'd read what I wrote, and were disagreeing with my _point_. Yes, clearly you have nothing to learn, and I'm the one with the superiority complex. Well done. Clever inversion of what I said. I do have plenty left to learn . . . just not from you. And of course I've got a superiority complex. Call it whatever you will; there's a lot of code written by folks who don't know how to string code together. I used to wonder if I knew anything about programming; long experience has instead taught me to wonder if anyone else does. I've seen plenty of good explanations for how and why to architect correctly, and precious few examples. You can't be any good in this field and not be a little superior; there's just that much bad . . .

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 7:37 PM

"Clever inversion of what I said." What can I say, I'm a clever guy... "You can't be any good in this field and not be a little superior; there's just that much bad . . ." Certainly true, but most disguise it a little better... it makes it more tolerable when you inevitably fuck something up miserably... less people standing around looking for blood.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 26, 2007 4:55 PM

And I'm cutting the extra flames, rather than send them. Matt, sorry to do this in your journal. If you want to continue this, there's [a thread ready and waiting for you](http://temujin9.livejournal.com/109963.html).

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Feb. 25, 2007 3:44 PM

I know which info I currently need, with which to put the pieces together in my mind. [Mooix](http://mooix.net/) is our multi-user-dungeon software. So I need to find out what form the data will come in and what form it needs the script to output. For instance, my script can have the monster look at the room to determine the conditions of its decision. What data does the script receive from that? Just a string of the text that the software would show a player who types "look"? Or something more structured, full of system statistics? It's a shame that the Mooix project website appears to be b0rked from years of neglect and is full of dead links to its own internal documents. I'll have to get the info from or . I'm not sure how they obtained it. Probably man pages.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 4:39 PM

Link is emailed to you.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Feb. 25, 2007 1:36 AM

I tend to avoid tutorials for exactly that reason. Navigating the raw documentation is a little harder, but usually more productive. Docco generally assumes some basic literacy in the field (programming, here), which may trip you up. Tutorials tend to do the opposite, wasting so much time on "fundamentals" that you loose interest if you're not the type that needs to be lead by the hand to learn.

---

**[ext_119844](https://www.dreamwidth.org/users/ext_119844)** on Feb. 25, 2007 9:45 AM

You want to read [this.](http://mrs-sweetpeach.livejournal.com/59000.html)

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Feb. 26, 2007 3:28 PM

I'm going to do my best to ignore the (largely uninformed) flamewar above... although it's SO BLOODY TEMPTING. Tutorials can be very nice, but I've often found that they tend to be needlessly pedantic in strange places, and not informative enough in others. In all honesty, a basic intro-book has always been the safest bet, followed immediately by searching for information online; at least for the beginner. That way, you can flip from section to section to find out how you want to do the things you need to do. That having been said, a caveat follows: understand that basic intro stuff that the tutorial is trying to teach you. Data types and such are not trivial, and will completely destroy the functionality of your code. I cannot count the number of projects that I spent hours upon hours debugging because data types were treated with a minimum of concern. The intro stuff is the intro stuff for a reason. :)
