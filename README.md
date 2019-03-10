# PageNumberArtboards
A Sketch plugin that adds page numbers to artboards on the current Sketch page using a symbol instance to display the page number. 

To get a page number, an artboard needs to include a symbol instance with a text override named `"<pageNum>"`. The name of the symbol instance itself does not matter. Note that this override cannot be in a nested symbol.

If you wish to include other text (e.g., "Page 1") rather than just the number alone, include a '#' in the override's default override text (e.g., 'Page #'). Here is what such a symbol would look like on the Symbols page:

<img src="/readme_images/symbolimage.png" width="400">

The plug-in starts numbering pages at 1 upon finding the first page-number symbol instance. From there it counts each artboard as a page, so even if an artboard doesn't include an page number instance, it's still counted.

The plug-in numbers artboards based on how they are laid out, horizontally or vertically (it figures out which). The of the artboards in the layer list doesn't matter.
