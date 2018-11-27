const prime_factors = require('prime-factors')
const  isPrime = require('prime-number')

function getPRimeFactors(n) {
    const factorArrays = prime_factors(n)
    const factorObject ={};
    factorArrays.forEach(x =>{
        if(factorObject[x]){
            factorObject[x] = factorObject[x]+1
        }else{
            factorObject[x] = 1
        }
    })
    console.log(fillZeroPrimes(factorObject))
    return fillZeroPrimes(factorObject)
}

function fillZeroPrimes(factorsObject) {
    for (let i =2 ; i <findMaxInArray(Object.keys(factorsObject)); i++){
        if (isPrime(i) && !factorsObject[i]){
            factorsObject[i] = 0
        }
    }
    return factorsObject
}

function findMaxInArray(array) {
    let max =0
    array.forEach(x =>{
        x = Number(x)
        if(x >max){
            max = x
        }
    })
    return max
}

function getFormulaforExponent(codesObject) {
    const label = getLabelNameFromNumber(codesObject.labelCode);
    const variable = getVariableNameFromNumber(codesObject.variableCode);

   return `${label} ${convertCodeToCommand(codesObject.commandCode, variable)}`
    
}

function extractCodesFromExponent(exponent) {
    const labelCode = findXandY(exponent).x
    const y = findXandY(exponent).y
    const commandCode = findXandY(y).x
    const  variableCode = findXandY(y).y
    return {labelCode,commandCode,variableCode}
}

function findXandY(number) {
    //2^x(2^y +1)-1
    number ++
    let x = 0
    while (number%2 ==0 ){
        number = number/2
        x++
    }
    let y = (number-1)/2
    return {x,y}
}

function getLabelNameFromNumber(x) {
    if (x ==0 )return ""
    let array = ['A','B','C','D','E']
    let module = x%5 -1
    if (module ==-1)module = 4
    const label = array[module] + (Math.ceil(x/5))
    return `[ ${label} ]`


}
function getVariableNameFromNumber(x) {
    if (x ==0 )return "Y"
    let array = ['Z','X']
    let module = x%2
    const label = array[module] + (Math.ceil(x/2))
    return label


}

function convertCodeToCommand(codeNumber, variableName) {
    let command
    switch (codeNumber){
        case 0:
            command = `${variableName} <- ${variableName}`
            break
        case 1:
            command = `${variableName} <- ${variableName} + 1`
            break
        case 2:
            command = `${variableName} <- ${variableName} - 1`
            break
        default:
            command = `IF ${variableName}!=0  GOTO ${getVariableNameFromNumber(codeNumber-2)}`
            break
    }
    return command
}

// getPRimeFactors(168)
function getFullCoding(number) {
    number ++
    const primeFactors = getPRimeFactors(number)
    console.log()
    let fullFormula = ""
    let i = 1
    Object.keys(primeFactors).forEach(x => {
        const formulaCodeObj = extractCodesFromExponent(primeFactors[x])
        console.log("codeObj : ", formulaCodeObj)
        const formula = getFormulaforExponent(formulaCodeObj)
        fullFormula = fullFormula+`\n${i}- ${formula}`
        i++

    })
    return fullFormula
}
// console.log("getLabelNameFromNumber( ) : ", getFormulaforExponent(extractCodesFromExponent(1407)))
// console.log('full formula : ', getFullCoding(199))
module.exports = {getFullCoding}