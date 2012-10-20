Tab-oo
======

The purpose of this document is to describe the intent of various classes and 
components in the Tab-oo Composer source.

Composer
======

Instantiating a composer should be about the only thing that composerLaunch.js
does. This should instantiate all other objects, as well as define all key press 
handlers and other control mechanisms for the Composer. 

The Composer will handle all instantiation, not necessarily by directly calling
new Foo(), but perhaps indirectly by calling Song.newMeasure(config);


Component
======

I am still undecided about this class and its necessity. My thoughts are that a 
component will be everything besides the Composer (Pointer, String, Measure, Note)


Pointer
======

This should contain the state of the editor. It acts as the red indicator which
the user manipulates to modify the tab. 