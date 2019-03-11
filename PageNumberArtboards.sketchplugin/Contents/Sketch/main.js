/*
 This plug-in assigns page numbers to artboards on the current Sketch page.

 To get a page number, an artboard needs to include a symbol instance with a text override named '<pageNum>'.

 If you wish to include other text (e.g., "Page 1") rather than just the number alone, include a '#'
 in the override's default text. (E.g., 'Page #')

 The plug-in starts numbering pages at 1 upon finding the first page-number symbol instance.
 From there it counts each artboard as a page, so even if an artboard doesn't include an page number
 instance, it's still counted.

 The plug-in numbers artboards based on how they are laid out (horizontally or vertically).
 The z-order of the artboards in the layer list doesn't matter.
*/

@import 'common.js';
@import 'symbolfunctions.js';
@import 'artboardfunctions.js';

var onRun = function(context) {
	let doc = context.document;
	let thisPage = doc.currentPage();
	updateArtboards(doc, thisPage);
}

function updateArtboards(doc, page) {
	const startPageNum = 1;
	const pageNumberOverrideName = '<pageNumber>';
	let artboards = [page artboards];
	sortArtboardsByLayout(artboards);
	let artboardCount = artboards.count();

	let curPage = startPageNum;
	let totalPages = 0
	let numbersAdded = 0;
	let firstPageWithNumber = 0;
	let firstPageFound = false;

	for (let i = 0; i < artboardCount; i++){
		let artboard = artboards[i];
    		setTimeout(() => {
      			doc.showMessage(`Updating artboard ${i + 1}. ${((i + 1)/artboardCount * 100).toFixed(0)}% complete.`)
    		}, 0);
		layers = artboard.children();
		for (let j = 0; j < layers.count(); j++){
			let layer = layers[j];
			if (layer.class() === MSSymbolInstance){
				if (setPageNumber(layer, pageNumberOverrideName, curPage) !== undefined){
					firstPageFound = true;
					numbersAdded++;
				}
			}
		}
		if (firstPageFound){
			if (firstPageWithNumber == 0){
				firstPageWithNumber = i + 1;
			}
			totalPages = curPage;
			curPage++;
		}
	}
	// summary
	const br = String.fromCharCode(13);
	const q = String.fromCharCode(34);
	setTimeout(() => {
		alert('Page numbering complete.', `${br}Page numbers updated: ${numbersAdded}${br}First artboard with a page number instance: ${firstPageWithNumber}${br}Total artboards (starting at artboard ${firstPageWithNumber}): ${totalPages}`)
	}, 50);
}

// assumes non-nested symbol
function setPageNumber(instance, overrideName, pageNumber){
  let template = getDefaultOverrideText(instance, overrideName);
	if (template !== undefined){
	  if (template.indexOf('#') >= 0){
			// look for '#' in default override (e.g., 'Page #') and replace # with pageNumber
	    template = template.replace('#',pageNumber);
			return setOverrideText(instance, overrideName, template);
	  } else {
			// '#' not found, so simply set the override text to page number
			return setOverrideText(instance, overrideName, pageNumber.toString());
		}
	}
	return undefined;
}
