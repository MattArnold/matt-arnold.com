---
layout: layouts/post.njk
title: Mind-blindness and God-blindness
date: 2007-08-27T18:16:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/183287.html'
userpic: ''
---
I found through [the Existence Is Wonderful blog](http://rationallongevity.blogspot.com/2007/08/of-god-blindness-and-absurdity.html) by Anne Corwyn, a life-extension activist who has Aspergers Syndrome. She points out a post in the Evanglical Outpost blog, [asking if there is a correlation between atheism and the autistic spectrum](http://www.evangelicaloutpost.com/archives/003882.html). The Evangelical Outpost would like to know whether, if you have a deficit in the ability to build a model of other minds, you may also find it difficult to detect benevolent intentions in every coincidence that happens to you and call it "God". (See my story, "[How To Recognize The Signs Of An Imaginary Friend](http://nemorathwald.com/node/19)".)

Personally, I think that we neurotypicals (those who don't have autism or Asperger's Syndrome) place entirely too much faith in our ability to interpret other people accurately. I've seen that do a lot of harm. Seeing things that aren't there-- whether it be false accusations about someone's intentions, or an insistence in the benevolence of a loved one who is obviously up to no good, or a claim of the paranormal-- is no less a mental impairment than failing to see them when they really are there. The difference is that the former person thinks he or she is more sensitive and caring, and other people tend to believe that about them, thus they become more popular and no one wants to call them impaired. That's why only one side of the overbalance gets labeled as an impairment.

As long as we're wildly speculating, perhaps the opposite of autism is paranoia? The film "A Beautiful Mind" illustrated what happens when powerful pattern-matching gets out of control and starts seeing intentional patterns that are really just coincidences. As [Douglas Adams said in his story of the caveman who invented God](http://www.biota.org/people/douglasadams/), paranoia is the overuse and misapplication of some of the best advantages of the brain we evolved with. Sometimes it's paranoia in reverse, seeing benevolence under every rock where a different paranoid would see a sinister conspiracy. [I've written an entire essay on this](http://nemorathwald.com/Thoughts_on_Interaction_with_Supernatural.htm).

I went to the Wired Magazine quiz that is supposed to provide a score on the autistic spectrum, but all it gave me was the following output. Does anyone know what my score would have been?

#!/usr/local/bin/perl

use CGI;

print "Content-type: text/html\\n\\r\\n\\r";

my %qs = (

'1' => "I prefer to do things with others rather than on my own.",

'2' => "I prefer to do things the same way over and over again.",

'3' => "If I try to imagine something, I find it very easy to create a picture in my mind.",

'4' => "I frequently get so strongly absorbed in one thing that I lose sight of other things.",

'5' => "I often notice small sounds when others do not.",

'6' => "I usually notice car number plates or similar strings of information.",

'7' => "Other people frequently tell me that what I've said is impolite, even though I think it is polite.",

'8' => "When I'm reading a story, I can easily imagine what the characters might look like.",

'9' => "I am fascinated by dates.",

'10' => "In a social group, I can easily keep track of several different people's conversations.",

'11' => "I find social situations easy.",

'12' => "I tend to notice details that others do not.",

'13' => "I would rather go to a library than to a party.",

'14' => "I find making up stories easy.",

'15' => "I find myself drawn more strongly to people than to things.",

'16' => "I tend to have very strong interests, which I get upset about if I can't pursue.",

'17' => "I enjoy social chitchat.",

'18' => "When I talk, it isn't always easy for others to get a word in edgewise.",

'19' => "I am fascinated by numbers.",

'20' => "When I'm reading a story, I find it difficult to work out the characters' intentions.",

'21' => "I don't particularly enjoy reading fiction.",

'22' => "I find it hard to make new friends.",

'23' => "I notice patterns in things all the time.",

'24' => "I would rather go to the theater than to a museum.",

'25' => "It does not upset me if my daily routine is disturbed.",

'26' => "I frequently find that I don't know how to keep a conversation going.",

'27' => "I find it easy to 'read between the lines' when someone is talking to me.",

'28' => "I usually concentrate more on the whole picture, rather than on the small details.",

'29' => "I am not very good at remembering phone numbers.",

'30' => "I don't usually notice small changes in a situation or a person's appearance.",

'31' => "I know how to tell if someone listening to me is getting bored.",

'32' => "I find it easy to do more than one thing at once.",

'33' => "When I talk on the phone, I'm not sure when it's my turn to speak.",

'34' => "I enjoy doing things spontaneously.",

'35' => "I am often the last to understand the point of a joke.",

'36' => "I find it easy to work out what someone is thinking or feeling just by looking at their face.",

'37' => "If there is an interruption, I can switch back to what I was doing very quickly.",

'38' => "I am good at social chitchat.",

'39' => "People often tell me that I keep going on and on about the same thing.",

'40' => "When I was young, I used to enjoy playing games involving pretending with other children.",

'41' => "I like to collect information about categories of things (e.g., types of cars, birds, trains, plants).",

'42' => "I find it difficult to imagine what it would be like to be someone else.",

'43' => "I like to carefully plan any activities I participate in.",

'44' => "I enjoy social occasions.",

'45' => "I find it difficult to work out people's intentions.",

'46' => "New situations make me anxious.",

'47' => "I enjoy meeting new people.",

'48' => "I am a good diplomat.",

'49' => "I am not very good at remembering people's date of birth.",

'50' => "I find it very easy to play games with children that involve pretending.",

);

my $q = new CGI;

if ($q->param("make") eq "yes")

{

my ($n,$q);

foreach $n (sort {$a <=> $b} keys %qs)

{

$q = $qs{$n};

print <<EOQ;

<tr>

<td valign="top" align="right">

$n

</td>

<td align="left" valign="top">

$q

</td>

<td align="left" valign="top">

<input type="radio" name="answer\_$n" value="xa">

</td>

<td align="left" valign="top">

<input type="radio" name="answer\_$n" value="sa">

</td>

<td align="left" valign="top">

<input type="radio" name="answer\_$n" value="sd">

</td>

<td align="left" valign="top">

<input type="radio" name="answer\_$n" value="xd">

</td>

</tr>

EOQ

}

}

my %scores = (

'1' => 0,

'2' => 1,

'3' => 0,

'4' => 1,

'5' => 1,

'6' => 1,

'7' => 1,

'8' => 0,

'9' => 1,

'10' => 0,

'11' => 0,

'12' => 1,

'13' => 1,

'14' => 0,

'15' => 0,

'16' => 1,

'17' => 0,

'18' => 1,

'19' => 1,

'20' => 1,

'21' => 1,

'22' => 1,

'23' => 1,

'24' => 0,

'25' => 0,

'26' => 1,

'27' => 0,

'28' => 0,

'29' => 0,

'30' => 0,

'31' => 0,

'32' => 0,

'33' => 1,

'34' => 0,

'35' => 1,

'36' => 0,

'37' => 0,

'38' => 0,

'39' => 1,

'40' => 0,

'41' => 1,

'42' => 1,

'43' => 1,

'44' => 0,

'45' => 1,

'46' => 1,

'47' => 0,

'48' => 0,

'49' => 0,

'50' => 0,

);

if ($q->param('submit') eq "Calculate Score")

{

my $n;

my $score = 0;

my @agrees;

my @disagrees;

foreach $n (sort {$a <=> $b} keys %scores)

{

my $answer = "answer\_$n";

if ($q->param($answer) =~ /.a/ && $scores{$n} == 1)

{

push @agrees, $n;

$score++;

}

elsif ($q->param($answer) =~ /.d/ && $scores{$n} == 0)

{

push @disagrees, $n;

$score++;

}

}

print "Agree: ".join(",",@agrees).": 1 point<br>\\n";

print "Disagree: ".join(",",@disagrees).": 1 point<br>\\n";

print "Score: $score<br><br>\\n";

print "<a href=aqtest.html>Return \_fcksavedurl="aqtest.html>Return" \_fcksavedurl="aqtest.html>Return" to test</a>\\n";

}

## Comments

---

**Anonymous** on Aug. 27, 2007 7:49 PM

Your answers are not here, so nobody can calculate your score. If you're terribly interested, retake the test and use the 'qs' and 'scores' lists to score yourself. Answering positivey to a question corresponding to a zero score indicates an NT response; answering positively to a question corresponding to a one score indicates an autistic response. The scoring doesn't distinguish between "agree" and "slightly agree", or "disagree" and "slightly disagree", so just answer yes or no.  
  
There are a lot of autism tests on the net.

---

**[rmeidaking](https://www.dreamwidth.org/users/ext_100082)** on Aug. 27, 2007 11:34 PM

I do know that it is very hard for my AS son to believe in things that can't be proven. He has more of a belief in the reality of certain animated shows than in Santa Claus, for instance. He was quite relieved to find out that SC wasn't real, because he couldn't believe the things attributed to SC (Toy acquisition, delivery, surveillance mechanisms, etc.). He has scoffed at the very idea of religion, that two or more people could believe the same thing that isn't provable.  
  
I do think that the way his brain works would make it quite difficult for him to believe in any sort of other-worldly phenomenon, whether it be "God" or "Tarot" or "auras" or clairvoyance (although he clearly wishes someone \*could\* do this). I don't know if he's typical of the syndrome or not, but he is clearly an atheist.

---

**[mjwise](https://www.dreamwidth.org/users/ext_526756)** on Aug. 28, 2007 3:08 AM

_Personally, I think that we neurotypicals (those who don't have autism or Asperger's Syndrome) place entirely too much faith in our ability to interpret other people accurately. I've seen that do a lot of harm. Seeing things that aren't there-- whether it be false accusations about someone's intentions, or an insistence in the benevolence of a loved one who is obviously up to no good \[snip\]_  
  
  
  
Speaking from someone coming from a cognitive ergonomics/engineering point of view, human behavior in relationships is, by and large, extremely biased to a [top-down](http://en.wikipedia.org/wiki/Top-down#Neuroscience_and_psychology) form. People tend to have preconceived notions about a relationship in their head and then look for the confirming evidence and ignore contradicting evidence, for example. Take a look at [this list](http://en.wikipedia.org/wiki/List_of_cognitive_biases) of cognitive heuristics and biases and see how frequently they occur in interpersonal relationships.  
  
Cognitive engineers tend to thrive on bottom-up type problems - when people are using a new system with few to no preconceived notions, manipulations in the environment are much more likely to affect someone's behavior. People acting in a very top-down manner, by contrast, are much more difficult to support effectively.  
  
And this is why engineers have never invented the ultimate dating service. ;)
