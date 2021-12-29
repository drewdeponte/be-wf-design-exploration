# Backend Web Framework Design Exploration

This repository houses a TypeScript project which is a Design Exploration of
building a Backend Web Framework with the following constraints.

- only use functions & data - no classes containing data & functionailty
- use strong typing for everything (via TypeScript) - no use of `any`
- everything must be trivially testable via basic unit style state based tests

## Why the Constraints?

It has been my experience that applying constraints like this push you to think
about problem solving in ways that you might not normally think. My hope is
that by forcing myself to think in this way that I will have some valuable take
aways in terms of deeper understandings of design principles and maybe some
extremely valuable best practices.

## Why these Constraints?

I picked these constraints in particular for a few reasons.

Throughout my career I have used a bunch of backend web frameworks and sadly I
can't think of one that actually facilitated testing end-to-end request ->
response as a simple unit style state based test without having to do a bunch
of horrible magic to facilitate dealing with dependencies (database, etc.) My
instinct is that this doesn't have to be this way and it is possible to design
a framework in such a way that would facilitate simple unit style testing.
Hence, the constraint of requiring everything be trivially testable via basic
unit style state based tests.

I have been doing more and more funcitonal programming and there seems to be
this fear or resistence from developers in terms of simply using functions.
They instead run to classes and build classes that have no state and no need to
actually be a class. Through discussions with a number of people I think this
largely boils down to people thinking that they explicit dependency declaration
via function paramaters is a bad thing. This seems to generally be due to the
fact that they are worried about "threading" of dependencies through layers and
layers of functions. My instinct is that explicit dependency declaration is
extremely valuable and is actually a really good indicator/smell to push back
on poor design decisions. Therefore I have included the constraint of only
using functions & data to try and prove not only to myself but hopefully others
that they are extremely valuable.

Over the years I have moved further and further away from dynamic languages
and more and more toward static strongly typed languages. It is my new default
for everything that I build. So I thought it would be interesting to see what
sort of implications there are from having that requirement in this context.
