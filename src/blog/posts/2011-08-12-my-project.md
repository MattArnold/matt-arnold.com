---
layout: layouts/post.njk
title: My Project
date: 2011-08-12T21:23:00.000Z
tags: 
  - technology
  - career
  - job
original_url: 'https://nemorathwald.dreamwidth.org/375019.html'
userpic: ../userpics/_.jpg
---
I've been hired to build a website. It will contain a form through which users can submit a description of a web services API which conforms to constraints of REST. Users can define a set of HTTP request messages, and the structure of JSON response messages. (Just JSON. He specifically said I don't have to care about XML at this stage.) I'm supposed to define a database schema that encompasses as many APIs as possible that a client could ask for, so long as it falls within those constraints. I have two weeks to get this done. The design and user interface is trivial. Learning the web framework and writing the code will take an intermediate amount of time. The majority of the time I expect to spend educating myself about REST enough to include enough in the database schema. For a couple of years I have been reading brief articles and Wikipedia entries about web APIs and REST, but have no experience using either of them in any capacity. My employer advised me to do a Google Images search on "REST API" and look at the UML diagrams there; but I don't know how to interpret the boxes and arrows, and most of the terms are jargon which I don't know. I've been searching around various Google hits on the relevant search terms, but is there some kind of comprehensive catalog of what can go into a RESTful web-services API?

## Comments

---

**[ext_25108](https://www.dreamwidth.org/users/ext_25108)** on Aug. 12, 2011 9:41 PM

From a quick skim it looks like you use GET instead of POST. You can store data in something permanent like a database stored on a server drive, but not session variables stored in server memory.

---

**[ext_21159](https://www.dreamwidth.org/users/ext_21159)** on Aug. 13, 2011 2:21 PM

Do you mean, these are features of REST? Or, what are you trying to say?

---

**[ext_91618](https://www.dreamwidth.org/users/ext_91618)** on Aug. 15, 2011 2:25 PM

A big part of the idea of REST is that you should use the HTTP commands that line up with what you're actually trying to do. For reads, yes, that means using GETS, and I think that's the clearest area where the REST approach is nice to use. You technically can call SOAP web services with a GET, and those services are perfectly free to change whatever data they feel like. Having a GET that changes any data is a huge no-no in REST.

---

**[ext_526867](https://www.dreamwidth.org/users/ext_526867)** on Aug. 13, 2011 1:36 AM

There's not much to REST, really. Imagine describing remote object operations in terms of HTTP or WebDAV, e.g. using the PATH\_INFO variable as an object identifier so that URIs roughly play the part of object handles. GET, POST, PUT, DELETE, and so on. Your schema could probably start as a structured representation of whatever web service definition language they favor. Consider looking at CouchDB's [HTTP document API](http://wiki.apache.org/couchdb/HTTP_Document_API) and possibly their jQuery client for a bit of inspiration.

---

**[ext_91618](https://www.dreamwidth.org/users/ext_91618)** on Aug. 15, 2011 2:38 PM

I don't think people usually talk in terms of messages with REST, although I supposed everything over the internet really is just messages. For a GET, the message is just the URL, and the whole operation is supposed to look basically like it's a static web site, and the data you're looking for just happens to live at that location. Performing a GET should have no consequences, and you should not have any qualms about just tossing the URL into a web browser to have a look. A PUT is the converse of a get, and ideally, the same URL could be used for reading and writing. For an example, you could do a GET on http://example.org/customers/1234, and the response would be a document containing the customer information for customer #1234. You make a couple modifications and PUT the edited version back to the same URL, and then a later GET would retrieve your version. PUTs are supposed to be idempotent (no change in results if you run it twice) -- if you post the same customer information again, it should already match what's there, so there would be no change. A POST is the only one that's essentially (at the application level, not HTTP) just passing a message to the server. You'd do that for events, and for things that are just too hard to make idempotent.
