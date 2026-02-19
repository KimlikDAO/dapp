kdjs
====
All our code is compiled with kdjs. kdjs is our javascript compiler, which is an improved and modernized version of google closure compiler
(from now on gcc and GCC will refer to google closure compiler, not to be confused with gnu compiler collection)

We desire to take good parts of ts and combine it with the heavy optimization focus of gcc and take the optimization
capability to even higher levels.

 - we use ts-like type expressions inside jsdocs, which we belive is superior to gcc's.
 - kdjs has much better es6 support. It can
     - compile es6 modules exporting things (note for gcc exports do not side effect and will get eliminated unless there are other side effects like window. console.log etc)
     - leave imports as "unlinked" if desired, instead of trying to link all imports and fail when not possible
      This crucial for supporting non browser targets where some imports are not js code but platform apis.
      (Think Cloudflare Workers, bun, node etc)
 - we introduce .d.ts convention. Every interface inside d.ts means no mangle. These are for external api objects etc.
   Vastly improving on the extern files,
     - d.ts files can import other .d.ts files via regular es6 imports,
     - .d.ts files are scoped, the types don't live in a global scope but imported individually
     - can write interfaces using `interface IFace {}` ts syntax instead of the very awkward `IFace.prototype.prop = function(){}`
     - can be imported from .js file supplying the types. Recall extern files provide the types in the global scope and
       need to be supplied through the command line
 - much easier to use: `kdjs entry.js` is all you need. All transitive deps (which include all necessary typing data) are fetched and compiled.
 - unlike ts, types are used to extract every single bit of optimization possible
 - Can support jsx files, css files, etc when a transpiler is provided.
 - Additional optimization passes. Some of these passes submitted / accepted upstream to gcc codebase.

kastro
======
kastro is our web framework. The idea is to do as much work as possible at compile time, while having superb developer experience.
In kastro components are rendered at compile time and only the code which can manipulate the existing dom structures is shipped
to the client. It is so optimized, most component code shipped to the client won't know how to re-create
these dom structures if they were deleted.

kastro is enabled by kdjs and the custom jsx and css transpilers that it provides to kdjs.

In kastro each components is written in a .jsx file. The same jsx file is evaluated at compile time to generate the html
of the component tree (which the browsers can very quickly convert to a dom structure) and also compiled to a client js.

Now we'll work on kastro. It's been a while I worked on kastro and after a big kimlikdao-js refactor, it needs rework
to get it working again. This is where we are.

Communication style
====================
We understand that the real value is coming up with the right design. 
Implementation is just the final step. Most of the work will be in coming up with the right abstractions and design.
Always brainstorm on the design and never implement anything without explicit instruction.
When instructed, provide an MVP implementation that gets the basics right.
Our motto: exhaustive is the enemy of good design.
Always implement the minimum skeleton first. Once we have it, making the code exhaustive, covering all bases is almost mechanical.
But if we try to make the code exhaustive from the start, we will get lost in details and get derailed from the design.

js coding style
=================
The operators === and !== are banned. We rely on typechecking and stay firmly away from memes such as == being bad.
`throw Error()` is banned. The message string should be thrown directly. Whether the function throws or returns
already encodes this information and hence Error has no value add.
We prefer `const f = () => {}` style function everwhere we don't need the `this`.
