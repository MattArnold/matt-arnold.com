---
layout: layouts/post.njk
title: Police Procedural Programming
date: 2010-10-25T18:53:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/336320.html'
userpic: ../userpics/_.jpg
---
Programming a web app while watching a police procedural is a good idea. Every mystery is a learning opportunity. Why is my PHP code generating HTML with an extra linebreak? There is no \\n at that spot in the code. I don my sunglasses. Even though it's nighttime. Darkness doesn't matter. Always wear sunglasses at the scene of a crime. That spot in the code is a red herring. It's clean. Suspicion now turns on the comma-separated values file. Its fingerprints are all over this. The extra linebreak happens to coincide with the end of a line in that file. But no. The CSV itself was just a patsy... The real culprit forced it to do this. The real culprit was there with me all along, watching the whole investigation, inviting no suspicion. I remove my sunglasses in a dramatic flourish. Turns out a part of the code, the part that reads my comma-separated-values file into the program, is also reading in the linebreak at the end of each line. It should have stripped that out first. It thought no one would notice. It thought if it hid the evidence in the view-source, no one would ever be the wiser. No one looks at a linebreak. A line lying there, broken, outlined in chalk. It thought no one cares about a castoff of society. Internet Explorer will just look the other way, with the approval of the mayor and the police chief... it goes all the way to the top. It thought no one would miss the vic. It thought wrong. I don my sunglasses. It didn't actually make any practical difference to the outcome. But someday it might. And now... [I'll be ready for it](http://www.youtube.com/watch?v=a1Y73sPHKxw). Cue musical montage.

## Comments

---

**[ext_243991](https://www.dreamwidth.org/users/ext_243991)** on Oct. 25, 2010 7:41 PM

The real victim is you, if you are being forced to develop in Internet Explorer. My sympathies. Firefox has amazing plugins like Firebug and YSlow which are essential if you do anything with AJAX later on. Incidentally, if you haven't already done this I can show you how to set up a programming environment on your local computer with Eclipse (for PHP) and XAMPP.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Oct. 25, 2010 10:31 PM

I haven't actually paid any attention to Internet Explorer on this project, at least yet. I should be so lucky as to have someone who is forcing me to develop in anything. I love Firebug. I'll check out YSlow. I'll take you up on that offer. I'm just using Notepad++ right now.

---

**[ext_243991](https://www.dreamwidth.org/users/ext_243991)** on Oct. 26, 2010 2:51 AM

Here's the download for eclipse: http://eclipse.org/downloads/packages/eclipse-php-developers/heliossr1 Helios is the current version of eclipse 3.6 (named for a moon of Jupitor). This is the PHP package version of it. Select the proper operating system in the download links on the right. When you get the file, unzip it and place is in your program files directory, or whatever contains programs on a mac. When you open Eclipse it will ask you to select a workspace. You'll need to create a new one, but you want the workspace to be on the webroot - the root path of the webserver. If you are using Notepad++ for editing, what are you using for a webserver? Are you FTPing up to a hosted webserver? Or are you running PHP at the command line? I'll show you how to use Eclipse at the con. If you don't have a webserver, XAMPP is any easy way to set up a MySQL and Apache server. It's not intended as a production environment (too many security issues with Apache on windows) but it's great for a development environment.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Oct. 26, 2010 3:49 AM

I'm familiar with Eclipse and workspaces, from a Java class last year. It's cool that it works well with PHP also. Jen set me up on Abyss lightweight web server to do development locally, but I haven't started using it yet. I've been FTPing my files to a couple of webservers, one of J's and a student account at the college.
