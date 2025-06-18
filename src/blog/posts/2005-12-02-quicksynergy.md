---
layout: layouts/post.njk
title: QuickSynergy
date: 2005-12-02T06:17:00.000Z
tags:
  - linux
  - computers
  - software
  - computer
  - os
original_url: 'https://nemorathwald.dreamwidth.org/99453.html'
userpic: ''
---
I usually just use Windows because it's too inconvenient and uncomfortable to reach across the desk to the keyboards and mice for Mac and Linux. Since I'm the perfect customer for a keyboard/mouse/monitor switch, I've wanted to run Synergy for a long time. This is a piece of software that hooks up multiple computers on the same desk so that you can roll your mouse off the edge of one screen and onto the one next to it. The keyboard operates whatever computer the mouse is on; and it lets you cut and paste from one computer to another. It runs on Windows, Mac and Linux, which happen to be the platforms connected to the three monitors on my desk. Up until now I haven't been able to get the Mac or Linux versions of the client software to work. Windows, as usual, had an auto-setup GUI version that Just Worked. But now there's [QuickSynergy](http://quicksynergy.sourceforge.net/), a set of graphical user interfaces for Synergy in Mac and Linux! Joy! Only one problem remains. I don't know enough about Linux to install it. Heck, I can't even upgrade to [FireFox 1.5](http://www.getfirefox.org)\-- the most essential piece of software on any system-- on Linux because it doesn't show up on the list in Synaptic Package Manager. Sure, there's a big friendly button on the webpage that says "Download FireFox 1.5 for Linux" but there's no installer program to click in that wad of data. I extracted the archive but I don't know what to do with it. Similarly, on the QuickSynergy page, I read the following: _Just follow the usual procedure: ./configure make make install_ The "usual procedure." Riiiiiiiiiiiiiiight. If you don't already know the secret password you're not allowed in the treehouse. The obstacle to Linux adoption is, for the most part, not in the operating system itself. Many developers of software for Linux don't expect any adopters. So they think what few people would be interested in a program they've made for Linux will already know what these instructions mean. Nevertheless, I am pleased as punch that as soon as one of my cool friends helps me install it, the QuickSynergy developers will have removed one more obstacle in my months-long quest to harness the power of three processors and massive screen real estate from one keyboard and mouse!

## Comments

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Dec. 2, 2005 11:41 AM

As much as you waste complaining about the damned "secret passwords", you could have learned it by now.

---

**Anonymous** on Dec. 2, 2005 2:28 PM

My goal is to not have to do so.

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Dec. 2, 2005 12:09 PM

here's the voodoo behind the hoodoo: At a command prompt (most likely as root) you cd to whatever directory you extracted the archive to. _./configure_ This script checks your system to make sure you have all the pre-requisites on it to compile the program completely. If it finds something that the compilation just can't do without, it will spit out an error, usually with the name of a library or program that it needs. Search for the name in Synaptic and install the file it needs. Usually, if it's asking for a library you need to install the -dev denoted package and if it's a program you can just get away installing the program. Once you've installed the packages re-run ./configure. Lather, rinse, repeat until it completes without any errors. _make_ This compiles the program. It will usually peg out your processor and run for a while. Go get a cup of hot cocoa. _make install_ This one copies the compiled program and all of its myriad files to the correct location (usually)

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Dec. 3, 2005 5:23 PM

OK, at the command prompt (while root) I was in the CD I extracted the archive to, which is tmp. I typed a dot, "./configure" and got this message: bash: ./configure: No such file or directory What did I do wrong?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Dec. 3, 2005 6:49 PM

OK, Aaron is here and he showed me what I did wrong. He still can't get it working though. It's 0.1, not even Alpha software. It turned out he needed to download make and a bunch of stuff for building software, and it turned into a huge mess. So far the combined Linux might of Aaron and Windows might of Bill Putt and (Chuck Child) still hasn't gotten it working.

---

**Anonymous** on Dec. 14, 2005 12:26 AM — *cooking*

let me guess - all the food in your home is pre-cooked - never read a recipe in your life

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Dec. 14, 2005 2:19 AM — *Re: cooking*

That is correct.
