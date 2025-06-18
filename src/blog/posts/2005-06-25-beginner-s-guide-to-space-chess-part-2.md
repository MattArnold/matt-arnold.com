---
layout: layouts/post.njk
title: 'Beginner''s Guide to Space Chess, Part 2'
date: 2005-06-25T13:59:00.000Z
tags:
  - chess
original_url: 'https://nemorathwald.dreamwidth.org/64557.html'
userpic: ''
---
To wrap up yesterday's discussion, FIDE Chess is just another variant that happens to have won a monopoly on mindshare, but just because we can change it doesn't mean we want to set out to design a card game involving charades and throwing a ball through a hoop. What are we talking about when we say "chesslike"? It's a radial category, so a game can change a few of the following elements and still be recognizably chesslike. Typically, this category of game has no secret information and no element of chance. It involves players taking turns moving a piece on a lattice of discrete positions such as a grid or honeycomb; each position is occupied by only one piece at a time, each piece occupies only one position at a time. A piece superimposes its position on that of a piece from the opposing team to remove it from the playing area. That's what we're trying to do in 3-D. Part Two: Which Way Is Diagonal? Let's go over linemovers. Not all of these necessarily need to be used in the design of space chess. This entry owes much to [Gavin and Larry Smith from their description of "Prince."](http://www.chessvariants.org/3d.dir/prince.html) I've also imitated Larry Smith's style of illustration. **In these examples, the piece is supposed to be starting at the center of the cube.**

[![How to move Orthogonally in 3D chess](http://pics.livejournal.com/matt_arnold/pic/0006abwk)](http://pics.livejournal.com/matt_arnold/pic/0006abwk/g9)

**You probably know the word diagonal, but its relative, orthogonal, is less familiar. A rook in regular Chess only changes its location along one coordinate, either rank or file. In 3D there is a third dimension along which to move. Notice that the cubes of the spaces touch on the face.**

[![How to move on a diagonal in 3D chess](http://pics.livejournal.com/matt_arnold/pic/00065k06)](http://pics.livejournal.com/matt_arnold/pic/00065k06/g9)

The Bishop in regular Chess changes its location along exactly two coordinates, no more and no less, the same number of spaces for each coordinate. That's the definition of diagonal movement from the standpoint of geometry, and it can apply in 3D. See how the cubes touch on the edge.

[![How to move Triagonally in 3D chess](http://pics.livejournal.com/matt_arnold/pic/0006cf7q)](http://pics.livejournal.com/matt_arnold/pic/0006cf7q/g9)

This is where people become confused about how to move a Bishop in space chess. Should a diagonal move be through the edge of the cube or the corner? It's simpler to keep track of if you keep in mind that a triagonal move changes all three coordinates, no more and no less, the same number of spaces for each coordinate. The confusion stemmed from the fact that the corner is something different from diagonal.

[![The Rook](http://pics.livejournal.com/matt_arnold/pic/000697a4)](http://pics.livejournal.com/matt_arnold/pic/000697a4/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006tgex)](http://pics.livejournal.com/matt_arnold/pic/0006tgex/g9)

**What we have here are really three different geometric primitives. The Rook** is easy; it's an orthogonal linemover.

[![The Bishop](http://pics.livejournal.com/matt_arnold/pic/0006d6c1)](http://pics.livejournal.com/matt_arnold/pic/0006d6c1/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006f9x2)](http://pics.livejournal.com/matt_arnold/pic/0006f9x2/g9)

**The Bishop** is a diagonal linemover.

[![The Mage](http://pics.livejournal.com/matt_arnold/pic/0006bk9t)](http://pics.livejournal.com/matt_arnold/pic/0006bk9t/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006r096)](http://pics.livejournal.com/matt_arnold/pic/0006r096/g9)

**This piece is not possible in 2D chess. It's been called The Merchant or The Mace, but here I'll refer to a triagonal linemover as: The Mage and represent it with a crescent moon for purposes of this series. You may have noticed in Chess that a Bishop starting on black or white always stays on that color, which limits it to half the squares on the board. The Mage has that problem, doubled. It can only ever visit one-fourth of the positions in the playing field. The artificial intelligence engine in [Zillions of Games](http://www.zillions-of-games.com/) scores it as worth about as much as a pawn, which should be taken into account when building an army.**

[![The RookBishop](http://pics.livejournal.com/matt_arnold/pic/00067btq)](http://pics.livejournal.com/matt_arnold/pic/00067btq/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006w276)](http://pics.livejournal.com/matt_arnold/pic/0006w276/g9)

**The RookBishop would be a Queen if it were regular chess, but if you are thinking of a piece that can change its location along as many or as few dimensions as desired, like a Queen in FIDE Chess, this doesn't qualify. Moving either orthogonally or diagonally means it can change either one or two coordinates in its position per move, not all three. That's why there exists this set of three pieces, called compounds.**

[![The RookMage](http://pics.livejournal.com/matt_arnold/pic/0006e3pa)](http://pics.livejournal.com/matt_arnold/pic/0006e3pa/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006y6y4)](http://pics.livejournal.com/matt_arnold/pic/0006y6y4/g9)

**The RookMage**, for instance, can choose orthogonal or triagonal directions.

[![The BishopMage](http://pics.livejournal.com/matt_arnold/pic/00063aap)](http://pics.livejournal.com/matt_arnold/pic/00063aap/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006x7f2)](http://pics.livejournal.com/matt_arnold/pic/0006x7f2/g9)

**The BishopMage** has an option of diagonal or triagonal movement. So the three compounds are RookBishop, RookMage and BishopMage.

[![The Queen](http://pics.livejournal.com/matt_arnold/pic/000663z7)](http://pics.livejournal.com/matt_arnold/pic/000663z7/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006sp55)](http://pics.livejournal.com/matt_arnold/pic/0006sp55/g9)

**The Queen. Now that's what I'm talkin'bout. By changing as many or as few of her coordinates by the same number, this moves in any straight line. If you want, you can call the RookBishop the Queen, and call this the Empress or something. But they are quite different.**

[![The King](http://pics.livejournal.com/matt_arnold/pic/00062w67)](http://pics.livejournal.com/matt_arnold/pic/00062w67/g9)[![](http://pics.livejournal.com/matt_arnold/pic/0006p8wp)](http://pics.livejournal.com/matt_arnold/pic/0006p8wp/g9)

**The King, able to move one step in any direction. This is extremely slippery and difficult to pin down, resulting in a lot of draws in games that are not designed carefully.**

[![The Chess Piece Formerly Known As Prince](http://pics.livejournal.com/matt_arnold/pic/000721dx)](http://pics.livejournal.com/matt_arnold/pic/000721dx)[![](http://pics.livejournal.com/matt_arnold/pic/00071tbb)](http://pics.livejournal.com/matt_arnold/pic/00071tbb)

****The Chess Piece Formerly Known As Prince.** It can move heterogonally or homogonally. Now appearing as an opening act for Queen, and The King (thankya, thankyaveramuch). Seriously though, this is a weakened form of the King as a solution to the draw problem. It lacks the ability to take a triagonal step.**

I'd like to try playing with a game that has two Princes on each team, and the victory condition is to checkmate either of them, while protecting both of your own. That way the game won't be unearthly long, because checkmate will be easier. For kicks, it would be fun to promote one of them to a King when it makes it to the other side of the board, where it is exposed to risk. A King can bring check on a Prince along a triagonal direction! Only with the distinction between the three types of movement under our belts can we figure out the Knight. **Tomorrow: Leapers-- Seven Arabian Knights.** You have been warned.

## Comments

---

none
