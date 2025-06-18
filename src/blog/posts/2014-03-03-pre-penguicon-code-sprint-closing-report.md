---
layout: layouts/post.njk
title: Pre-Penguicon Code Sprint Closing Report
date: 2014-03-03T14:43:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/391106.html'
userpic: ../userpics/_.jpg
---
I'm exhausted and happy. See my last blog post for background info on what I'm talking about. Eighteen developers attended. This weekend, we accomplished the following:

*   Got a consensus on our technology stack, and the direction we want to go.
*   Learned how to develop with technologies some of us were previously unfamiliar with.
*   Completed the functionality for anyone to sign in using an account they already have on another site.
*   Gave Staff users the ability to move an event suggestion through statuses: "We Followed Up On This", "Closed as rejected" and "Closed as approved".
*   Polished up the home page where you can filter a report of events by topic tags.
*   Made the event submission form interface prettier, but also broke it.
*   Made a Head of Programming user, who can make other users into Staff users, and make Staff users into Track Heads.
*   Made a page that shows the events in "Closed as rejected" status (these events are hidden everywhere else, unless you are logged in as Staff).
*   Designed a database schema for taking a "Closed as approved" event suggestion and making a "Scheduled Event" out of it.
*   Almost finished the system for attendees to RSVP to events. The star icon on each event will have a digit next to it, showing how many people RSVPed. The star will light up when you click it, and that number will increase by 1, and your RSVP points will decrease by 1.
*   Made "person" database objects, so the site can deal with people who are not users of the site. Every User has one or more "person"s (some of whom are aliases, such as their con name). Some "person"s have no User account, but later if they make a User account it can be associated to them.
*   Made a personal page for every user, giving them the ability to make their RSVPs public, and eventually this will show them everything they've done on the site.
*   Sat in the hot tub.

In one month, several of us will meet again for an evening at the All Hands Active hackerspace in Ann Arbor. Until then we'll continue to collaborate online. Thank you SO MUCH to our support staff, Cylithria Dubois, Rhiannon Llewellyn, and Dan Eckerd! Fantastic job, everyone! We will definitely do this again!

## Comments

---

none
