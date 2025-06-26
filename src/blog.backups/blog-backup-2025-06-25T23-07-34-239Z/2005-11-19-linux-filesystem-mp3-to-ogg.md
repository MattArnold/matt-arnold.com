---
layout: layouts/post.njk
title: Linux Filesystem; MP3 to OGG
date: 2005-11-19T21:22:00.000Z
tags:
  - operating system
  - os
  - open source
  - linux
original_url: 'https://nemorathwald.dreamwidth.org/97614.html'
userpic: ../userpics/_.jpg
---
I'm copying my MP3 collection from my Windows computer to my Linux computer. I'd like to have it all in OGG Vorbis format. For a while I had a program on Windows that changed them from one to the other, but it was shareware and expired. I tried installing a free open source program on Linux to do this but it's one of those programs that doesn't appear in the Applications menu. So it's apparently intended for use from the command line. Of course that would involve finding the executable in the filesystem first, I guess. In a command line interface you are walking through a subterranean network of perfectly dark tunnels. Instead of a flashlight or lantern, you are provided with an infinite supply of _camera flashbulbs_ called the ls command. I prefer searching the filesystem through the graphical browser. I figure at least I can find the darn executable, then I can go into the shell and start up the program. I have been informed that programs are found in the usr/bin directory, but all the executables there are named cryptically. As I go through clicking every one, nine tenths of them do nothing. Anyway, let me know any advice you might have, from any approach you desire.

## Comments

---

**[ext_177228](https://www.dreamwidth.org/users/ext_177228)** on Nov. 19, 2005 9:32 PM

Most executables will be found in /bin or /usr/bin. Some packages prefer to be in /opt... Slocate is your friend. The command "slocate ogg" will show you a detailed listing of every full pathname that contains "ogg". This is bad if you have a hundred songs in a directory named ogg, but excellent if you don't, and you want to find all executables with ogg in the name. Word of warning, though: slocate relies on a database of filesystem info. If you want slocate to find something recent, you need to run "slocate -u" to create a full database. Alternately, you can run "slocate -U " to make a database of just a particular directory (like slocate -U /usr/bin). I like to run slocate -u as a cron job that runs periodically while I'm sleeping, because it does take some time to complete if you have a lot of files. If you tell me the name of the app you are trying to run, I can make some educated guesses as to what the executable might be.

---

**[ext_525847](https://www.dreamwidth.org/users/ext_525847)** on Nov. 19, 2005 10:07 PM

Try reinstalling the share-ware? :)

---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on Nov. 19, 2005 10:23 PM

Why do you want them in OGG format? Converting from mp3 to OGG will involve another compression, degrading the sound. You might want to rip new tracks from CD in OGG format, if you really like the format, but why would you want to change existing mp3s to oggs? FWIW, if you think the program has "ogg" in its filename or path, the following incantation will find all files with "ogg" in the name or path without having to build a locate database... find / -name "\*ogg\*" -print But if it's a program than handles multiple file type conversions it probably doesn't have ogg in its name. This may take a while to run, which is why you create a locate database if you will be doing this often. Amy

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 20, 2005 12:56 AM

Since I don't care very much about degrading the sound, to switch just on principle would cost me very little compared to what it would cost an audiophile. Yes, I could get the same audio quality if I rip to OGG from CD, but putting in and taking out all my CDs would take more work than just pointing an application at the Music folder and saying "duplicate every subdirectory at this format." To say nothing of the work of _finding_ all my CDs in storage.

---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on (None)



---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on (None)



---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on (None)



---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on Nov. 20, 2005 12:37 AM

Here's another idea. If you think a man page containing the word "vorbis" was installed with this program, try this: First, make sure you're running the korn shell... _/bin/ksh_ Copy the following into the korn shell command line. If you're curious what this does I can explain. _for dir in \`echo $MANPATH | tr : ' '\` ; do grep -i vorbis $dir/\*/\* ; done_ If nothing happens it probably didn't find the word "vorbis" in any man pages. If that's the case, to make sure the search worked, look for something much more likely to be there, like the word "description". _for dir in \`echo $MANPATH | tr : ' '\` ; do grep -i description $dir/\*/\* ; done_ If that prints lots of results then the search probably worked. If not, then it probably didn't work. Then exit the korn shell: _exit_ Make sure the stuff in italics gets entered on a single command line. Ignore the post I deleted. It contained an error. Oh, yeah, one last thing. It's dangerous to "copy the following into the korn shell command line" if you don't know what "the following" does. You can trust me, though. Really :-)

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 20, 2005 2:43 AM

matt@p4:~$ /bin/ksh bash: /bin/ksh: No such file or directory matt@p4:~$ su /bin/ksh Unknown id: /bin/ksh

---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on Nov. 20, 2005 4:11 AM

It should work from bash, which is apparently your default shell. Forget the ksh parts. I suspect, though, that the next problem you're going to run into is you don't have a MANPATH defined. You can check that with echo $MANPATH and if it displays nothing then your man path is determined by a configuration file. There's a way to make that work, too, but... Someone below mentioned the command _apropos_, which I believe does the same thing, only simpler. Try this... apropos vorbis Apropos tends to spit out a lot of really nastily formatted stuff, so it may not be simpler afterall, but what it will likely display for _apropos vorbis_ is "vorbis: nothing appropriate". Amy

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 20, 2005 5:55 AM

"Man" stands for manual, right? _echo $MANPATH_ displays nothing, so the man path is determined by a configuration file. Is a man path the place where I can expect installtions to place manuals? _apropos vorbis_ does result in "vorbis: nothing appropriate".

---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on Nov. 20, 2005 1:48 PM

man is the command for viewing manual pages, which are an old, pre-html format for help documents. Try this: man man That gives you the man page for the command 'man'. In it you'll find a discussion of how the man command knows where to find man pages. Yours may be different than mine (I have Solaris and Mac OS X available to me, but not linux), but there should be a mention of MANPATH. Mine has a section called SEARCH PATH FOR MANUAL PAGES. Anyway, MANPATH is an environment variable. You can see all the environment variables you have set by typing 'env' at a shell prompt. Or, to view just the MANPATH environment variable, type 'echo $MANPATH'. If it is set (for you it apparently isn't) it looks something like this: /usr/share/man:/usr/local/share/man:/usr/man:/opt/solaris/man:/usr/X11R6/man That's just a list of directories separated by colons. The whole point of what I suggested doing was looking in all those directories for a file (i.e. a man page) that contains the word 'vorbis'. Since you don't have a MANPAGE environment variable, man is finding the path in its configuration file. The manpage for man should tell you where that is. It's probably something like /usr/share/misc/man.conf. I could give you another incantation which extracts the path from there, but the 'apropos' command probably does the same thing. My only reservation there is that the installation of your encoding program might have copied the manpage for itself to your system without adding it to the manpage database, hence my suggestion to look the brute-force way. Of course it may not have a manpage at all. However, since the whole point of this exercise was to find the encoding program, and you've done that another way, I think you are done with this branch. You can see if abcde installed a manpage like this: man abcde Amy

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Nov. 20, 2005 2:54 AM

The commands you're looking for are _apropos_, which searches the descriptions of programs in the manual database for the word you give it, _locate_, which searches the file index for a file of the name you provide, and _man_, to figure out how to use the program once you've found it.

---

**[ext_259916](https://www.dreamwidth.org/users/ext_259916)** on Nov. 20, 2005 3:06 AM

Your fear of the command line startles and confuses me, particularly given your love of Linux. I guess I'm an oldschooler - I gots to have my ASCII interface. -=ShoEboX=-

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 20, 2005 3:49 AM

I love free as in beer and free as in speech. Although I still promote Linux, it was for those reasons alone, long before I ever used it. My love for Linux never grew out of the Linux way of doing things. On the contrary, it's the penance I pay for freedom.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 20, 2005 6:34 AM

Let me rephrase and clarify. I am not saying that the "UNIX way" is a bad way, or that I will never grow to appreciate it over time. I'm saying that has no relevance to whether or not I use it since it's strictly ideological anyway. Linux needs a large number of users, in order to attract more of those programs which we constantly hear complaints about that they aren't on Linux yet. That would get more users, in a virtuous spiral. At the end of that process, underpriviledged people around the world have a decent operating system and corporations aren't telling us what to do. That's why I go out of my way to jump through hoops that I don't need to jump through. If I were just thinking of myself I'd stick strictly to Windows. I was never dissatisfied with my user experience under Windows or Mac. I still use both and do not intend to ever stop. In fact, only when I used Linux was I educated in the incredible acheivements of Microsoft and Apple resulting from their huge advantages of money and standardization. When I consider the disadvantages it's working under, I'm impressed that my user experience in Linux is as polished as it is. I'll continue to be part of it and help support its growth with bug reports. The positive side of this is that since my user experience has no relevance to supporting free and open source operating systems, no amount of sub-par experiences with it would turn me against the concept.

---

**[ext_25108](https://www.dreamwidth.org/users/ext_25108)** on Nov. 21, 2005 9:07 PM

And I'm perfectly happy with the command-line interface on my Mac. :)

---

**[ext_528985](https://www.dreamwidth.org/users/ext_528985)** on Nov. 20, 2005 3:23 AM

O.k., Matt. You and me are living at very similar levesl of understanding of Linux, so I think I can help in a couple of ways. First, go open up Synaptic, and find the package you installed. Right click on it, and choose properties. Select the Installed Files tab. That is the list of all the files that package created. Look for any Readme's for FAQ files. Read those. they should walk you through using that item from the command line. If not, look for anything installed in a Bin folder. Let me know if any of that helped. . . . And that is a perfect example of the blind leading the blind, for anyone interested.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 20, 2005 3:59 AM

Awesome! Now we're talking. matt@p4:~$ su matt /usr/bin/abcde Password: cd-discid: /dev/cdrom: CDROMREADTOCHDR: Input/output error abcde error: CD could not be read. Perhaps there's no CD in the drive? Apparently, this means it won't bring up a graphical user interface, and it won't read from files, only a CD. Then I tried: matt@p4:~$ su matt /usr/share/doc/abcde/FAQ.gz Password: bash: /usr/share/doc/abcde/FAQ.gz: Permission denied

---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on Nov. 20, 2005 4:26 AM

Abcde seems to be a command-line utility to rip CD audio tracks to OGG or MP3, and from that description it may not do the transcoding you want. Its website is [here](http://lly.org/~rcw/abcde/page/). A .gz file is a compressed file, not an executable. The installer likely unzipped it for you. Try this ls /usr/share/doc/abcde There's probably a file called FAQ or FAQ.somethingerother. If there's a .gz file but not an unzipped file, try this... gunzip /usr/share/doc/abcde/FAQ.gz You may or may not get permissions problems with that. Amy

---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on (None)



---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on (None)



---

**[ext_26598](https://www.dreamwidth.org/users/ext_26598)** on Nov. 20, 2005 2:02 PM

If abcde doesn't do what you're looking for, you'll find a discussion of transcoding MP3 to OGG [here](http://www.vorbis.com/faq/#transcode), including a link to some transcoders. Be aware of the dependencies for those scripts. In fact, abcde is itself just a script, and installing it may or may not have installed the actual executables it relies on (e.g. oggenc).

---

**Anonymous** on Dec. 29, 2005 4:08 AM

I have been informed that programs are found in the usr/bin directory, but all the executables there are named cryptically. As I go through clicking every one, nine tenths of them do nothing. Anyway, let me know any advice you might have, from any No! You don't want to be doing this. Very bad!

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Dec. 29, 2005 5:47 AM

So I have learned, Anonymous. Do you have an alternative?
