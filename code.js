/*
*Author: Rumen Kasabov
*ID: 10128754
*Tutorial Section: T01
*/


function getStats(txt) {
    return {
        nChars: numberOfCharacters(txt),
        nWords: numberOfWords(txt),
        nLines: numberOfLines(txt),
        nNonEmptyLines: numberOfNonEmptyLines(txt),
        averageWordLength: avgWordLength(txt),
        maxLineLength: maximumLineLength(txt),
        palindromes: palindrs(txt),
        longestWords: longestWrds(txt),
        mostFrequentWords: mostFreqWords(txt)
    };
}

let numberOfCharacters = function nChars(txt) {
    return txt.length;

}

function obtainWordsList(txt) {

     let emptyText = 0;

    //Check that string contains non white spaces
    if (txt.match(/\S/gm)) {


        //Convert strings to lower case characters before obtaining words
        let words = txt.toLowerCase();

        //Then get rid of all special characters (non-word symbols) (also /n and /r)
        //Regex: Replace all non words with " ", capital letters included just in case
        words = words.replace(/[^a-zA-Z0-9]/gm, " ");

        //Get rid of whitespace at the beginning and end of string
        words = words.trim();

        //Split words into an array of words 
        //Regex: Do not include any other white spaces
        words = words.split(/\s+/);

        return words;
    }

    //Otherwise no words found
    else {

        return emptyText;
    }


}

let numberOfWords = function nWords(txt) {


    let words = obtainWordsList(txt);

    return words.length;

}


let numberOfLines = function nLines(txt) {

    let empty = 0;

    if (txt.length !== 0) {

        //The length of line feed split array elements (lines)
        let numOfLines = txt.split(/\n/).length;

        return numOfLines;
    }

    else {

        return empty;
    }

}

let numberOfNonEmptyLines = function nNonEmptyLines(txt) {

        let nonEmptyLinesCount = 0;;
        let empty = 0;

    if (txt.length !== 0) {

        //The line feed split array elements    
        let numOfLines = txt.split(/\n/);

        let i = 0;

        //Loop through array elements and add to count for each non empty line
        while (i < numOfLines.length) {

            //If the length of element is 1 or more and the
            //line contains non empty characters add to count (line is not empty)
            if (numOfLines[i].length >= 1 && numOfLines[i].match(/\S/g)) {

                nonEmptyLinesCount++;

            }

            i++;
        }

        return nonEmptyLinesCount;
    }

    else {

        return empty;
    }


}

let avgWordLength = function averageWordLength(txt) {

    let wordSum = 0;
    let average = 0;

    let words = obtainWordsList(txt);

    if (words != 0) { 

        for (let i = 0; i < words.length; i++) {

            wordSum += words[i].length;

        }

        return average = wordSum/words.length;
    }

    else {
        return 0;
    }

}

let maximumLineLength = function maxLineLength(txt) {

    if (txt.length !== 0) {

        //The line feed split array elements (lines)
        let linesArray = txt.split(/\n/);

        let longestLine = linesArray[0];

        for (let i in linesArray) {

            if (linesArray[i].length > longestLine.length) {

                longestLine = linesArray[i];
            }

        }

        return longestLine.length;

    }

    else {

        return 0;
    }

}

let palindrs = function palindromes(txt) {

    let palindromeArray = [];
    let reversedWord = "";

    let words = obtainWordsList(txt);

    for (let i = 0; i < words.length; i++) {

        if (words[i].length > 2) {

            //The word is split into an array of each character, then the array is reversed
            //and then the reversed characters are joined to form a string into variable
            reversedWord = words[i].split("").reverse().join("");

            //If reversed word is a palindrome, add it to the palindrome array
            if (reversedWord === words[i]) {

                //First check to see if the word doesn't already exist in the array
                if (palindromeArray.indexOf(reversedWord) === -1) {

                    palindromeArray.push(reversedWord);
                }
            }

        }

    }

    return palindromeArray;



}

let longestWrds = function longestWords(txt) {

    const MIN = 0;
    const MAX = 10;

    let longWordArr = [];


   let words = obtainWordsList(txt);

   if (words != 0) {

        words.sort(stringSort);

        //Make sure its only the 10 longest words
        words.slice(MIN, MAX);

            //Remove any duplicates
        for (let i in words) {

            //If the final array doesn't contain the word, add it
            if (longWordArr.indexOf(words[i]) === -1) {

                  longWordArr.push(words[i]);

           }
        }
    }


    return longWordArr;





}

function stringSort(firstElement, secondElement) {

    let positiveVal = 1;
    let negativeVal = -1;
    let equalVal = 0;

    //If the first word is smaller than the second, sort the second
    //to a lower index in the array
    if (firstElement.length < secondElement.length) {

        return positiveVal;
    }

    //else sort the first word to a lower index
    else if (firstElement.length > secondElement.length) {

        return negativeVal;
    }

    //Otherwise they are the same size
    else {

        //Check for alphabetical order
        //If the first word is of higher order, sort the second word
        //to a lower index in the array
        if (firstElement > secondElement) {

            return positiveVal;
        }

        //Otherwise if the second word is of higher order than the first
        //sort the first word to a lower index in the array
        else if (firstElement < secondElement) {

            return negativeVal;
        }

        //Else they are both the same
        else {

            return equalVal;
        }

    }
}

let mostFreqWords = function mostFrequentWords(txt) {

    const MIN = 0;
    const MAX = 10;

    let freqWordArr = [];
    let finalFreqWordArr = [];

    let words = obtainWordsList(txt)

    if (words != 0) {
        
        let arrayCopy = words.slice(0); //0 for faster performance

        let outerIndex = 0;
        let innerIndex = 0;

        for (outerIndex in words) {

            let count = 0;
            let currWord = words[outerIndex];

            for (innerIndex in arrayCopy) {

                let nextWord = arrayCopy[innerIndex];

                //If the current word of the original array exists for the next word
                //being counted in the copy array, delete it from the copy array and increment
                //the count  
                if (currWord === nextWord) {

                    delete arrayCopy[innerIndex];

                    count++;

                }

            }

            //Given the count is greater than 0 (array at least not empty),
            //Account for word and associated frequency
            if (count > 0) {
                let freqWord = {word: currWord, frequency: count};
                freqWordArr.push(freqWord);
            }

        }


        freqWordArr.sort(function(a, b) {

            //If word a has a higher count than word b, put a at
            //a lower index than b
            if (a.frequency > b.frequency) {

                return -1;
            }

            //Otherwise, put b at a lower index than a
            else if (a.frequency < b.frequency) {

                return 1;
            }

            //Otherwise they are equal count, check for alphabetical order
            else {

                //Check for alphabetical order
            //If the first word is of higher order, sort the second word
            //to a lower index in the array
            if (a.word > b.word) {

                return 1;
            }

            //Otherwise if the second word is of higher order than the first
            //sort the first word to a lower index in the array
            else if (a.word < b.word) {

                return -1;
            }

            //Else they are both the same
            else {

                return 0;
            }

            }
        });

        //Create the final array containing the strings
        for (let i = 0; i < freqWordArr.length; i++) {

            finalFreqWordArr[i] = freqWordArr[i].word + "(" + freqWordArr[i].frequency + ")";
        }

        finalFreqWordArr.slice(MIN, MAX);
    }

    return finalFreqWordArr;

}

