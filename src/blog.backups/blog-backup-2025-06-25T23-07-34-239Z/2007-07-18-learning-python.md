---
layout: layouts/post.njk
title: Learning Python
date: 2007-07-18T16:07:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/179568.html'
userpic: ../userpics/_.jpg
---
The only language I've ever programmed in is BASIC on the Commodore 64 in the eighties. Other than that I've just learned markup languages like HTML and CSS. I've been dabbling in how to program in Ruby and Python in recent months. Last night Bruce Webber from my local [Lojban](http://www.lojban.org/) group came over and gave me my first in-person lesson in Python. Previously I had been receiving remote lessons from Timo Paulssen, a teenager living in Germany who I also know through Lojban. Timo had taught me about data structures, so I was prepared to make great advances last night. As a learning experience I'm making a cat-herding program, named Herdcat, intended to help me keep in touch to make sure I and my friends and associates have not forgotten the projects we're working on together. **The program as it currently stands:**

#!/usr/bin/python

import datetime

herdcatfile = file('herdcat.txt','r')

rolodex = \[\]

source = herdcatfile.readlines()

herdcatfile.close()

for row in source:

rolodex.append(row.strip().split('|'))

for contact in rolodex:

print 'Name: %s\\nProjects: %s\\nInterval: %s\\nReminder: %s' % (contact\[0\], contact\[1\], contact\[2\], contact\[3\])

print '%s|%s|%s|%s' % (contact\[0\], contact\[1\], contact\[2\], contact\[3\])

**The current contents of herdcat.txt:**

Bruce Webber|Python, Lojban, Penguicon, hanging out|7|07/17/07

Tim Schmidt|Penguicon, Stepmania rig, RepRap|7|07/18/07

Gerald Gentry|Subgenius at Penguicon, Budget for Stepmania, next SMOS Party|7|07/18/07

Chris DiBona|Inviting software guests|7|07/16/07

Frank Hayes|Getting my article published in a Linux magazine|7|04/20/07

So now it has a bunch of data. Herdcat must now manipulate it rather than just print it all to the screen. One of the upcoming things to do in Python is program it to: - check whether the Reminder date in each contact is in the future or not. - prompt me (Remind me) when it finds a contact Reminder date that is today or in the past. "Has this person responded to you since the last Reminder? Y/N" - add 1 to the Interval if I say "Y" (yes) and subtract 1 from the Interval if I say "N" (no). - add the Interval number of days to the Reminder date. - finish all the lines in herdcat.txt in this way, then overwrite the txt file.

## Comments

---

**[ext_228793](https://www.dreamwidth.org/users/ext_228793)** on Jul. 19, 2007 4:24 AM

I am amused that I was able to parse the python file and pick out things like that your file was going to be bar delimitated. I've never looked at python before. Yay, computer science! That being said, I'm probably going to be learning python, also, since Maya is using it (or is going to) as their scripting language.
