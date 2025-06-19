---
layout: layouts/post.njk
title: Another Failed Ubuntu Upgrade
date: 2009-04-29T14:24:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/277283.html'
userpic: ../userpics/_.jpg
---
I'll need help with my computer at Penguicon. Those of you who have been reading this blog a long time know that whenever I upgrade Ubuntu Linux to the latest version, one of a variety of things will go wrong to render the system unusable. What I have always done in the past in reaction to this, was wipe the hard drive and re-install Ubuntu. This time, when I boot up and enter the splash screen, as soon as I place my cursor in the field to enter my username, I get the popup message saying "Authentication Failed". Clicking the "OK" button only causes the popup to flicker, and it never gives back control.

## Comments

---

**[ext_53192](https://www.dreamwidth.org/users/ext_53192)** on Apr. 29, 2009 3:14 PM

I like Ubuntu, but I was happy last year when 8.04 was released after the con. I can take a look at your laptop at con. One thing I would try would be to get a console, uninstall gdm (if it will let you) and purge configs, and reinstall. Or maybe just reinstall gdm. Or maybe dpkg-reconfigure gdm. We shall see.

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Apr. 29, 2009 5:46 PM

Perhaps you have autologin turned on? Rename your .gnome folder in your directory and then reboot. login to a console (CTRL+ALT+F1) `move .gnome .gnome-old sudo reboot` See if that helps.

---

**[ext_2143960](https://www.dreamwidth.org/users/ext_2143960)** on Apr. 30, 2009 1:55 AM

Since you are going to be in the area for the pre-dinner and I will be at the hotel that night bring it to me and I will have it going for you before the dinner is over. I will not bore you with things to try before then to get it working. One question, did you see any part of the install fail while your where doing the upgrade???

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Apr. 30, 2009 1:57 AM

No I did not.

---

**[ext_2143960](https://www.dreamwidth.org/users/ext_2143960)** on Apr. 30, 2009 2:07 AM

Well if you can leave it with me before the dinner I will get it fixed for you before the dinner is over.
