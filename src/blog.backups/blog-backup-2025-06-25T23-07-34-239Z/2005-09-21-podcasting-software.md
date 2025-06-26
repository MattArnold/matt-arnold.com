---
layout: layouts/post.njk
title: Podcasting Software
date: 2005-09-21T20:17:00.000Z
tags:
  - podcasts
  - software
  - web
  - lojban
  - open source
original_url: 'https://nemorathwald.dreamwidth.org/85233.html'
userpic: ''
---
There are many programs and web applications that will syndicate your blog as a feed. Livejournal is one of them; you don't even have to set it up. It creates a special document in formats such as RSS or Atom. I'll bet a lot of you didn't even know your blog did that. It's great that you don't have to mess with it. Anyone who wants to subscribe to you can point a piece of software called a feed aggregator at your Livejournal, and their aggregator will go out and fetch your entries and deliver them automatically, instead of your readers having to check your blog to see if you updated it lately. Since the Firefox web browser implemented this as a "live bookmark" in the toolbar, that's become the main way I surf the web. The situation is not so good for podcasting. A podcast is just an audio file that's distributed by a syndication feed so that it's downloaded onto your desktop or digital music player automatically; but so far I have found no software that will update the RSS or Atom document for me. So far I'm doing it by hand in Notepad text editor, but it's complicated. I am making my podcast available in MP3, and also OGG audio. But I would also like to syndicate it with both RSS and Atom. The popular solution which is compatible with most podcast aggregator software is to use patent-encumbered MP3 audio delivered through one of several mutually-incompatible feed formats collectively known as RSS. But OGG is an open audio format and, like RSS's competitor Atom, OGG is standards-compliant and able to last into the future. So every time I come out with a new episode of Lojban radio, I have to update four different text documents in Notepad: RSS serving MP3 RSS serving OGG Atom serving MP3 Atom serving OGG I have to manually enter the URL of the audio on my server and the number of bytes in the audio. I want software that lets me set a default URL path and will just finish it when it asks me what files I'm going to use. I want it to auto-detect the file size too. I also have to manually put in the name of the episode and the summary, but I prefer to type this in fields instead of tying in the feed document, #1 to avoid accidentally deleting a punctuation mark in the markup that breaks the whole document; and #2 because software could propagate my title and summary through all four documents at once. Would it really be that complicated to automate this? Perhaps... (cue the music) a command-line script!

## Comments

---

**[ext_102523](https://www.dreamwidth.org/users/ext_102523)** on Sep. 22, 2005 12:14 PM

Actually, yes, this is one of those things that a script would be very, very good at. _Now_ you see the light! \*chuckle\* Also have a go at [http://www.podcastingnews.com/topics/Podcasting\_Software.html](http://www.podcastingnews.com/topics/Podcasting_Software.html) There's a couple of software packages that might be interesting, including one Perl script that might help. Additionally, have you searched freshmeat.net?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Sep. 22, 2005 1:58 PM

OK, I've downloaded Podcastamatic, which seems to promise what I'm looking for. I unzipped it and found the license, podcastamatic.conf, podcastamatic.pl, readme.html, and style.css. There was no installer. The readme.html made me install Perl on my computer. I thought Perl was a programming language. Education moment #1: What is the Perl "application" and why is it necessary to have it to run this? The readme linked to http://activestate.com/ to get Perl. Out of the dizzying array of choices on the I have installed ActivePerl on a hunch. It keeps talking to me as if I intend to learn Perl programming. So perhaps it was the wrong choice. Now podcastamatic.pl has a file association. I clicked it and nothing happened. I have to go do something else now, so I'll leave off the process here.

---

**[ext_528992](https://www.dreamwidth.org/users/ext_528992)** on Sep. 22, 2005 12:34 PM

Lojban radio… excellent! Until my recent purchase of an iPod Shuffle, podcasts were of casual interest to me. So the first thing this new iPod owner did was to download an aggregator, now I must confess I find it to be an amazing way for opinion, information, and entertainment to be distributed over the Web. I rather like the name of the Perl product Podcastamatic... reminds me of Rovco's Super Bass-o-Matic '76. Wow, that's terrific bass! (-;
