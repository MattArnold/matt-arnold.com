---
layout: layouts/post.njk
title: Only One Computer Still Working. Correction. Two.
date: 2008-04-16T21:48:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/214166.html'
userpic: ../userpics/I'm_losin'_it.jpg
---
**Edited to add: In order to keep clear in my head which computers you're offering advice about, it's probably a good idea for me to label the references below to indicate the four computers.** Now in addition to my Linux computer **(A)**, the one that is running Windows **(B)** is not working either. That leaves only the old graphite G4 Mac **(C)**. The Windows computer (an Athlon XP 1700+) **(B)** gets to the "Press DEL to enter SETUP" phase of bootup, and freezes there. I cleaned the dust from the heat sink of the Linux computer (an Intel Pentium 4) **(A)**. Now I no longer hear it spin up and spin down, up and down, up and down. The fans run continually. But it still doesn't beep or put anything on the screen at all. I think it can use some replacement thermal paste on the processor, but I have none. I tried hooking up the computer that I got from the trash a few months ago **(D)**, on which I installed Linux.

The screen says:

> FastTrak100 (tm) "Speed" BIOS Version 1.31 (Build 22)
> 
> (c) 1995-200 Promise Technology, Inc. All rights reserved.
> 
> Scanning IDE drives .................................................
> 
> Warning - FastTrak does not detect proper interrupts,
> 
> Please check your PCI IRQ setup, and make sure the PCI slot 
> 
> support Bus Master operations

At least I _thought_ I had installed Linux on it **(D)**, but I don't know how that could have worked if it can't detect the hard drive and isn't booting from the Feisty Fawn release of [Ubuntu Linux](http://ubuntulinux.com/) which in the CD drive. Correction! Now it **(D)** boots to Ubuntu from the CD! Thank you, "Live CD"!

## Comments

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Apr. 16, 2008 10:14 PM

A BIOS error like that probably means failed hardware: it sounds like the motherboard is bad (specifically the IDE channel, which handles your hard drive).

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Apr. 16, 2008 10:39 PM

Hmmm, curious. Does the system use a separate IDE card? The next thing I'd check is the BIOS battery at this point. Actually can you get into the BIOS? Is the time set?

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Apr. 16, 2008 11:02 PM

And if there's an IDE card, check it for the battery also.

---

**[ext_53192](https://www.dreamwidth.org/users/ext_53192)** on Apr. 16, 2008 11:59 PM

For (A), try a different power supply. It's possible that the P4 has overheated and burned itself out, but they're supposed to protect themselves against that. Also try with just about everything removed from the motherboard, including video card and RAM. Some motherboards will beep if there's no RAM, some won't. All will beep if there's no video card, though.

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Apr. 17, 2008 1:35 AM

My current guess, which I hinted at earlier is that the hard drive is plugged into the external IDE card, no? and the CD-ROM is connected to the motherboard's IDE. Just a guess, and only on the minimal information provided. Now as to the cause of the failure, there can be many reasons and tests with the actual hardware would work best. If you bring the machine to Penguicon there will be no shortage of experienced and willing technicians that can take a look at it. Also crywolf's suggestions are very good, they and are designed to rule out multiple possible points of failure, but almost none of these suggestions (including my own) are there to fix your computer in the short-term only to gather more information.
