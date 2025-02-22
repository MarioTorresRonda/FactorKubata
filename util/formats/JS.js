export const JS = {
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
        //JS
        {color: "$#179DFC", search: ["[", "]"]},
        {color: "$#9966BB", search: ["var", "const", "let"]},
        {color: "$#225589", search: ["export", "default", "=", "+", "-", "/", "*", "!", "<", ">", "return"], variables: []},
        {color: "$#225588", search: ["import", "new"]},
        {color: "$#22558A", search: ["from"]},
        {color: "$#9966B8", search: ["function"], variables: ["nextWordFunction"]},
        {color: "$#9966B9", search: ["."], variables: ["!nextWordFunction"]},
        {color: "$#DDBB88", searchPos: 1, search: ["("]},
        {color: "$#DA70D6", search: ["("], variables: ["!nextWordFunction"]},
        {color: "$#DA70D6", search: [")"], variables: [""]},
        {color: "$#DDBB88", search: null, conditions: ["nextWordFunction"], variables: ["!nextWordFunction"]},
        {color: "$#F280D0", search: ["false", "true", "{", "}", "null"]},
        {color: "$#F280D0", search: [/^\d+$/g]},
    ],
    usedVariables: [
        "lastCharBackSlash",
        "isInsideSemiColon",
        "isInsideQuotation",
        "nextWordFunction",
    ]
}