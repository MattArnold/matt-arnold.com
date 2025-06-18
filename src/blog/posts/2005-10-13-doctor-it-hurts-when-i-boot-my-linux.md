---
layout: layouts/post.njk
title: 'Doctor, It Hurts When I Boot My Linux'
date: 2005-10-13T00:02:00.000Z
tags:
  - linux
original_url: 'https://nemorathwald.dreamwidth.org/90869.html'
userpic: ../userpics/_.jpg
---
The hard drive on my Linux computer is 2.7 gigabytes. And yet when I upgraded from Kubuntu Breezy Badger Beta to the official release of Breezy Badger, it reported that it couldn't finish the process because the hard drive is full. I checked the properties panel for the hard drive and indeed, it was full. My problem today is that when I type in my password (which I know is correct) to log into the computer, the monitor clicks as if changing resolution, the screen goes black, then grey with a grainy clock mouse cursor, and then back to the log in screen again.

## Comments

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Oct. 13, 2005 12:32 AM

Hit and login at the prompt with your login name and password. type: df and copy and paste the results here. To conserve some space you might want to clear your apt-get cache by typing: apt-get clean Try df again and see if you've cleared out some space.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Oct. 13, 2005 2:15 AM

If only I could copy the results from the Linux command line output and paste them into Livejournal... But I will type it. The output is: Filesystem 1K-blocks Used Available Use% Mounted on /dev/hda1 2949028 2914060 0 100% / tmpfs 63500 0 63500 0% /dev/shm tmpfs 63500 12572 50928 20% /lib/modules/2.6.12-8-6/volatile I tried apt-get clean and it told me I didn't have permission. Then I heard a voice in my head, either yours or 's or Aaron's or that of , saying "Use the sudo, Luke. Cease all thought. Search out with your feelings. May the sudo be with you, always." So I typed sudo apt-get clean and it worked! See, I'm getting the hang of this. Now the new output is: Filesystem 1K-blocks Used Available Use% Mounted on /dev/hda1 2949028 2377632 421592 85% / tmpfs 63500 0 63500 0% /dev/shm tmpfs 63500 12572 50928 20% /lib/modules/2.6.12-8-6/volatile What should I do now?

---

**[ext_526756](https://www.dreamwidth.org/users/ext_526756)** on Oct. 13, 2005 12:33 AM

Hm, Random Guess: The new install got to install perhaps a new version of X and some new startup scripts that call a particular new or update window manager or desktop environment, but the install ran out of space before it got to install said new or updated window managers. As a result, attempting to login tries to start a window manager that isn't there to be started, and thus the startup fails back to the login screen. I haven't used linux regularly for about 5 years now though, so I wouldn't be sure how to fix it, especially on today's new-fangled distributions. (Back in my day, we had RedHat Linux 4.0 and we liked it! ;) )

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Oct. 13, 2005 12:36 AM

that should say ctrl + alt + f1. I used greater than and less than symbols and, lj thinks it's html.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Oct. 13, 2005 3:55 AM

Thanks for the help. I used sudo apt-get update and sudo apt-get dist-upgrade like you said. I restarted it and it's getting past the login screen now, but all it runs is Konsole.

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on Oct. 13, 2005 12:48 PM

Goody! Do the update. And then dist-upgrade till it reports 0 updates/installs, and then reboot. If you're getting errors upon dist-upgrading, you may need hands-on technician type help.
