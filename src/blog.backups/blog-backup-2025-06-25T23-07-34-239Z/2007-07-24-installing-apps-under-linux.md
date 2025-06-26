---
layout: layouts/post.njk
title: Installing Apps Under Linux
date: 2007-07-24T03:11:00.000Z
tags:
  - linux
original_url: 'https://nemorathwald.dreamwidth.org/179919.html'
userpic: ../userpics/_.jpg
---
Normally I avoid installing software under Linux unless it's in Synaptic Package Manager. Contrary to popular belief, this results in an extremely full-featured computing experience, since it's a rare application that is not found there. But from time to time I like to stretch myself and attempt to learn a bit of Linux usage that has flummoxed me in the past. When I found [version 7 of Inform](http://www.inform-fiction.org/I7/Welcome.html) has been released, and Synaptic Package Manager only has version 6 for Linux at this time, I was enticed to declare this to be a circumstance deserving of special treatment. I followed the instructions included in the download and after I remembered to type "sudo", it worked. It is running. I have installed a _tarball_ of an application under Linux, from the _command line_. Here's hoping it is seldom necessary, but now I know that I can generally get around that obstacle. Sadly, according to the README file,

> All it really does is generate a UUID for the project and invoke the appropriate compilers when asked. It is fervently hoped that, a Linux port having been released, that some enterprising soul or souls will provide an actual interface to it of the quality and feature set of the Mac OS X or Windows versions.

So I'll use the Windows version. Now, how do I uninstall an application under Linux? ;)

## Comments

---

**[ext_53192](https://www.dreamwidth.org/users/ext_53192)** on Jul. 24, 2007 5:15 AM

If you haven't gotten rid of the source directory, you can frequently "make uninstall". For simple programs, you can delete the installed program. For somewhat more complex programs, you can just delete the installed programs, once you identify what they all are (frequently by looking at the "see also" in its man page if you don't know what files belong to it). For even more complex programs, there may be libraries or other directories as well. But everything will probably be in /usr/local/.

---

**Anonymous** on Jul. 24, 2007 1:04 PM

Thanks. Since it's installed under /usr/local/bin , I don't have permissions to trash it from the graphical file browser in Gnome. So I'll have to use sudo on the command line. Now I've looked up the rm command, so that is another thing I've learned.

---

**[ext_344389](https://www.dreamwidth.org/users/ext_344389)** on Jul. 25, 2007 9:31 PM

This is one of the things that keeps me away from Linux.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jul. 25, 2007 9:53 PM

What is? I have a complete computing experience with the thousands of programs available through Synaptic Package Manager. Nothing is easier than Synaptic-- it's even easier than Windows. I had to use a command line to install one program, which was an unnecessary bell/whistle anyway. It came with instructions for doing so, which consisted of one step, and was successful. I recommend Ubuntu Linux to desktop users who want to avoid the command line.

---

**[ext_344389](https://www.dreamwidth.org/users/ext_344389)** on Jul. 26, 2007 2:06 AM

Maybe I misunderstood your post. The impression you gave me was there was a problem installing a program. The problems I have with Linux are: \*Too many different flavors. \*No stability in development. \*No guarantees about backward compatibility. \*No tech support available. \*No time to learn how to reinvent the wheel. \*Bastard software I am forced to use that runs on Windows only. These things do pain me. Nothing would please me more then to give Bill Gates and Co. the big good bye kiss. I can tell you that if XP falls of the market, my next computer will either be a Linux machine or an Apple.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jul. 26, 2007 2:09 PM

In the end, the only reason I used the Windows and Mac versions of Inform 7 was that the guy who made the Linux version only did it half-baked and didn't include most of the features. But the operating system itself is not to blame for this, the InForm 7 team is. I've had the same thing happen to me on Windows, especially with a program as niche and obscure (although a VERY COOL obscure niche) as this Interactive Text Adventure creating program, Inform. Linux even had InForm version 6 of the program available in Synaptic Package Manager! This installs it in a single click with no command line. I went to some trouble on the command line because I was impatient. I wanted the super-special latest and greatest so early, it hadn't even been put in Synaptic yet. I have had the same problems you had. I started using Linux about three years ago, and I've been watching the situation grow during that time for people like you and me. I can tell you, it's ready for you now. \*Never mind all the different flavors for different kinds of users. The one flavor for regular end users like you and me is Ubuntu. Did you know its growing popularity recently surpassed all other Linux versions combined? \*The Ubuntu team has amazing stability in development, releasing every six months. \*I haven't had anything that I needed it to be backward-compatible to so far. Most of the time some hacker has completely replaced an old incompatible program with a completely new and better one. \*Ubuntu volunteer tech support is publicly renowned for being awesome. I read another article about this every few months. Plus, you can pay for support from Canonical. \*The point-and-click graphical user interface is not that much different from Windows or Mac. You can even tell the KDE environment which one you're used to and it'll imitate what you expect! \*The one sticking point is Windows-only software which your employer says you have to use. There are Linux alternatives to just about anything (Seriously! Try and stump Synaptic Package Manager!), but employers don't care about it if it's not the same brand name.

---

**[ext_344389](https://www.dreamwidth.org/users/ext_344389)** on Jul. 26, 2007 2:30 PM

When the time comes, I'll be calling you.

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Jul. 29, 2007 12:58 PM

Having played a little with version 6 and 7 of Inform, you probably want to use version 6. Version 6 uses a typical programmer's language as it's input; 7 uses a rather cute English natural language input that's exceptionally frustrating to debug. The README is telling you that, on Linux, you don't have the integrated development environment that Mac and Windows have. On my Mac, I get an editor with syntax highlighting & indenting, a "compiler" that builds the game files, and a part for playing and checking for changes in the game. Overall, I sort of liked version 7 syntax, but it was difficult to debug. When you make an error, it's very nebulous about telling you \*where\* the error was. And I never got a feel for the syntax, aside from trial and error until it worked as I wanted. Have you seen examples of both code, or would you like to see some?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jul. 29, 2007 4:10 PM

I have not, and yes I would! Will I see you at the Lojban User Group meeting at my house this afternoon?

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Jul. 29, 2007 5:22 PM

Here's a link to The Cloak of Darkness -- it's a simple game that was written in several different languages to show the differences between them. Click on Source at the top (the site uses frames, or I'd just send you the right url...) If you mouse over certain words in the code (they show up purple on my browser) it has comments about them too. No, I'm not going to be at the Lojban User Group meeting. It gets a little difficult to get away now that I'm living back at home for the summer.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Aug. 1, 2007 7:11 PM

Oops, the link isn't there.

---

**[ext_2143950](https://www.dreamwidth.org/users/ext_2143950)** on Aug. 1, 2007 9:41 PM

d'oh! http://www.firthworks.com/roger/cloak/inform/index.html
