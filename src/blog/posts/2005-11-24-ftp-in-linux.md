---
layout: layouts/post.njk
title: FTP in Linux
date: 2005-11-24T05:31:00.000Z
tags:
  - web
  - linux
  - internet
original_url: 'https://nemorathwald.dreamwidth.org/98833.html'
userpic: ''
---
Today I wanted to make some corrections to the HTML of one of my old web pages to make it compliant with the standards of the [Firefox web browser](http://www.getfirefox.com). So I saved the webpage on my Linux computer. I opened the HTML file in Text Editor and was pleased that it made the markup tags a variety of different colors. This visual aid made the work go much faster. I looked in the Applications menu and was surprised that I didn't see an FTP client with which to send the file to my web space. So I looked in Synaptic Package Manager. The closest thing to what I wanted seemed to be this: "ncftp2" A user-friendly and well-featured FTP client. This program allows a user to transfer files to and from a remote network site, and offers additional features that are not found in the standard interface, ftp. This version includes full screen ncurses support, but no SOCKS support. OK, it doesn't come out and say "graphical user interface" but it does say "user friendly" and "full screen." So if it's not a GUI then those who write package descriptions are being typically clueless about what qualifies as user-friendly. After I installed ncftp2, it was nowhere to be found in the applications menu. So now I have to go to the trouble of hunting down each application I install, only to probably discover they are not at all the GUI FTP client that I'm looking for. Can somebody recommend a Linux equivalent to [Core FTP Lite](http://www.coreftp.com/screens/index.html)?

## Comments

---

**[ext_177228](https://www.dreamwidth.org/users/ext_177228)** on Nov. 24, 2005 12:52 PM

What can I recommend? FireFTP is an extension for Firefox, but it can be a bit buggy at times. I tried a number of GUI ftp packages, and all of them had some problem or another. Then somebody told me that Konqueror (yes, the file manager/browser) works just fine as an ftp client too. It is awesome. I've never had a single problem. I've even done a split screen between two different external servers and transferred files from one external server to the other, easy as pie.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Nov. 24, 2005 5:06 PM

I'm running KDE on my laptop but my desktop is GNOME, so it doesn't have Konqueror. I'll try FireFTP. That sounds promising. Thank you very much!
