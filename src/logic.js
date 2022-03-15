
/////////////////////////////////////////////MAIN LOGIC/////////////////////////////////////////////
export function buttonClick(value, buffer)
{
    
    buffer = filter(add(buffer,value));
    if(lastChar(buffer) === "=")
    {
        return reduce(buffer);
    }
    else
        return buffer;
}

//////////////////////////////////////////////////MAIN LOGIC///////////////////////////////////////////////////////

/////////////////////////////////////////////MAIN PURE FUNCTIONS//////////////////////////////////////////////////


function filter(string)
{
    switch(lastChar(string))//filter wrong click's thats make invalid operations ,reset the buffer or erase the last char
    {
        case 'C':
            return "0";

        case '=':
            if(isOperator(beforeLastChar(string)))
                return sliceForward(string, string.length-2).concat("=");
            return string;

        case '←':
            if(string === "0")
                return "0";
            if(string.length <= 2)
                return "0";
            return sliceForward(string, string.length-2);

        default:
            if(isOperator(beforeLastChar(string)))
            {
                if(isOperator(lastChar(string)))
                    return sliceForward(string, string.length-1);
                return string;
            }
            return string;
    } 
}

function reduce(string) // use recursion to make a operation and return concacnated with the rest of the hole operation
{
    if(string.includes("×") && !stringBeforeChar(string,"×").includes("÷"))// make sure that we are doing the operations in order
        return reduce(stringBeforeOperation(string,"×") + timesReduce(string) + stringAfterOperation(string,"×"));
    if(string.includes("÷"))//we have to star with "×" and "÷" operators
        return reduce(stringBeforeOperation(string,"÷") + divideReduce(string) + stringAfterOperation(string,"÷"));
    if(string.includes("+") || withoutFirstChar(string).includes("-")) // we can´t consider the minus of a negative number when searching for a operation
        return reduce(plusNMinusReduce(string));
    return withoutLastChar(string);
}


/////////////////////////////////////////////MAIN PURE FUNCTIONS/////////////////////////////////////////////////

////////////////////////////////////////////BASIC PURE FUNCTIONS//////////////////////////////////////////////////

function add(string, clicked)//return added char in the end of string
{
    if(string === "0" && !isOperator(clicked))
    {
        return clicked;
    }
    else if(string === "0" && isOperator(clicked))
        return "0";

    return string + clicked;
}

function withoutFirstChar(string)//return the string without the first char
{
    return sliceBefore(string,1);
}

function firstChar(string)//return the first char of a string
{
    return string[0];
}

function lastChar(string)// return the last char of a String
{
    return sliceBefore(string,string.length -1);
}

function withoutLastChar(string)// return the string without the last char
{
    if(string.length === 0)
        return "0";
    return sliceForward(string,string.length-1);
}

function beforeLastChar(string)//return the antepenultimate char of a string
{
    return string[string.length -2];
}

function sliceForward(string, index)//return the string before the index
{
    return string.slice(0, index);
}

function sliceBefore(string, index)//return the string after the index
{
    return string.slice(index);
}

function isOperator(char)// return true if its a operator(+,-,×,÷,← or C)
{
    return isNaN(parseInt(char));
}

function mapString(string)//map numbers from a operation into string
{
    return string.toString();
}
///////////////////////////////////////////// BASIC PURE FUNCTIONS//////////////////////////////////////////////////

///////////////////////////////////////// ESPECIFIC PURE FUNCTIONS//////////////////////////////////////////////////

///////////////////////times and divide functions////////////////////////

//////////times and divide operation
function timesReduce(string)//times operation
{
    return mapString(mapNumberBeforeOperator(string,"×") * mapNumberAfterOperator(string,"×"));
}

function divideReduce(string)//divide operation
{
    return maxLimitString(mapString(mapNumberBeforeOperator(string,"÷") / mapNumberAfterOperator(string,"÷")));
}
//////////times and divide operation

//////////search for the number for the operation
function lastNumber(string)//return the number after the operator
{
    if(string.length === 0)
        return "";
    if(isOperator(lastChar(string)) && lastChar(string) !== ".")
            return "";
    return  lastNumber(withoutLastChar(string)) + lastChar(string);
}

function firstNumber(string)//return the number before the operator
{
    if(string.length === 0)
        return "";
    if(isOperator(firstChar(string)) && firstChar(string) !== ".")
        return "";
    return firstChar(string) + firstNumber(withoutFirstChar(string));
}

function mapNumberBeforeOperator(string,operator)//map number before the operator into float
{
    return parseFloat(lastNumber(stringBeforeChar(string,operator)));
}

function mapNumberAfterOperator(string,operator)//map number after the operator into float
{
    return parseFloat(firstNumber(stringAfterChar(string,operator)));  
}
//////////search for the number for the operation

/////////////text before and after operation
///text before operation
function stringBeforeOperation(string, operator)//return the string before the operation
{
    return stringBeforeNumber(stringBeforeChar(string,operator));
}

function stringBeforeChar(string,char)//return the string before a char
{
    return sliceForward(string,charParameter(string,char,0)) ;
}

function stringBeforeNumber(string)//return the string before a number
{
    if((isOperator(lastChar(string))  && lastChar(string) !== "." )|| string.length === 0)
        return string;
    return stringBeforeNumber(withoutLastChar(string));
}
///text before operation

///text After operation
function stringAfterOperation(string, operator)//return the string after the operation
{
    return stringAfterNumber(stringAfterChar(string, operator));
}

function stringAfterChar(string,char)//return the string after a char
{
    return sliceBefore(string,charParameter(string,char,0)+1) 
}

function stringAfterNumber(string)//return the string after a number
{
    if((isOperator(firstChar(string)) && firstChar(string) !== "." ) || string === "=")
        return string;
    return stringAfterNumber(withoutFirstChar(string));
    
}
///text After operation

function charParameter(string,char,Parameter)//return the parameter of the operator
{
    if(string[Parameter] === char)
        return Parameter;
    return charParameter(string,char,Parameter+1);
}

/////////////text before and after operation

function maxLimitString(string)// limit to big results of divide, like 0.33333...
{
    if(string.length > 5)
        return sliceForward(string,5);
    return string;
}

///////////////////////times and divide functions////////////////////////

////////////////////////plus and minus functions/////////////////////////

//////////return a number and a singnal in the string
//NNNO or -NNNO (Number and Operator)
function mapOperatorNumberOperator(string)
{
    if(firstChar(string) === "-")
        return "-" + mapNumberOperator(withoutFirstChar(string));
    return mapNumberOperator(string);
}
function mapNumberOperator(string)
{
    if(string.length === 0)
        return "";
    if(isOperator(firstChar(string)) && firstChar(string) !== "." )
        return firstChar(string);
    return firstChar(string) + mapNumberOperator(withoutFirstChar(string));
}
//////////return a number and a singnal in the string

/////////////////////simple Math
function plusNMinusReduce(string)//use recursion to operate and concacnate with the rest of the string
{
    if(mapNumberOperator(string) === "=" )
        return string;
    return plusNMinusmath(plusNMinusFirstNumber(string),plusNMinusSecondNumber(string),plusNMinusOperator(string)).concat(plusNMinusAfterOperation(string));
}

function plusNMinusmath(first, second, operator)//operation
{
    if(operator === "+")
        return mapString(parseFloat(first) + parseFloat(second));
    else
        return mapString(parseFloat(first) - parseFloat(second));

}

function plusNMinusFirstNumber(string)//return the first number in the string
{
    return withoutLastChar(mapOperatorNumberOperator(string));
}
function plusNMinusSecondNumber(string)//return the second number in the string
{
    return withoutLastChar(mapNumberOperator(sliceBefore(string,mapOperatorNumberOperator(string).length)))
}
function plusNMinusOperator(string)//return the operator in the string
{
    return lastChar(mapOperatorNumberOperator(string));
}
function plusNMinusAfterOperation(string)//return the string after the operation
{
    return string.slice(mapOperatorNumberOperator(string).length + mapNumberOperator(string.slice(mapOperatorNumberOperator(string).length)).length-1);
}

////////////////////////plus and minus functions/////////////////////////

///////////////////////////////////////// ESPECIFIC PURE FUNCTIONS//////////////////////////////////////////////////

