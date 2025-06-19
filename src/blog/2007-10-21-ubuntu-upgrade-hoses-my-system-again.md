---
layout: layouts/post.njk
title: Ubuntu upgrade hoses my system again
date: 2007-10-21T12:40:00.000Z
tags:
  - linux
  - open source
  - computer
original_url: 'https://nemorathwald.dreamwidth.org/191219.html'
userpic: ''
---
The same thing has happened when I tried to upgrade to the latest version of Ubuntu (Gutsy Gibbon) as happened the last time Canonical released an upgrade (Feisty Fawn). The upgrade manager only freezes. So I burned it to a CD and went through a reinstall process. It told me if I wanted to install on the master hard drive it would delete all my data. I installed it on the secondary hard drive, since it's blank and the master hard drive has been telling me lately that it's detecting errors and is about to die. Just as the upgrade to Feisty did, this has hosed my system, which now only starts up to a matt@ubuntu:~$ blinking prompt. So I swapped the order of the hard drives on the IDE cable and changed the Master jumper to Slave jumper and vice versa. Now the screen only fills with endless repetitions of the word GRUB. Will someone help me fix this?

## Comments

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Oct. 21, 2007 2:19 PM

"install on the master hard drive " Do you mean master boot record? No matter. In order to fix this one, it might be easiest to fix it in person. I'm willing but currently the family only has one car; so it would be easier if you could bring the machine down to Monroe. Is that possible?

---

**[ext_528995](https://www.dreamwidth.org/users/ext_528995)** on Oct. 21, 2007 2:31 PM

If you take the new drive out, and reset the previous drive to master, do you get your system back as it was before the upgrade?

---

**[ext_362577](https://www.dreamwidth.org/users/ext_362577)** on Oct. 21, 2007 10:55 PM

I upgraded my laptop to Gutsy on Thursday night and it worked great. Even fixed the issue where where my CD-ROM wouldn't detect any discs. Still have to test to see if X crashes when I have the framebuffer console turned on. I can't see how installing Gutsy on the second drive would have harmed the first. Probably the Gutsy install overwrote the Feisty MBR. It's possible that the install did work and on the first boot you were booted into the new system, but X failed for some reason. (Weird video card?) Both can be fixed, but will take some effort. It's equally likely that you did boot into the old one, but the drive is so close to dead that it can't load X or anything else. In any event, I find its best to always disconnect drives which will not be part of the installation when I'm installing an OS. Removes any room for error and makes everything simpler. Try installing Ubuntu with just the good drive in there and I bet it will work fine. Later, you can reconnect the old one as a slave and copy all your data over. (Which you need to do sooner rather than later if you want any of it.)

---

**[ext_1013438](https://www.dreamwidth.org/users/ext_1013438)** on Oct. 23, 2007 4:04 PM — *Grub*

       Grub does not like the order of the drives changed, it really, _really_ doesn't like it. Put it back as it was before, or be prepared to completely rebuild the system.

       If the "Main drive" is starting to fail, get it out of there. Back up the data (Home directory I assume) and retire the drive. If you need the drive, I prefer separate root and home partitions myself get a new one and stun your computer with the sheer amount of space. I've got time heavy on the hands. If you want I'll help if I can.
