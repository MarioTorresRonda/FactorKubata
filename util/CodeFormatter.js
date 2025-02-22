import { formats } from "./formats/main";

const variableObject = {};

let actualFormat;

//keywords for splitting the text before formatting
const splitChars = [
	"=",
	'"',
	"'",
	"`",
	"´",
	"\\",
	"(",
	")",
	"{",
	"}",
	"[",
	"]",
	".",
	";",
	" ",
	",",
	"+",
	"-",
	"!",
	"<",
	">",
	"\r",
	"\n",
	"/",
	"*",
];

export function formatCodeText(completeFile, archiveType) {

	actualFormat = formats[archiveType.toUpperCase()];
	const splitCompleteFile = splitFileByChars(completeFile);
	const splitRows = splitFileToRows(splitCompleteFile);

	//resetting all variables used by the format
	if ( actualFormat.usedVariables ) {
		actualFormat.usedVariables.forEach( (variable) => {
			variableObject[variable] = false;
		} )
	}

	//init the format variables if needed
	if ( actualFormat.onInit ) {
		actualFormat.onInit.forEach( ( varFun ) => {
			variableObject[varFun.variable] = varFun.function( { splitCompleteFile, variableObject } )
		} )
	}

	let newSplitCompleteFile = [];

	let globalIndex = 0;

	splitRows.forEach((splitRow) => {
		let coloredRow = [];
		for (let index = 0; index < splitRow.length; index++) {
			const word = splitRow[index];

			//update variables on each split
			if ( actualFormat.onEachSplit ) {
				actualFormat.onEachSplit.forEach( ( varFun ) => {
					variableObject[varFun.variable] = varFun.function( { splitCompleteFile, variableObject, word, index, globalIndex } )
				} )
			}

			const coloredFragment = colorWord(word, index, splitRow);
			coloredRow.push(coloredFragment);
		}
		//we sum two bc \r and \n are ignored every lane
		globalIndex += splitRow.length + 2;
		coloredRow = fixNewLines( coloredRow );
		if ( Array.isArray( coloredRow ) ) {
			newSplitCompleteFile.push( ...coloredRow);
		}else{
			newSplitCompleteFile.push( coloredRow );
		}
	});
	
	return newSplitCompleteFile;
}


//If the row contains newLine \n, we should create individual rows for each newLine, if is inside a color, we should extend the color
function fixNewLines( coloredRow ) {

	let newColoredRow = [];
	let lines = 0;

	if ( coloredRow.length == 0 ) {
		return coloredRow.join("");
	}

	coloredRow.forEach( (split) => {
		let tempSplit = split
		let lastColor;

		//Only if is needed to color multiple rows
		if ( tempSplit.indexOf("\n") != -1 ) {
			if ( tempSplit.lastIndexOf("$#") != -1  ) {
				lastColor = tempSplit.substr( tempSplit.lastIndexOf("$#"), 8 )
			}
		}

		while ( tempSplit.indexOf("\n") != -1 ) {
			if ( !newColoredRow[lines] ) {
				newColoredRow[lines] = [];
			}
			newColoredRow[lines].push( tempSplit.substr( 0, tempSplit.indexOf("\n") + 1 ) + "#$" )
			tempSplit = lastColor + tempSplit.substr( tempSplit.indexOf("\n") + 1 );
			lines++;
		}
		
		if ( !newColoredRow[lines] ) {
			newColoredRow[lines] = [];
		}
		newColoredRow[lines].push( tempSplit )
	});
	return newColoredRow.map( row => { return ( row.length == 0 ) ? "" : row.join("") });
}

//Split the row each time it find a value on splitChars
//Use it to split value characters and not going for each char on string
function splitFileByChars(text, archiveType) {
	const splittedRow = [];
	const rowChars = [...text];
	let startPosition = 0;

	//ignore what is in between those characters
	//when there are comment characters inside string, we should ignore
	let insideComment = ['"', "'", "`", "´"];
	let lastCommentChar = null;

	//slash comment types
	let insideSimpleComment = false;
	let insideMultipleComment = false;

	for (let index = 0; index < rowChars.length; index++) {
		const letter = rowChars[index];

		if (startPosition > index) {
			continue;
		}
		
		if ( actualFormat.slashComment ) {
			if (!lastCommentChar) {
				if (insideSimpleComment) {
					if (letter == "\r") {
						if (index + 1 < rowChars.length) {
							const nextLetter = rowChars[index + 1];
							if (nextLetter == "\n") {
								insideSimpleComment = false;
								if (index - startPosition != 0) {
									splittedRow.push(text.substr(startPosition, index - startPosition));
								}
								splittedRow.push(letter);
								startPosition = index + 1;
								continue;
							}
						}
					}

					continue;
				}

				if (insideMultipleComment) {
					if (letter == "*") {
						if (index + 1 < rowChars.length) {
							const nextLetter = rowChars[index + 1];
							if (nextLetter == "/") {
								insideMultipleComment = false;
								if (index - startPosition != 0) {
									splittedRow.push(text.substr(startPosition, index + 2 - startPosition));
								}
								startPosition = index + 2;
								continue;
							}
						}
					}

					continue;
				}

				if (letter == "/") {
					if (index + 1 < rowChars.length) {
						const nextLetter = rowChars[index + 1];
						if (nextLetter == "/") {
							insideSimpleComment = true;
							continue;
						}
						if (nextLetter == "*") {
							insideMultipleComment = true;
							continue;
						}
					}
				}
			}
		}

		//if is something we should start to ignore, we ignore until the character appears again
		if (lastCommentChar) {
			if (lastCommentChar == letter) {
				lastCommentChar = null;
			}
		} else {
			let insideCommentChar;
			insideComment.every((ignore) => {
				if (letter == ignore) {
					insideCommentChar = ignore;
					return false;
				}
				return true;
			});

			if (insideCommentChar) {
				lastCommentChar = insideCommentChar;
			}
		}

		if (splitChars.indexOf(letter) != -1) {
			//if the last also was a splitChar
			if (index - startPosition != 0) {
				splittedRow.push(text.substr(startPosition, index - startPosition));
			}
			splittedRow.push(letter);
			startPosition = index + 1;
		}
	}

	splittedRow.push(text.substr(startPosition));

	return splittedRow;
}

//Split file in rows.
//Every row ends when /r/n is found 
///r/n is not inside the rows that are return.
function splitFileToRows(splitCompleteFile) {
	const rows = [];
	let lastRowIndex = 0;

	for (let index = 0; index < splitCompleteFile.length; index++) {
		const split = splitCompleteFile[index];
		if (split == "\r") {
			if (index + 1 < splitCompleteFile.length) {
				const nextSplit = splitCompleteFile[index + 1];
				if (nextSplit == "\n") {
					rows.push(splitCompleteFile.slice(lastRowIndex, index));
					lastRowIndex = index + 2;
				}
			}
		}
	}

	rows.push(splitCompleteFile.slice(lastRowIndex));

	return rows;
}

//Function that analyze the coloredWord with the format of the file
//and then add a code to color later, the color code is $#hexcolor #$
function colorWord(coloredWord, index, row) {
	if (coloredWord.trim() == "") {
		return coloredWord;
	}

	let returnWord = colorFormats(coloredWord, index, row);
	if (returnWord != "") {
		return returnWord;
	}

	return coloredWord;
}

function colorFormats(coloredWord, index, row) {
	let returnWord = "";

	actualFormat.colors.every((format) => {
		//word trimmed
		//search position
		let searchIndex = index;
		if (format.search) {
			if (format.searchPos) {
				searchIndex += format.searchPos;
			}

			if (searchIndex >= row.length) {
				return true;
			}
		}
		const wordTrimmed = row[searchIndex].trim();

		let conditionsFulfilled = true;
		let wordFound = false;

		//search
		if (!format.search) {
			wordFound = true;
		} else {
			format.search.forEach((word) => {
				if (word instanceof RegExp) {
					if (wordTrimmed.search(word) != -1) {
						wordFound = true;
						return;
					}
				} else {
					if (wordTrimmed == word) {
						wordFound = true;
						return;
					}
				}
			});
		}

		if (!wordFound) {
			return true;
		}

		//conditions
		if (format.conditions) {
			format.conditions.forEach((condition) => {
				if (condition.startsWith("!")) {
					if (variableObject[condition.substr(1)]) {
						conditionsFulfilled = false;
						return;
					}
				} else {
					if (!variableObject[condition]) {
						conditionsFulfilled = false;
						return;
					}
				}
			});
		}

		if (!conditionsFulfilled) {
			return true;
		}

		//color
		if (format.color) {
			returnWord = format.color + coloredWord + "#$";
		}

		//variables
		if (format.variables) {
			format.variables.forEach((variable) => {
				if (variable.startsWith("!")) {
					variableObject[variable.substr(1)] = false;
				} else {
					variableObject[variable] = true;
				}
			});
		}

		if (format.continue) {
			return true;
		}
		return false;
	});

	return returnWord;
}