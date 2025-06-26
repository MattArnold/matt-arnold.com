---
layout: layouts/post.njk
title: Only Linux Sees The Internet At This House
date: 2009-05-25T16:52:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/281160.html'
userpic: ''
---
I'm feeding the pets of a friend for a few days out of town. Only Linux can access the internet at this location! When I boot the laptop into Windows XP, it says it's made a connection to the network, but every browser I use fails to see any websites. My laptop has always had this problem here. I have to boot Windows to play games or use my art software, but boot Linux to use the internet. Any suggestions?

## Comments

---

**[ext_255504](https://www.dreamwidth.org/users/ext_255504)** on May. 25, 2009 5:10 PM

I wonder if he's got some type of smart router or Proxy that sees the Windows and denies access? Something I would try is grab your IP and DNS information when booted in Linus, then static it in Windows and see if that helps.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on May. 25, 2009 5:31 PM

_I wonder if he's got some type of smart router or Proxy that sees the Windows and denies access?_ No. My friend lacks the tech savvy to accomplish that, uses Windows exclusively, and is not opinionated about it. _Something I would try is grab your IP and DNS information when booted in Linus, then static it in Windows and see if that helps._ What does it mean to static it, and how do I do that?

---

**[ext_528995](https://www.dreamwidth.org/users/ext_528995)** on May. 25, 2009 8:27 PM

While in Linux, execute the commands 'route' and 'cat /etc/resolv.conf'. The former will give you your IP address in his network, the latter the DNS server address. Then boot into Windows and put these in the equivalent places. There should be a menu item for this labeled "networking". "internet settings", or something similar. It will have tabs for all of these settings. I would try manually setting the DNS server addresses only (and leave the DHCP in place) at first.

---

**[ext_1679847](https://www.dreamwidth.org/users/ext_1679847)** on May. 26, 2009 5:02 AM

I have similar weird problem at my house - I can not access facebook (in particular) from my linux machine. All other websites load fine, reboot into Windows XP, facebook loads fine. Go somewhere else, all loads fine on linux. Weird... Good luck with that.
