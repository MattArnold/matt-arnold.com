---
layout: layouts/post.njk
title: Can't Boot From CD
date: 2007-04-29T15:54:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/169986.html'
userpic: ../userpics/_.jpg
---
I downloaded and burned the Live CD / Install CD of Ubuntu Linux version 7.04 codename "Feisty Fawn", since all the help I found online said that the only solution [to my wrecked Linux box](http://matt-arnold.livejournal.com/178632.html) was to reinstall the operating system. It's not booting from the CD. I carefully configured the BIOS setup to boot from CD. It's still not doing so. I tried starting Ubuntu in safe mode. Same problem. I'm not as worried about my computer as I'm worried about public credibility of the Ubuntu project. It seems that the entire internet is promoting version 7.04 as the Windows Vista killer, but when I tried upgrading my past version of Ubuntu to it, it appears to have made my computer a doorstop. Promoting it as a Windows replacement is important to me, so this is more discouraging for that reason than for losing everything on my hard drive.

## Comments

---

**[ext_513201](https://www.dreamwidth.org/users/ext_513201)** on Apr. 29, 2007 4:39 PM

Are you able to boot from any other CD, like, say, a Windows install CD or the Ubuntu 6.10 CD, or is your machine not even trying to boot from CD?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Apr. 29, 2007 4:51 PM

It boots just fine from the LiveCD of Ubuntu version 5.10.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Apr. 29, 2007 4:55 PM

Correction, I should say that it detects and attempts to boot from it. Ubuntu mailed me these sleeve-packaged CDs a couple of years ago, and whenever I try to boot from them, at the step "Load installer components from CD" the install process returns an error saying it couldn't read the data from the disc. I have hundreds of copies of it and they all do the same thing.

---

**[ext_513201](https://www.dreamwidth.org/users/ext_513201)** on Apr. 29, 2007 5:22 PM

Then it's not a BIOS boot order problem, and it is recognizing your CD-ROM. Check. Before you give up on your old installation and therefore any data you have on it, google the second of the errors you got. You'll find suggestions on how to get a prompt. If you can then get a network connection or a working USB port or access to another drive then you can save your data. I don't know how to do those things, but but but... it seems once you get a prompt your data isn't lost. Also if you google the second message you'll find that it can happen as a result of any number of previous errors. Like the one you got. If you can get a prompt you might find an error log with more helpful information. One of the discussions I found had suggestions on how to proceed once you've managed to boot from another disc, and that's what I thought you were doing. If you want to try to mount your drive after bootong from CD, but just haven't found a bootable linux CD, try making a 6.10 disc. Prior to that, though, make sure you've burned the 7.04 disc from the iso image, and not just burned a disc with an iso image file on it. Likely you googled the first error and found discussions in French and German; neither helpful in translation. Neat, huh? Anyway, have you tried posting [here](http://ubuntuforums.org/)?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Apr. 29, 2007 6:18 PM

My computer has now successfully detected and booted from the Version 7.04 Live CD. I have two CD drives and I'm not sure which one is really connected, so I burned two copies and filled both drives just to be safe. It may be that one of them burned incorrectly and this time I swapped the CDs between drives. Now the installer is resizing the disk partition. It says "Guided - resize SCSI1 (0,0,0), partition #1 (sda) and use freed space" "New partition size: 62%" It allowed me to select old accounts to import along with all associated documents. \*crosses fingers\*

---

**[ext_513201](https://www.dreamwidth.org/users/ext_513201)** on Apr. 29, 2007 5:43 PM

You'll find my tale of Ubuntu installation [here](http://slashdot.org/comments.pl?sid=232495&cid=18901711) :-)

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Apr. 29, 2007 6:12 PM

Oh, so that's who you are!
