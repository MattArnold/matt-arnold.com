---
layout: layouts/post.njk
title: Making A Good-Looking Favicon
date: 2015-10-18T17:35:00.000Z
tags: []
original_url: 'https://nemorathwald.dreamwidth.org/395997.html'
userpic: ../userpics/_.jpg
---
I'll walk you through how to make a logo look good when reduced to a 16x16-pixel image. The easiest methods produce ugly results. Craftsmanship is fiendishly challenging at this level. When you only have 256 pixels, each one matters.

Favicons are the tiny images that appear in the title bar of your web browser. It's usually the logo of the site. If you're reading this article on Livejournal in 2015, look for a blue circle with a black pencil in it. Notice how each tab you have open in your browser has a favicon.

When I was hired to create [BlackBoxMontreal.com](http://blackboxmontreal.com), the designer of the company's visual identity [Christine Garofolo](http://cgarofalo.com), sent me her art (used here with permission).

To demonstrate the simple and ugly way to make a favicon, I opened it in Photoshop, and used Image Size to scale it down to 16 pixels wide:

![Original Black Box Montreal logo](http://nemorathwald.com/faviconhowto/original-black-box-logo.png)![Favicon, the easy way.](http://nemorathwald.com/faviconhowto/favicon-the-easy-way.png)

There are two problems. The logo is wider than it is tall, and as you can see, the forms are no longer distinct. This is like ordering pizza, and receiving it after the pizzeria put it through a blender-- the crust, cheese, sauce, and toppings are still there, but their forms are gone.

This has a lot of what we call "anti-aliasing": a quality of digital art in which pixels on an edge between two colors are a mixture of those two colors, to create the illusion of smoothness. Unfortunately, we used an automated process to shrink the image, which made each pixel an average of several nearby colors. Each pixel is trying to represent too much detail with just one color. The resulting color is an average, weighted by the distance of several colors from the center of the pixel. But the colors in the original image were not designed keeping in mind their distances from a grid of 256 point. The result is blurrier than it has to be.

Next, I took the second ugly approach to a favicon, by limiting the image to 9 colors: black, white, green, two shades of purple, and four shades of grey. I used the Pencil tool to color one pixel at a time.

![Favicon: The wrong way.](http://nemorathwald.com/faviconhowto/favicon-the-wrong-way.png)

The edges now look jagged and harsh. When anti-aliasing is in the right place at the right amount, it doesn't blur detail; it actually increases the perception of detail. With all the anti-aliasing removed, we have even less visual information than we did before. This is like if you order a pizza, and you receive all of the ingredients separately and unbaked.

A good favicon would find a balance between keeping the forms distinct from each other, and keeping them smooth enough to approximate their true shape. But making a pizza is not figuring out how long to put it through a blender; it's all about arrangement. And so it is when making a favicon.

Fortunately, the source art of the logo is in vector format, which will make this much easier. So I will open it in a vector drawing program, Adobe Illustrator.

A word about "vector" and "raster" formats. These are two main ways to represent visual information in a computer. Raster art is a grid of pixels, each of which is assigned a particular color. Vector art is a mathematical description of paths that connect coordinates in 2D space. A color is assigned as a stroke following a path, or assigned to fill the interior of the path.

![An example of raster art.](http://nemorathwald.com/faviconhowto/raster-example.png)![An example of vector art.](http://nemorathwald.com/faviconhowto/vector-example.png)

Photoshop processes raster information (which is good for photography), and Illustrator processes vector information (which is good for logos). They each can import each other's files, so in Photoshop, you can "rasterize" vector art, and in Illustrator, you can "vectorize" raster art.

My first task in Illustrator is to remove fine details. Those details would be lost in the favicon, and would do nothing but add blurriness. I will select all the shapes and remove the white strokes on the paths. I will change the fill-colors of the shapes until there remain only six colors: the black of the box, the green of the monster arm, the white of the claws, the grey of the robot arm, and two shades of purple for the tentacle.

![The logo unshaded.](http://nemorathwald.com/faviconhowto/blackboxmtl-logo-unshaded.png)![The simplified logo, scaled down.](http://nemorathwald.com/faviconhowto/favicon-simplified-art.png)

That color reduction removes all the details except for the monster claws and the tentacle suckers. I could remove those too, because in the final image, they will be faint hints-- if they appear at all. But we'll see how it comes out.

Next I'll open the art in Photoshop, which converts the vector paths to a raster image of pixels. Then I once again will use Image Size to scale down the raster to 16 pixels wide. The colors do not sufficiently stand out against each other at this scale, resulting in indefinite forms. I'll throw away this raster and go back to the vector art in the state I left it, in Illustrator.

I'll select each shape and apply Effect > Stylize > Inner Glow. For the black shapes, I'll select a white glow color, and for the light shapes, I'll select a glow color which is a dark version of that shape's color.

![The logo shaded.](http://nemorathwald.com/faviconhowto/blackboxmtl-logo-shaded.png)![The shaded favicon, scaled down.](http://nemorathwald.com/faviconhowto/favicon-shaded-art.png)

You might wonder how this is better than the strokes which I previously removed. At 16x16 pixels, your eye will not see this gradual transition as a detail. At a glance, your eye will see a solid color. Now when I rasterize it in Photoshop, and scale it down to 16x16 pixels, the forms stand out to the eye. Each glow is a gradual transition. Your eye will not resolve these transitions as details. Instead it just tricks your eye into seeing each shape as one consistent color throughout. But now the dark edge on a light shape will stand out against the light edge on a dark shape, so each shape is distinct from its neighbor.

This is better, but the logo still does not fit well into a square. I'll throw out this raster and go back to Illustrator.

If I crop the image to only show the center, I would lose the important shapes at the sides. So instead, I'll carefully adjust some of the shapes so that the logo occupies less width.

Each shape is made out of invisible coordinates called "anchor points", connected by paths. Illustrator will show me these anchor points and let me drag them around to edit the shapes of the monster arm and the tentacle:

![The logo modified so its width and height are equal.](http://nemorathwald.com/faviconhowto/blackboxmtl-logo-squared.png)![The favicon modified so its width and height are equal.](http://nemorathwald.com/faviconhowto/favicon-square.png)

I made some tradeoffs here. On the one hand, I distorted the actual shapes. On the other hand, this step provided a bigger payoff in legibility than any of the previous steps. The irony is, the best way to preserve recognition is through distortion. Previously, each feature of the graphic occupied a tiny space, in order to fit blank space into the top and bottom of the image. Now, each individual shape now takes up a larger area. When space is at a premium, when it comes to making something more legible, nothing beats making it bigger.

Here are all of the versions side-by-side:

![A comparison of the steps.](http://nemorathwald.com/faviconhowto/favicon-steps-comparison.png)

I would like to hear your thoughts or contributions for how to accomplish legibility at such a small size.

## Comments

---

none
