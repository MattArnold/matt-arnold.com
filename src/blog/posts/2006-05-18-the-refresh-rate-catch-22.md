---
layout: layouts/post.njk
title: The Refresh Rate Catch-22
date: 2006-05-18T17:45:00.000Z
tags:
  - software
  - os
  - linux
  - computer
original_url: 'https://nemorathwald.dreamwidth.org/123270.html'
userpic: ../userpics/Matt_4.jpg
---
My Linux box is still set up to the resolution or refresh rate of that monitor which burned out last week. On every other monitor I use it with, it looks fine through the booting phase showing the Ubuntu logo above a scrolling list of things that are happening. But just when it is about to get to the desktop, the image shuts off and is replaced with the words "OUT OF SYNC". I already tried booting from a Live CD. I have several dozen of direct-from-Canonical officially-stamped [Ubuntu](http://www.ubuntu.com/) Breezy Badger live CDs. They each initialize an install process which insists that the CD lacks files that it needs. The Lojbanists in [our web-based chat room](http://www.lojban.org/irc/) told me I need to alter my config file. I don't know how to get a command line though. They suggested I try to SSH into the computer from another computer. This is a process that I don't know, and I don't know the IP address of the machine. Someone suggested that pressing CTRL-ALT-F1 during the bootup process might give me a command line. If that works, I could type "vi /etc/X11/xorg.conf" and I would be editing my config file. Then I would just have to figure out what part sets the resolution or refresh rate, and figure out what to change it to through trial and error. I think I'll erase my hard drive and reinstall Ubuntu. It sounds easier. I probably won't lose much, because 90% of the data on my Ubuntu machine also resides online, or was copied from my Windows box to begin with.

## Comments

---

**[ext_362572](https://www.dreamwidth.org/users/ext_362572)** on May. 18, 2006 6:25 PM

It would be a good exercise to dink with the config file first. Now I set things up so my linux systems boot to CLI so this is never an issue. You can download puTTY onto your winbox to ssh into your ubuntu box. You'll have to check the lan router for your system's IP address (assigned by DHCP, so it may change from boot to boot). And your fall back position is a reload.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on May. 18, 2006 6:28 PM

I have puTTY on Windows. Never used it, though, so it will require dinking with. I'm not sure how to get the IP address from the LAN.

---

**[ext_362572](https://www.dreamwidth.org/users/ext_362572)** on May. 18, 2006 7:13 PM

Putty is self explanatory. Very easy to use. For what your IP address is, go into the the management interface on the router (probably http://192.168.1.1) and your address is probably going to be in the range of 192.168.1.2 to 192.168.1.20 Worst case is you try ssh'ing every ip address from 192.168.1.2 to 192.168.255

---

**[ext_119844](https://www.dreamwidth.org/users/ext_119844)** on May. 18, 2006 10:21 PM

IP addresses at home are assigned by a DHCP server (aka, the LinkSys router). I can get into the router and see which IP addresses are currently assigned, and therefore we can figure out what your IP address is. It can change each time the box is booted, depending on how many computers are currently running in the house.

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on May. 18, 2006 9:34 PM

That's not the only one way to do it. A good way mind you, but only one out of a few ways, and not necessarily the easiest way. I was thinking you could go into single-user mode, but since you use Ubuntu and there isn't a root account that won't get you very far. Try the CTRL-ALT-F1 thing, but wait until X starts (about 2 or 3 minutes after your monitor goes blank.) This will send you to a console where you can login and type 'sudo dpkg-reconfigure xserver-xorg' and breeze through the setup process.
