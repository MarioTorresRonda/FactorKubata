export const JSX = {
	slashComment: true,
    colors: [
        //Comments
        { color: "$#384887", search: [/^\/\//g] },
        { color: "$#384887", search: [/^\/\*/g] },
        //BackSlash
        {color: "$#F280D0", search: null, conditions: [ "lastCharBackSlash" ], variables: [ "!lastCharBackSlash" ] },
        {color: "$#F280D0", search: ["\\"], variables: [ "lastCharBackSlash" ] },
        //Strings
		{ color: "$#22AA44", search: ['`'], conditions: [ "isInsideBacktick" ], variables: [ "!isInsideBacktick" ] },
        { color: "$#F280D0", search: ["}"], conditions: [ "isInsideBacktick" ], variables: [ "!isInsideBacktickBracket" ] },
        { color: "$#F280D0", search: ["{"], conditions: [ "isInsideBacktick" ], variables: [ "isInsideBacktickBracket" ] },
        { color: "$#22AA44", search: null, conditions: [ "isInsideBacktick", "!isInsideBacktickBracket" ] },
        { color: "$#22AA44", search: ['`'], conditions: [ "!isInsideSemiColon", "!isInsideQuotation" ], variables: [ "isInsideBacktick" ] },
        { color: "$#22AA44", search: ['"'], conditions: [ "isInsideQuotation" ], variables: [ "!isInsideQuotation" ] },
        { color: "$#22AA44", search: null, conditions: [ "isInsideQuotation" ] },
        { color: "$#22AA44", search: ['"'], conditions: [ "!isInsideSemiColon" ], variables: [ "isInsideQuotation" ] },
        { color: "$#22AA44", search: ["'"], conditions: [ "isInsideSemiColon" ], variables: [ "!isInsideSemiColon" ] },
        { color: "$#22AA44", search: null, conditions: [ "isInsideSemiColon" ] },
        { color: "$#22AA44", search: ["'"], variables: [ "isInsideSemiColon" ] },
        //HTML
        {color: null, search: ["/"], conditions: ["isInsideHTML"], variables: [""]},
        {
            color: "$#9966B8",
            search: [/^[A-Z]/g],
            conditions: ["nextWordElement", "isInsideHTML"],
            variables: ["!nextWordElement"],
        },
        {color: "$#225589", search: null, conditions: ["nextWordElement", "isInsideHTML"], variables: ["!nextWordElement"]},
        {color: null, search: ["<"], conditions: ["isInsideHTML"], variables: ["nextWordElement", "insideElement"]},
        {color: null, search: [">"], conditions: ["isInsideHTML"], variables: ["!insideElement"]},
        {color: "$#DDBB88", search: null, conditions: ["insideElement", "isInsideHTML"], variables: [""]},
        //JS
        {color: "$#179DFC", search: ["[", "]"]},
        {color: "$#9966BB", search: ["var", "const", "let"]},
        {color: "$#225589", search: ["export", "default", "=", "+", "-", "/", "*", "!", "<", ">", "return"]},
        {color: "$#225588", search: ["import", "new"]},
        {color: "$#22558A", search: ["from"]},
        {color: "$#9966B8", search: ["function"], variables: ["nextWordFunction"]},
        {color: "$#9966B9", search: ["."], variables: ["!nextWordFunction"]},
        {color: "$#F280D0", search: ["false", "true", "{", "}", "null"]},
        {color: "$#DDBB88", searchPos: 1, search: ["("]},
        {color: "$#DA70D6", search: ["("], variables: ["!nextWordFunction"]},
        {color: "$#DA70D6", search: [")"], variables: [""]},
        {color: "$#DDBB88", search: null, conditions: ["nextWordFunction"], variables: ["!nextWordFunction"]},
        {color: "$#F280D0", search: [/^\d+$/g]},
    ],
    usedVariables: [
        "lastCharBackSlash",
        "isInsideSemiColon",
        "isInsideQuotation",
        "isInsideHTML",
        "nextWordElement",
        "insideElement",
        "nextWordFunction",
        "elementIndexes",
    ],
    onInit: [
        { variable : "elementIndexes", function : findHTMLElementIndexes }
    ],
    onEachSplit : [
        { variable : "isComment", function : colorComment },
        { variable : "isInsideHTML", function : ({ variableObject, index, globalIndex }) => { return variableObject.elementIndexes.indexOf(globalIndex + index) != -1; } }
    ]
}

function findHTMLElementIndexes( { splitCompleteFile, variableObject } ) {
	const charOutsideHTML = ["|", "||", "&", ".", "(", ")", ","];
	const ignoreBetweens = ['"', "'", "`", "´", ["{", "}"]];
	
	const insideElementIndexes = [];
	const [openTags, closeTags] = findOpenAndCloseTags(splitCompleteFile);
	
	//If is valid, make string between openTag and closeTag, to be element valid
	//it can't have any strange different, only text, string, equals signs and if is JSX, also can have brackets.
	//Things inside string and brackets should be ignore
	openTags.every((openTag) => {
		closeTags.every((closeTag) => {
			//if closeTag is before openTag, exit
			if (closeTag < openTag) {
				return true;
			}

			const insideElement = splitCompleteFile.slice(openTag, closeTag + 1);

			let element = [];
			let illegalHTML = false;
			let ignoreUntil = [];

			insideElement.every((char, index) => {
				var ignoring = ignoreUntil.length > 0;
				//if is something we should start to ignore, we ignore until the character appears again
				if (ignoring) {
					for (let ignoreIndex = 0; ignoreIndex < ignoreUntil.length; ignoreIndex++) {
						if ( ignoreUntil[ignoreIndex] == char ) {
							ignoreUntil.splice( ignoreIndex, 1);
							return true;
						}
					}
				}

				let ignoreChar;
				for (let ignoreIndex = 0; ignoreIndex < ignoreBetweens.length; ignoreIndex++) {
					const ignore = ignoreBetweens[ignoreIndex];
					if (Array.isArray(ignore)) {
						if (char == ignore[0]) {
							ignoreChar = ignore[1];
							break;
						}
					}else{
						if (char == ignore) {
							ignoreChar = ignore;
							break;
						}
					}
				}

				if (ignoreChar) {
					ignoreUntil = [ignoreChar, ...ignoreUntil];
					return true;
				}				

				if ( !ignoring ) {

					//If char is outside the normal HTML chars, then we stop searching from this < 
					if (charOutsideHTML.indexOf(char) != -1) {
						illegalHTML = true;
						return false;
					}

					element.push(openTag + index);
				}

				return true;
			});

			if (illegalHTML) {
				return false;
			}
			if (ignoreUntil.length > 0) {
				return true;
			}

			insideElementIndexes.push(...element);
			return false;
		});

		return true;
	});

	return insideElementIndexes;
}

//function that returns two arrays:
//First Array: all the indexes of open tags that are not inside string
//Second Array: all the indexes of close tags that are not inside string
function findOpenAndCloseTags(splitCompleteFile) {
	let ignoreUntil = null;

	//ignore what is in between those characters
	let ignoreList = ['"', "'", "`", "´"];

	const openTags = [];
	const closeTags = [];

	splitCompleteFile.every((split, index) => {
		//if is something we should start to ignore, we ignore until the character appears again
		if (ignoreUntil) {
			if (ignoreUntil == split) {
				ignoreUntil = null;
			}
			return true;
		} else {
			let ignoreChar;
			ignoreList.every((ignore) => {
				if (split == ignore) {
					ignoreChar = ignore;
					return false;
				}
				return true;
			});

			if (ignoreChar) {
				ignoreUntil = ignoreChar;
				return true;
			}
		}

		if (split == "<") {
			openTags.push(index);
		} else if (split == ">") {
			closeTags.push(index);
		}

		return true;
	});

	return [openTags, closeTags];
}

function colorComment( { word } ) {
	//comments

	let coloredComment;

	if (word.startsWith("//")) {
		coloredComment = "$#384887" + word + "#$";
	}
	if (word.startsWith("/*")) {
		let coloredRows = word.split("\n");
		coloredRows = coloredRows.map((row) => {
			return "$#384887" + row + "#$";
		});
		coloredComment = coloredRows;
	}

	return coloredComment;
}