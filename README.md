# PageNumberArtboards
A Sketch plugin that adds page numbers to artboards on the current Sketch page using a symbol instance to display the page number. 

The plugin numbers artboards based on how they are laid out, left-to-right or top-to-bottom (it figures out which). The order of the artboards in the layer list doesn't matter.

To get a page number, an artboard needs to include a symbol instance with a text override named `"<pageNum>"`. The name of the symbol instance itself does not matter. Note that this override cannot be in a nested symbol.

If you wish to include other text (e.g., "Page 1") rather than just the number alone, include a "#" in the override's default override text (e.g., 'Page #'), and the "#" will be replaced by the page number. Here is what such a symbol would look like on the Symbols page:

<img src="/readme_images/symbolimage.png" width="400">

You can also view sample.sketch in this repository to see how the symbol is defined.

The plug-in starts numbering pages at 1 upon finding the first page-number symbol instance. From there it counts each artboard as a page, so even if an artboard doesn't include an page number instance, it's still counted.
