 export function sayHelloWorld() {
    return "Hello World!";
}


 const letterCount = (char: string, string: string) => {
    let lettersMap = string.split('').reduce((acc: any, currentLetter) => {
        if (acc[currentLetter]) {
            acc[currentLetter] += 1
        }
        else {
            acc[currentLetter] = 1
        }
        return acc
    }, {})
    return lettersMap[char]
}

export { letterCount };