@import 'common.js';
var Text = require('sketch/dom').Text;
/*
 This plug-in assigns page numbers to artboards on the current Sketch page.

 To get a page number, an artboard needs to include a symbol instance named "{pageNum}"
 with a text override named "pageNum".

 The plug-in starts numbering pages at startPageNum upon finding the first instance
 of {pageNum}. From there it counts each artboard as a page, so even if an artboard
 doesn't include the {pageNum} instance, it's still counted.

 The plug-in numbers artboards based on how they are laid out (horizontally or vertically).
 The z-order of the artboards in the Sketch page doesn't matter.
*/

var onRun = function(context) {
	let doc = context.document;
	let thisPage = doc.currentPage();
	updatePageNumbers(doc, thisPage);
}

function updatePageNumbers(doc, page) {
	const startPageNum = 1;
	const symbolInstanceName = "<pageNumber>";
	const textOverrideName = "pageNumber";

	let curPage = startPageNum;
	let totalPages = 0
	let numbersAdded = 0;
	let firstPageWithNumber = 0;
	let firstPageFound = false;
	let artboards = [page artboards];
	let orientation = getOrientation(artboards);
	if (orientation == "horizontal"){
  	artboards.sort((a, b) => a.frame().x() - b.frame().x());
	} else if (orientation == "vertical"){
		artboards.sort((a, b) => a.frame().y() - b.frame().y());
	}
	for (let i = 0; i < artboards.count(); i++){
		let artboard = artboards[i];
		layers = artboard.children();
		for (let j = 0; j < layers.count(); j++){
			let layer = layers[j];
			if (layer.name() == symbolInstanceName){
				if (layer.class() === MSSymbolInstance){
					let success = setOverrideText(layer, textOverrideName, curPage);
					if (success){
						firstPageFound = true;
						numbersAdded++;
					}
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
	if (numbersAdded == 0){
		alert("No page numbers found",`To add a page number to an artboard, add a symbol instance named ${q}${symbolInstanceName}${q} with a text override named ${q}${textOverrideName}${q}${br}${br}Put the # character in text override's default value if you want to include other characters. (E.g., "Page #" as the default override would produce "Page 1")${br}`)
	} else {
		alert("Page numbering complete.", `${br}${symbolInstanceName} instances updated: ${numbersAdded}${br}${br}First artboard with a ${symbolInstanceName} instance: ${firstPageWithNumber}${br}${br}Total artboards (starting at artboard ${firstPageWithNumber}): ${totalPages}${br}`);
	}
}

// figure out if arboards are laid out horizontally or vertically
// assumes no artboads on top of artboards
function getOrientation(artboards){
	if (artboards.count() == 1){
		return "horizontal";
	} else {
		let widthSum = 0;
		let minX = Number.MAX_SAFE_INTEGER;
		let maxX = Number.MIN_SAFE_INTEGER;
		for (let i = 0; i < artboards.count(); i++){
			let artboard = artboards[i];
			widthSum += artboard.frame().width();
			let left = artboard.frame().x();
			let right = artboard.frame().x() + artboard.frame().width();
			minX = Math.min(left, minX);
			maxX = Math.max(right, maxX);
		}
		let delta = Math.max(minX,maxX) - Math.min(minX,maxX);
		if (delta >= widthSum) {
			return "horizontal";
		} else {
			return "vertical"
		}
	}
}
