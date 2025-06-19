---
layout: layouts/post.njk
title: Open Wireless at ConClave
date: 2005-10-13T03:02:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/90946.html'
userpic: ''
---
One more important point to my con report, which will segue into a rant about computer security. When I opened up the laptop computer at ConClave, I did _not_ have a futile hours-long struggle to get on the internet. I had prepared for a struggle. I was even sitting in the middle of Cafe Penguicon where there were plenty of tech geeks who could help me figure it out. Instead, I was pleasantly surprised when the latest release of Ubuntu got me right onto the hotel's wireless network, effortlessly. I did nothing; not even a password; it just was there. Like the drinking fountains and bathrooms in the lobby, you walk up to it and it just works, no permissions, no charge. I had no such luck with the wireless in my own bedroom. In fact, I still don't. The difference is that the hotel wireless was not secured, whereas is a computer professional and has locked down the wireless network at my house so well that it has formed a consistent barrier to its usefulness. I'd wager the vast majority of wireless internet access with the laptop has been elsewhere than at home. I have never gone somewhere else and accessed some other network, without losing it again in my own residence and waiting for it to be set up again by someone else. I don't need to secure the internet; that's contrary to what the internet is. Especially when the person most often locked out of it is the only wireless user on the network, for whom alone the wireless exists. I've always thought of giving free wireless internet access to my neighborhood as a pleasant idea. I just don't want them getting the contents of my hard drive. Why is it these are not two different compartmentalized things? I have never, ever, used a home LAN network to transfer files from one of my home computers to another of my home computers. That just never works and I have no confidence that it will start working. All I use it for is the internet. Some smart techie somewhere has got to have come up with a way to offer an open internet node without "LAN" access. Don't tell me it can't be done. As [Dane Cook](http://danecook.com/) said in his wonderful comedy routine, "It can be anything you want, dreamers. So dream it! Go ahead, _dream it_ ya #&@%in' _dreamers_!"

## Comments

---

**[elizilla](https://www.dreamwidth.org/users/elizilla)** on Oct. 13, 2005 3:49 AM

I don't know much about linux; my laptops all have had windoze. However I do get sent to stay in corporate hotels that have wireless, where I am expected to do work stuff using my work laptop. And I can tell you that when I do, the various firewalls I have used report a lot of attacks. There are any number of nasty things floating around on unsecured wireless hotel LANs, though they are mostly things that attack windoze boxes. I have a wireless LAN at home. It's got WEP security enabled, so you can't log on without a WEP key. I freely hand it out to my guests, and when we used to have AASFA and concom meetings here it was much used. I have never had any problems setting my windoze boxes up to use these WEP keys, and the Mac and linux using guests don't usually seem to have trouble either. I haven't had any trouble with things getting into my LAN. There are other wireless LANs visible from here. I think the neighbors have them. There are enough unsecured LANs nearby, that just minimal security will cause war-drivers to move along to the easier targets. I use my LAN to move files between computers all the time, but that's because I work from home and I have five computers, and because I've set up these various mp3 streaming devices. Anytime I'm moving large files, I use wired connection, because they're faster, but the wireless definitely does work too.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Oct. 13, 2005 3:56 AM

Is there a difference between a password and a WEP key?

---

**[elizilla](https://www.dreamwidth.org/users/elizilla)** on Oct. 13, 2005 4:22 AM

Sort of. In the case of the WEP key there's no username. Just the key. And it's not quite as secretive a secret as your own personal password. Every user gets their own password, but typically all the users on a wireless LAN would share the same WEP key. Typically for password authentication you tell the system who you are by giving your username, then you prove it by giving the password. Internally, the system encrypts whatever you type as your password, using some algorithm, and compares it to the encrypted copy of your password that it has stored somewhere. In the case of your wireless LAN, it doesn't matter who you are; that's not what it's designed to track. Instead, your laptop plugs the WEP key in as a component in an encryption algorithm, and uses it to transmit everything your PC says, in code. On the other end, the router uses the known WEP key to decode the traffic once it gets there, and encrypt the traffic it sends back, which your PC can then decode. The WEP key itself doesn't get passed back and forth at all. But without matching WEP keys, the devices speak only gibberish to each other, and your connection doesn't work. If you wanted to have authentication of the users, you would have usernames and passwords in addition to the WEP encryption. You could then restrict access to resources, according to who the user is that is asking for it.

---

**[elizilla](https://www.dreamwidth.org/users/elizilla)** on Oct. 13, 2005 4:31 AM

Also, there should be a place in your laptop where at least a few WEP keys can be stored, that correspond to wireless LANs you have already used. When the laptop detects a wireless LAN, it should go through all the WEP keys it knows, and see if it can find one that will work with that LAN. Your laptop should remember LANs it has been on before, and switch over to them automatically, or pop up a prompt that says "Hi, I know where I am, shall I talk to this LAN?" and let you just say "Yes" rather than having to tediously re-enter the same WEP keys you entered last week.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Oct. 13, 2005 5:12 AM

That is extremely informative. The problem my system has is that the place where the WEP keys are stored is greyed out. It says I have to log in as an administrator, and then when I do, it's still greyed out. But that's a Linux/hardware problem.

---

**[elizilla](https://www.dreamwidth.org/users/elizilla)** on Oct. 13, 2005 5:54 AM

I'm afraid I can't help you with this since I don't know enough about how your system is set up, and I'm not familiar enough with the user interface you're looking at, to ask the right leading questions.

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Oct. 13, 2005 1:04 PM — *It can be done*

Yes it is do-able, but to do so securely either all your computers need a separate firewall or you setup a firewall computer with at least three network interfaces in it. In the former Linux, OS X, and Window XP all come with a firewall. You may need help setting up all but the OS X one, which is dead simple to configure (go figure.) In the latter case, you take a spare pc, preferably an old one, and load a firewall distro like IPCop. In it you shove three interfaces and you setup one as the Internet facing or Red interface, another for your wired network or your Green interface, and finally the third is connected to your wireless network and is referred to as the Blue interface. Regardless of the security setup, on the wireless router setup you remove the WEP key the MAC address filter, and finally turn on the option to separate each wireless client into their own little network (I can't recall where this setting is located.)

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Oct. 13, 2005 1:06 PM — *Re: It can be done*

Oh and after this is done. You won't be able to share the printer off a computer from the wireless network, unless you setup some fancy firewall rules. Such is the price of security.
