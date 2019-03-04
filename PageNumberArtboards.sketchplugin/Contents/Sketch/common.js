function alert(title, message){
  var app = [NSApplication sharedApplication];
  [app displayDialog:message withTitle:title];
}

// assumes non-nested symbol
function setOverrideText(instance, overrideName, newText){
	let symbolMaster = instance.symbolMaster();
	let children = symbolMaster.children();
	for (let i = 0; i < children.count(); i++){
		layer = children[i];
		if (layer.name() == overrideName){
			let objectID = layer.objectID();
			if (instance.overrides()[objectID] !== undefined) {
				const dictionary = instance.overrides() || NSDictionary.dictionary();
				const overrides = NSMutableDictionary.dictionaryWithDictionary(dictionary);
        let template = layer.stringValue());
        if (template.indexOf('#') >= 0){
          newText = template.replace('#',newText);
        }
        overrides[objectID] = newText;
				instance.overrides = overrides;
				return true;
			}
		}
	}
	return false;
}

// assumes non-nested symbol
function getOverrideText(instance, overrideName){
	let symbolMaster = instance.symbolMaster();
	let children = symbolMaster.children();
	for (let i = 0; i < children.count(); i++){
		layer = children[i];
		if (layer.name() == overrideName){
			let objectID = layer.objectID();
			return instance.overrides()[objectID];
		}
	}
	return undefined;
}
