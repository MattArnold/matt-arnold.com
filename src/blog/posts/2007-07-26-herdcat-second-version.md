---
layout: layouts/post.njk
title: 'Herdcat, second version'
date: 2007-07-26T12:43:00.000Z
tags:
  - hacking
original_url: 'https://nemorathwald.dreamwidth.org/180591.html'
userpic: ../userpics/sinfest_devil_clerk.gif
---
I'm dog-sitting my landlady's puppy, a half-spaniel/half-coton named Lola. Lola is so young she couldn't even walk a few days ago. In the Python programming language, the object "lola" is in the class Dog and has methods such as "lola.eat" and "lola.white". Bruce Webber explained this to me last night when we continued my instruction in Python. We completed [all the steps I had planned out](http://matt-arnold.livejournal.com/189003.html) for what to do in my program Herdcat. Then he taught me the basics of Functions and Objects.

#!/usr/bin/python

import datetime

class Contact:

def \_\_init\_\_(self, name, projects, interval, reminder):

self.name = name

self.projects = projects

self.interval = datetime.timedelta(int(interval))

datepart = reminder.split('/')

self.reminder = datetime.date(int(datepart\[2\]), int(datepart\[0\]), int(datepart\[1\]))

def isdue(self):

if self.reminder < datetime.date.today():

return True

else:

return False

def readrolodex():

#'r' stands for 'read'

herdcatfile = file('herdcat.txt','r')

rolodex = \[\]

source = herdcatfile.readlines()

herdcatfile.close()

for row in source:

contactpart = row.strip().split('|')

rolodex.append(Contact(contactpart\[0\], contactpart\[1\], contactpart\[2\], contactpart\[3\]))

return rolodex

def writerolodex(rolodex):

#'w' stands for 'write'

herdcatfile = file('herdcat.txt', 'w')

for contact in rolodex:

herdcatfile.write('%s|%s|%s|%s\\n' % (contact.name, 

contact.projects, contact.interval.days, contact.reminder.strftime('%m/%d/%Y')))

herdcatfile.close()

rolodex = readrolodex()

for contact in rolodex:

if contact.isdue():

print 'Has %s responded to you about %s since the last Reminder?' % (contact.name, contact.projects)

smartass = True

while smartass:

response = raw\_input('Y/N:')

if response.upper() == 'Y':

#int() stands for 'make this string an integer'

contact.interval = contact.interval + datetime.timedelta(2)

smartass = False

elif response.upper() == 'N':

contact.interval = contact.interval - datetime.timedelta(1)

smartass = False

else:

print 'You did not type Y or N, please try again:'

contact.reminder = contact.reminder + contact.interval

print 'Name: %s\\nProjects: %s\\nInterval: %s\\nReminder: %s' % (contact.name, 

contact.projects, contact.interval, contact.reminder.strftime('%m/%d/%Y'))

writerolodex(rolodex)

**The current contents of herdcat.txt:**

Bruce Webber|Python, Lojban, Penguicon, hanging out|7|07/17/07

Tim Schmidt|Penguicon, Stepmania rig, RepRap|7|07/18/07

Gerald Gentry|Subgenius at Penguicon, Budget for Stepmania, next SMOS Party|7|07/18/07

Chris DiBona|Inviting software guests|7|07/16/07

Frank Hayes|Getting my article published in a Linux magazine|7|04/20/07

## Comments

---

**[ext_114341](https://www.dreamwidth.org/users/ext_114341)** on Jul. 26, 2007 6:04 PM

in computer context, lola is only one letter away from lol. i guess that mkaes it an unusually happy name?

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Jul. 26, 2007 6:34 PM

That's appropriate! She's an unusually happy dog!

---

**[ext_362577](https://www.dreamwidth.org/users/ext_362577)** on Jul. 29, 2007 4:49 PM

Weeeelll, technically lola.white would be an object property rather than a method. :) This sounds like a fun first project. I'm currently writing a personal address book to teach myself (more of) PHP.
