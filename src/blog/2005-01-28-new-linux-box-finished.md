---
layout: layouts/post.njk
title: New Linux Box Finished
date: 2005-01-28T05:33:00.000Z
tags:
  - linux
  - software
  - computer
original_url: 'https://nemorathwald.dreamwidth.org/38690.html'
userpic: ''
---
With a sense of satisfied triumph at 12:30 a.m. I finally get the new computer working, piece by piece. Thanks goes to the great C.R. and Blasted Bill for providing the components, and to , and for indispensible tech support. Linux Fedora Core 3 is installing on it as we speak.

## Comments

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Jan. 28, 2005 5:48 AM

Master! Slave! Primary! Secondary! \*whipcrack\*

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 28, 2005 2:39 PM — *I spoke too soon.*

It booted not from the drive, but from CD to install Linux. Just because I finally put a hard drive in there which the computer would recognize and install an operating system on, doesn't mean it will boot from that hard drive. It does not. Now it won't even boot from CD either.

---

**[ext_528962](https://www.dreamwidth.org/users/ext_528962)** on Jan. 28, 2005 3:44 PM — *Re: I spoke too soon.*

Oops. I hope it works out eventually.

---

**[ext_362569](https://www.dreamwidth.org/users/ext_362569)** on Jan. 28, 2005 6:00 PM — *Re: I spoke too soon.*

Does Fedora Core 3 use Lilo, or Grub? You might have forgotten to tell Fedora to configure your Master Boot Record (MBR).

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 28, 2005 6:08 PM — *Re: I spoke too soon.*

I don't know. I've never heard of Lilo, Grub, or Master Boot Record. I hope it turns out to be that and not another hosed hard drive.

---

**[ext_362569](https://www.dreamwidth.org/users/ext_362569)** on Jan. 28, 2005 6:36 PM — *Re: I spoke too soon.*

_I don't know. I've never heard of Lilo, Grub, or Master Boot Record._ Personally, what I would do is download and burn a copy of Knoppix (a bootable "live" CD), boot from that, and see if you can mount the drive. If everything is OK, Knoppix can be used to configure Lilo or Grub into your drive's MBR. ....but a Fedora expert might be a better person to ask.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 28, 2005 6:53 PM — *Re: I spoke too soon.*

Thanks! I have a couple of copies of Knoppix on CD at home. Once it's running, how do I configure?

---

**[ext_362569](https://www.dreamwidth.org/users/ext_362569)** on Jan. 28, 2005 8:42 PM — *Re: I spoke too soon.*

Knoppix should create an Icon on it's desktop to reflect any drives found. Find the icon, right-click, and select "mount". If it mounts successfully, your drive is good. Read [this article](http://www.linuxplanet.com/linuxplanet/tutorials/5361/4/). It has a tutorial on how to install grub using Knoppix. Recommendation: read the whole article before entering any commands.

---

**[ext_362569](https://www.dreamwidth.org/users/ext_362569)** on Jan. 29, 2005 12:02 PM — *Re: I spoke too soon.*

......well?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 29, 2005 4:13 PM — *Re: I spoke too soon.*

Under Knoppix the drive simply would not mount. The problem seems to be that this motherboard won't handle my 160GB, 200GB or 45GB Western Digital drives. Bill came over and tried to replace the firmware on the BIOS, but said it couldn't be done. I used my 20GB Maxtor and Fedora Core 3 said there wasn't enough disk space on which to install.

---

**[ext_362569](https://www.dreamwidth.org/users/ext_362569)** on Jan. 29, 2005 7:24 PM — *Re: I spoke too soon.*

:( Too bad you don't have a Debian installer disk and a broadband connection. Debian can install a base system (about 500 meg) and then you can add the latest Debian verified versions of applications via the net.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jan. 30, 2005 3:07 PM — *Re: I spoke too soon.*

Well, I have a broadband connection, and according to I'll get a Debian installer disk at today's Penguicon technology track meeting!

---

**[ext_528962](https://www.dreamwidth.org/users/ext_528962)** on Jan. 28, 2005 1:36 PM

Hip hip hooray. You now have a working Linux box that isn't a piece of trash. :-) You truly belong to Penguicon now. There is no escape. \*evil cackle\*

---

**[ext_232645](https://www.dreamwidth.org/users/ext_232645)** on Jan. 29, 2005 6:31 PM

Yea verily. All Matt Arnold's base are belong to Peng. {/bad parody} ~Karen
