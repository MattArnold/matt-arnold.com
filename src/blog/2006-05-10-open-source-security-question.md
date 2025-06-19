---
layout: layouts/post.njk
title: Open Source Security Question
date: 2006-05-10T17:20:00.000Z
tags:
  - open source
  - computers
  - computer
  - software
original_url: 'https://nemorathwald.dreamwidth.org/122299.html'
userpic: ../userpics/Matt_4.jpg
---
Penguicon's tech guest of honor in 2007 will be Bruce Schneier, security guru. I was mentioning to Eric Raymond that I will be Head of Programming for Penguicon this year and looked forward to putting Bruce Schneier on panels about viruses, spyware and rootkits. Eric said something to the effect of not being interested in closed source software. I can't remember the exact sentence but it may have been referring to something to do with security programs that people use to protect their computers, such as McCaffrey, Symantec, Norton and so forth. Those are closed-source software. Bad Windows security seems to affect Linux users too. We don't want to have to live in a world full of compromised botnets that are being used to send us spam. Here now is the setup to my question. The reason open source software can be trusted and closed source software can't is that someone can read the code of the open source software to ensure that it's free of spyware and other malware. A computer geek who reads the source code, compiles it, and installs the software can be assured that he knows what he's running. Those of us to whom source code is unintelligible, and who don't know how to compile software from source code, use pre-compiled installer programs of open source software that we download from the internet. Someone in the open source community has presumably checked the source code of the program, but what about the particular copy of it that we are getting? What's to stop someone from distributing a precompiled installer of a popular open-source program, but altering it to include malware that will compromise the computer? Those who can't read source code would think we had the same program as everybody else. Is this scenario likely or unlikely? Would it work? Is there anything set up to prevent it?

## Comments

---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on (None)



---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on (None)



---

**[ext_210685](https://www.dreamwidth.org/users/ext_210685)** on May. 10, 2006 6:00 PM

It is possible, and nothing can prevent it, but not likely. It would have to be done at compile time, hence the project maintainer/programmer would be responsible. The type of person that loving creates and maintains an open source software project (not a simple task) is not the kind of person to do something malicious like this, and is also not willing to jeopardize their project for a quick buck. Particularly since the end-user for an OSS program is more than likely a techie and will notice any shenanigans. Add to that the programmer's code would be forked and the project taken over by more trustworthy geeks if the code was ever poisoned. Which is why OSS geeks only slightly mistrust pre-compiled OSS code, but are completely paranoid about proprietary, closed-source, pre-compiled programs.

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on May. 10, 2006 6:08 PM

Excellent posting. The best way to avoid it, if downloading precompiled binaries is to do it through the OS distribution you're using or by downloading the binary from the project's main website if it is a package not normally included in the distro. Installing through the distro is best as the package managers are going to check the package against the master repositories' MD5 (or other) signatures. If the package has been recompiled with different code, it won't have the same MD5 signature. (MD5 is a cryptographic hashing technique to generate a signature string for a particular file. If a file has changed, the hash is different) Most projects that distribute binaries offer MD5 signatures for their downloads. These are often listed as .md5 files. If you're feeling particularly paranoid, especially if downloading from a mirror, you can always save the .deb or the .rpm to a directory, then dropping to a shell prompt, cd'ing to the directory it's in and running "md5sum $name\_of\_package" against the file. Compare the string it generates to the string in the MD5 file FROM THE MAIN PROJECT SITE, NOT A MIRROR, for the filename in question. If they match, cool, if they don't, don't install the package. Optionally, save the MD5 file from the main project site to the same directory you saved the package to, and run from the directory "md5sum -c $md5\_file\_name" which should tell you if the file in question is good or not. I'm looking to see if there's a nifty little GNOME extension that would make that easier to do, but I'm not aware of any off the top of my head, as I normally just use the md5sum method. If I find one that's workable, I'll post it as an additional comment.

---

**[ext_124682](https://www.dreamwidth.org/users/ext_124682)** on May. 10, 2006 7:22 PM

This is only partly in English. Any translation programs available?

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on May. 10, 2006 7:46 PM

Cute. Tell me which parts you have problems with and I'll attempt to explain it better. Snide comments, while amusing from time to time, aren't really helpful.

---

**[ext_124682](https://www.dreamwidth.org/users/ext_124682)** on May. 10, 2006 8:14 PM

This reminds me of the Werewolf game I just started roleplaying in, lots of jargon I'm not familiar with. It does highlight an area I know very little about as an end user. I consider myself relatively computer savvy, compared to many people I know, but your post was in computer speak. So many things to learn, so little time.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on May. 10, 2006 7:47 PM

I don't think you're paranoid enough to need it.

---

**[ext_362572](https://www.dreamwidth.org/users/ext_362572)** on May. 11, 2006 2:46 PM

Sounded perfectly legible to me, and while being technical in nature, it was a perfect description of the process to check an installable package against a security hash. As the judge said, ignorance of the law is no excuse. Just like you need a certain minimal level of knowledge to run windows or MacOS, and more knowledge to have a reasonable level of expertise. Those of us who grew up with CLIs and UNIX obviously have a leg up, just like those people who focused a lot of time on early versions of windows have a leg up on those of us who dismissed that interface as a pathetic toy. There's a steep learning curve with CLIs if you're not used to them, but once you reach a level of mastery with them, you will understand why CLI fans consider GUIs to be a convenient toy at best.

---

**[ext_243997](https://www.dreamwidth.org/users/ext_243997)** on May. 10, 2006 7:01 PM

This discussion has kind of come up long ago -- check the part about Ken Thompson and backdoor'ing the c compiler... Even when you have the source, it's hard to know. Even when you build it yourself. Pretty much you have to trust, there's no way to be sure. Or you can be a dyslexic paranoid instead of a paranoid. You always think you're following someone else, but you're not certain of it. --Bill

---

**[ext_243997](https://www.dreamwidth.org/users/ext_243997)** on May. 10, 2006 7:03 PM

Urm... I meant to include a link like this one... http://cm.bell-labs.com/who/ken/trust.html or this one: http://www.jargon.net/jargonfile/b/backdoor.html --Bill

---

**[ext_362577](https://www.dreamwidth.org/users/ext_362577)** on May. 11, 2006 4:48 AM

You nailed it right on the head: trust. Open source developers and communities tend to be somewhat fanatical about the quality of their software. The rewards for closed source programmers are a paycheck, steady job, etc, and that's about it. The vast majority of OSS coders, however, get nothing in return but a little bit of recognition for their work and the satisfaction that other people find their software useful. If the software they write is crap, their efforts are for naught whether "crap" means exceedingly buggy, poorly designed, highly insecure, or any combination of these. Because of this, they're better motivated to do a good job. So, now that the programmer is spurred by the community into writing code that doesn't suck, does the community just sit back and passively receive said code once it's finished? In the open source community, no. The community has a vested interested in being the recipients of quality software and thus want to make it as good as possible. Thanks to the open source development model, they can and do. Most OSS projects are accomplished through the efforts of many, sometimes thousands of people. Linus Torvalds may be the guy in charge of the Linux kernel, but he has a supporting staff that rivals any proprietary development team. Because these guys (and occasionally gals) volunteer their time to making the kernel better, I and many other people trust them not to do something insidious like insert a backdoor into the kernel. And even if somehow a backdoor did make it into the code, it wouldn't stay a secret very long because eventually somebody is going to be fixing a bug or adding a feature and they'll stumble across an odd-looking function and figure out what exactly it is. The only time that you'd actually run a significant risk of acquiring some kind of backdoor or other malware is by downloading a script or program from some random guy's website that isn't widely used and has no community supporting it. Really, it all boils down to the fact that open source communities act as a kind of built-in quality control. In addition to the author's own motivation to write quality software, he's under social pressure not to piss off those in the community by writing utter crap or inserting malware. Open source development is usually done in a very public manner such that external code contributions and other activities are usually well reviewed by many people. This transparency thus discourages those who would otherwise want to do something nasty to the codebase. I've never read through the source code of a program to check it for security vulnerabilities or backdoors. But I trust in the transparency of the open source development model and the general goodwill of those who contribute their time to the various projects that I rely on. The only thing I can trust a proprietary software company to do is charge money for their product. Sweet jesus, that was a lot longer than I intended it to be.

---

**Anonymous** on May. 11, 2006 1:25 PM

I never said anything about the original, genuine creators of a piece of open source software. What I am referring to is what might be called a "secret fork." A third party, for instance in Eastern Europe, taking a complete, clean and safe Firefox, Open Office or The Gimp and distributing a slightly altered version, calling it a "mirror" when it's really not the same. All of this without the knowledge or consent of anyone who programmed the actual Firefox, Open Office or The Gimp.

---

**[ext_362577](https://www.dreamwidth.org/users/ext_362577)** on May. 11, 2006 3:42 PM

Mirrors are a part of the open source community and they're involved in the whole trust thing as well. Sure, it's \*possible\* that someone could sign up to be a mirror for a project and then inject their malware and distribute it to thousands of unsuspecting folks, but in practice this doesn't happen for a number of reasons. For starters, developers want to know that they can trust whoever is operating the mirror. That's why big-name OSS projects like Firefox, OpenOffice, and Gimp are so often mirrored on servers hosted by educational institutions. Most developers are simply \*not\* going add any Joe Schmoe FTP server to their mirror list. Not only do they have to trust that the mirror operator won't inject malware, but they also have to trust that the operator will keep the mirrored files up to date and the server secure. A breach of any of these means that said operator won't be allowed to host a mirror anymore. Most operating systems have built-in features to protect against tampered-with packages. When you add a software package to a running Gentoo system, the downloaded file may be pulled from pretty much anywhere in the world, but before it is even unpacked, it is checked against both an MD5 and an SHA256 hash to verify that it hasn't been tampered with on the mirror. Official Red Hat packages are signed with a private GPG key, as are packages for most any RPM-based distribution. Debian-based distros have similar security features. Poisoned mirrors are simply a non-issue for most Linux users. The only users that need to be concerned are those who download a package manually from a mirror not on the projects official mirror listing and then proceed to compile or install it themselves. At which point the onus is on \*them\* to be sure that the package isn't malware. People who do this are actually a rather small percentage of open source users. I install software manually like this on occasion, but I'm usually quite careful to only download the package from a trusted source and verify MD5 sums if they're provided. But I still have little fear that I'm getting a poisoned package because they're simply not common enough for me to worry about. I can't even recall a single instance of someone bundling a virus or something with an open source program. Can you? Closed-source operating systems currently offer no way to ensure that the software you download won't be compromised. Windows has no such thing as a package manager that can verify the integrity of the package that's been downloaded. As a result, spyware and viruses thrive on the platform. Windows security "experts" say that in order to be truly safe, you should only install software from a CD. But every so often we still hear of some initial pressing of discs that were accidentally infected with a virus. Mac OS X is in the same boat, it has virtually no protection against the installation of malware so it's really only a matter of time before it becomes a breeding ground of viruses and so forth. The main thing that might save OS X from this fate is that it actually has a decent security model otherwise.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on May. 11, 2006 3:49 PM

That's an excellent explanation.

---

**[ext_25108](https://www.dreamwidth.org/users/ext_25108)** on May. 11, 2006 9:48 PM

_You nailed it right on the head: trust._ Real geeks write their own compilers. :)

---

**[ext_5342](https://www.dreamwidth.org/users/ext_5342)** on May. 11, 2006 7:06 AM

IIRC, most package distribution systems (the apt/dpkg system for Debian, yum/rpm for Redhat, etc) have methods for checksumming the binaries they distribute. It's not foolproof: if the upstream binaries were poisoned, they could easily poison the checksum, too. But hacking such systems is theoretically much harder to do and get away with, especially in the long term.

---

**[ext_25108](https://www.dreamwidth.org/users/ext_25108)** on May. 11, 2006 10:30 PM

_What's to stop someone from distributing a precompiled installer of a popular open-source program, but altering it to include malware that will compromise the computer?_ How would the software become popular if it included malware? I occasionally check on what my computer is doing: top, netstat, syslog, maybe tcpdump (if I'm feeling paranoid) on a UNIX system; Task Manager, Windows Defender, Norton Internet Security on a Windows system. I take reasonable steps so I am much more concerned about performance than I am about security; what I do to identify performance problems will also identify active security problems. I'm a geek. I don't use any tool that I would be unable to understand. It would be scary to depend on something that was incomprehensible; I wouldn't want to live life that way.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on May. 12, 2006 12:47 AM

OK, I'm gonna have to explain this scenario _again._ 1. Good people develop wonderful, clean, safe program. 2. It becomes popular. It is still clean and safe at this time. 3. Organized crime in Eastern Europe takes a copy of said program and, unbenkownst to the creators, alters it. 4. Criminals post the altered version of the program to an illegitimate download site, not disclosing that it is altered. Here is where the scenario breaks down, as eihlrac so elequently explained why this does not happen. 5. Anyway, if it had happened, users then download the program from that site thinking they are getting the very popular, clean and safe program they heard about. 6. It operates just the same except for hidden code. Clueless users don't know why their system is running so slow. Got that now?

---

**[ext_25108](https://www.dreamwidth.org/users/ext_25108)** on May. 12, 2006 7:12 AM

I understand the hypothetical scenario you are describing, but it still does not make sense to me. Why would people go to the malware site instead of the authoritative site to download the application? The question is like, how do you know the jewelry you buy from a table in an alley is worth what you pay for it? I think the question answers itself.
