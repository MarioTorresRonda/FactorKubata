import { JSX } from "./JSX";
import { JS } from "./JS";

/* 
    formats to apply for each archive type (JS, JSX, HTML, ...)

    slashComment - true or false, the language keyword for comments is slash (//)

    colors - an Array of object that apply the color if the search and conditions are fulfilled, also can update variables of variableObject
        key - Color used on the HTML tag
        search - word to color, can be array or regex
        searchPos - update pointer position on search, always number,  look the split section in the index altered by the searchPos,
            example: if is 1, we search the split that is next, if is -1, it search the split before
        conditionals - variables needed to add the color, if start with !, is turn to false, if not, to true 
        variables - change the value of that variable inside variableObject, if start with !, is turn to false, if not, to true 

    usedVariables - an Array os string, each string being the variable on variableObject that are used, to reset each time we start

    onInit - an Array of object containing a string with the name of a variable and a function,
    on the start of execution, update the variable on variableObject by the return of the function, passing an object with:
        splitCompleteFile : completeFile with all the splits, it contains also \n and \r
        variableObject : object with all the variables

    onEach - an Array of object containing a string with the name of a variable and a function,
    on each split, update the variable on variableObject by the return of the function, passing an object with:
        splitCompleteFile : completeFile with all the splits, it contains also \n and \r
        variableObject : object with all the variables,
        word : actual split
        rowIndex : the actual row index
        globalIndex : the global index associate with splitCompleteFile
 */

export const formats = {
    JSX,
    JS
};