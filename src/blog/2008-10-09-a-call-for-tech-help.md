---
layout: layouts/post.njk
title: A Call For Tech Help
date: 2008-10-09T18:25:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/242812.html'
userpic: ../userpics/_.jpg
---
I know my friends list can help with this. When the DSL is installed in this apartment next week, we want to set up a computer that does nothing but serve public wireless access to our own personal favorite internet sites (with the exception of Google or other search engines because they act as proxies to the whole web). It must also throttle bandwidth on that public access. The purpose is to make it easy for our friends to access sites we have pre-selected as related to [Lojban](http://matt-arnold.com/aboutlojban) or [CREM/FOMS](http://crem.miscellaneouswhatnot.net/trac/) from their laptops, when they come over for meetings on those topics. The second purpose is to be able to access wireless internet on my laptop. Easy, you say? I have an execrable success rate with logins on secure wireless networks in my own home, setup by the people I live with. In my history, if my home has a secure wireless network, there may as well be no wireless at all. Sad but true. We want the wireless server to be able to access the web, but not access our network of computers. We want it as far from the wired network as possible. That should be a standard function made possible by the technology industry-- why is it abnormal to separate access to the outside world and access to my desk? From a standpoint of the needs of users, that baffles me. Whatever method is used will have to withstand the malicious hackers that suspects live within wireless distance of us. Also she wants the public web access to be implemented on Linux, but we have Windows XP, Vista, Mac OSX, and Linux computers in the home network. Any advice or help would be welcome.

## Comments

---

**[ext_53192](https://www.dreamwidth.org/users/ext_53192)** on Oct. 9, 2008 7:59 PM

I'm not sure I fully understand the requirements, but I'd suggest setting up the new machine as a [pfsense](http://pfsense.org) box.

---

**[ext_2143960](https://www.dreamwidth.org/users/ext_2143960)** on Oct. 9, 2008 9:28 PM

I second the use of pfSense, I use it at home in something close to the configuration that you are speaking of. And if you need help let me know, I should be available next weekend after the concom meeting.

---

**[ext_528995](https://www.dreamwidth.org/users/ext_528995)** on Oct. 10, 2008 7:33 PM

Spend $40 or so and buy a router. Just about any router will have a menu driven system for setting up just about anything you want. If WEP/WPA still fail you, there are still a couple of things to try. Turn down the tranceiver power on the router or whatever you decide to use as one. Or else, if you have a basement, locate the router there. If not, get any mmetal box that's open on one end, put the router in it, and put the box where you can point it both toward your guests and away from the Malicious Hackers. Beef up security on your home machines (which I presume are conected via wireMESS) which you should be doing anyway.

---

**[ext_326261](https://www.dreamwidth.org/users/ext_326261)** on Oct. 10, 2008 10:59 PM

I'd suggest that you look into DD-WRT firmware for a router. Way less power and noise, and probably just as secure.
