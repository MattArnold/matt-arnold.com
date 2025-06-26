---
layout: layouts/post.njk
title: Ubuntu Linux upgrade failed
date: 2007-04-29T00:55:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/169943.html'
userpic: ../userpics/I'm_losin'_it.jpg
---
I updated my Ubuntu Linux to version 7.04 today. When I restarted, the bootup failed:

* * *

modprobe: FATAL: Module raid456 not found. BusyBox v1.1.3 (Debian 1:1.1.3-3ubuntu3) Built-in shell (ash) Enter 'help' for a list of built-in commands. /bin/sh: can't access tty; job control turned off (initramfs)

* * *

There's no prompt. What should I do?

## Comments

---

**[ext_177228](https://www.dreamwidth.org/users/ext_177228)** on Apr. 29, 2007 1:29 AM

Update Ubuntu 7.04 to Mepis 6.5? :-D Sorry, not much help, I know. Crap like this keeps people off of Linux. Are you actually using Raid? Or is this just something installed by default "in case you want it"? If the latter, then maybe there is some setting on the LiveCD you installed from, to boot up (and install) without Raid support?

---

**[ext_2143960](https://www.dreamwidth.org/users/ext_2143960)** on Apr. 29, 2007 3:21 AM — *Try this*

Download the Live CD of 7.04(Fiesty) and do the install but tell it to leave your partitions in place as they are, it should be an option, that way you won't lose your data.

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Apr. 29, 2007 6:13 AM

Vista? I kid, I kid... but c'mon, SOMEONE had to say it! :)

---

**[ext_326261](https://www.dreamwidth.org/users/ext_326261)** on Apr. 29, 2007 1:56 PM

Friends don't let friends do Vista!

---

**[ext_53902](https://www.dreamwidth.org/users/ext_53902)** on Apr. 29, 2007 1:59 PM

I wish someone had intervened over here!

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on Apr. 29, 2007 5:28 PM

I presume this happens after the boot prompt. What happens when you try to boot one of the older kernels?

---

**Anonymous** on May. 4, 2007 2:44 AM

I have the same problem. I am using RAID. ¨Software¨ RAID with a cheapo IDE card. Oddly, though I presume the upgrade of Ubuntu (in my case, Kubuntu) upgraded the kernel, there are only three in the grub list, a regular 2.6.17.xx one, a Recovery one and a memtest one. So, it didn´t leave me with my old kernel. When I try the Recovery kernel, it hangs on init of the LVM RAID.

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on May. 4, 2007 4:02 AM

Hmmm. The kernel for Feisty Fawn should be a 2.6.20 variety. Your kernel didn't upgrade, it seems. At this point, I'd recommend trying Matt's solution: reboot from the install CD, resize the current root partition, and setup from scratch on the freed space. It's not ideal, but it's a cleaner and simpler fix than others I can think of. Unless, of course, you _want_ to be manually mounting drives, hacking config files, and debugging kernel modules . . .

---

**Anonymous** on May. 9, 2007 8:49 PM

Right - no kernel update. Which is weird - I guess the raid module got updated (badly), but not the kernel. What I really need is a livecd that has fakeraid support so I can at least make sure I have backups of my files. Then I can just start all over from scratch...

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on May. 9, 2007 9:15 PM

You can still get Breezy images: [choose a mirror site close to you](http://www.ubuntu.com/getubuntu/downloadmirrors) and download Ubuntu 6.10 directly.

---

**Anonymous** on May. 29, 2007 5:41 PM — *simple solution*

Hello from Madrid, Spain: I has moved my ubuntu feisty ext3 with gparted livecd and I have the same message when I restarted... ======= modprobe: FATAL: Module raid456 not found. BusyBox v1.1.3 (Debian 1:1.1.3-3ubuntu3) Built-in shell (ash) Enter 'help' for a list of built-in commands. /bin/sh: can't access tty; job control turned off (initramfs) ======= I solve with this: Reboot... 1) In the grub menu, I have select the second choice: with recovery mode (the same kernel with recovery mode)... Let's run and run... 2) When answer for: password for maintenance or control-D for normal, press control-D... and ubuntu starts ok good luck...
