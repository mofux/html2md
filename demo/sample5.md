[Homepage](https://medium.com/ "")[Sign in / Sign up](https://medium.com/m/signin?redirect=https%3A%2F%2Fmedium.com%2Fdailyjs%2Fjs-regexp-fast-and-slow-d29d6b77b06 "")

- [Home](https://medium.com/dailyjs "")
- [Archives](https://medium.com/dailyjs/archive "")
- [JavaScript Weekly](http://javascriptweekly.com/ "")

[Jakob Gruber](https://medium.com/@schuay?source=post_header_lockup "")BlockedUnblockFollowFollowingMay 22

___

# JS RegExp, Fast and Slow

![](https://cdn-images-1.medium.com/max/800/1*4877k4Hq9dPdtmvg9hnGFA.jpeg "")

The V8 JavaScript engine uses [Irregexp](https://blog.chromium.org/2009/02/irregexp-google-chromes-new-regexp.html ""), one of the fastest RegExp engines around. However, to best leverage that power, JS developers still need to avoid certain pitfalls that are unfortunately neither obvious nor well\-documented, and could waste precious runtime in RegExp builtin functions before ever reaching generated Irregexp pattern matching code.

For instance, I recently came across an [issue](https://github.com/mishoo/UglifyJS2/issues/1964 "") on the UglifyJS2 tracker in which a developer was hitting a correctness bug in an old version of Chrome. The source code itself seemed innocent enough:

![](https://i.embed.ly/1/display/resize?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F36006%3Fv%3D3%26s%3D400&key=4fce0568f2ce49e8b54624ef71a8a5bd&width=40 "")

```
$ browserify test.js > bundle.js
$ uglifyjs bundle.js -c reduce_vars=true | node
[ 'fooBar' ]  // Wrong!
$ uglifyjs bundle.js -c reduce_vars=false | node
[ 'foo', 'Bar' ]  // This is what we expect.
```

Investigation led to a simple bug in the slow path of `RegExp.prototype[@@split]` which was fixed months ago — problem solved.

![](https://cdn-images-1.medium.com/max/800/1*4877k4Hq9dPdtmvg9hnGFA.jpeg "")

Or is it? Why are we hitting the slow path at all in this trivial example?

You might not be aware of this, but taking the slow path can have a huge impact on performance. Specifically, in case of `@@split` the slow path can be up to **40x** slower than the fast path.

RegExp builtin functions have several requirements that need to be fulfilled for them to take the fast path. Consider `regexp[@@split](string)` \(called internally by `string.split(regexp)`\). To take the fast path:

- `regexp` must be unmodified \(no added, deleted, or modified properties\)
- `regexp.prototype` must be unmodified
- `regexp.lastIndex` must be a simple non\-negative integer — not an object, not a getter.

In our example above, `RegExp.prototype` is in fact modified when `uglifyjs` is run with `reduce_vars=true`. The modification itself is done by the Babel’s `es6.regexp.constructor`polyfill — which is bad news as it could mean that larger parts of the web may be affected.

![](https://cdn-images-1.medium.com/max/800/1*4877k4Hq9dPdtmvg9hnGFA.jpeg "")

So why is there a distinction between slow and fast paths at all?

The answer is performance. In order to be efficient, the fast path needs to be able to make certain assumptions about the shape of the RegExp object. For instance, it needs to know that `lastIndex` can be accessed at a certain offset within the object’s memory area, and that accesses to `lastIndex` are side\-effect free \(i.e. no installed getters, no object\-to\-integer conversions\).

Using these assumptions, the fast path can generate very lean code, turning `lastIndex` accesses into simple loads/stores at specific offsets. It is also able to skip `ToLength(lastIndex)` operations since `lastIndex` is already known to be a non\-negative integer.

![](https://cdn-images-1.medium.com/freeze/max/30/1*3AmlGsOhil5n425p6ksVHw.png?q=20 "")Extract of the [language specification](https://tc39.github.io/ecma262/#sec-regexpbuiltinexec "") for RegExp.prototype.exec

The slow path on the other hand needs to be able to handle more generic shapes:

![](https://i.embed.ly/1/display/resize?url=https%3A%2F%2Favatars1.githubusercontent.com%2Fu%2F36006%3Fv%3D3%26s%3D400&key=4fce0568f2ce49e8b54624ef71a8a5bd&width=40 "")

Note that `ToLength` conversion above calls a user\-specified function which can do arbitrary things, including modifying the RegExp instance while builtins \(such as `RegExp.prototype[@@split]`\) are running.

![](https://cdn-images-1.medium.com/max/800/1*4877k4Hq9dPdtmvg9hnGFA.jpeg "")

It is worth noting that the current situation is not set in stone, and it is quite probable that the fast path will become more permissive in the future. But for now, modifications to RegExp instances and their prototype should be avoided if at all possible.

Thanks to [Benedikt Meurer](https://medium.com/@bmeurer?source=post_page ""). 

- [JavaScript](https://medium.com/tag/javascript?source=post "")
- [V8](https://medium.com/tag/v8?source=post "")
- [Chrome](https://medium.com/tag/chrome?source=post "")
- [Web](https://medium.com/tag/web?source=post "")

292
- BlockedUnblockFollowFollowing

### [Jakob Gruber](https://medium.com/@schuay "Go to the profile of Jakob Gruber")
- Follow

### [DailyJS](https://medium.com/dailyjs?source=footer_card "")

JavaScript news and opinion.

- Share
- 29

Never miss a story from** DailyJS**, when you sign up for Medium. [Learn more](https://medium.com/@Medium/personalize-your-medium-experience-with-users-publications-tags-26a41ab1ee0c#.hx4zuv3mg "")Never miss a story from** DailyJS**Get updatesGet updates