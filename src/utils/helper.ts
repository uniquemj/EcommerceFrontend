
export const upperCase = (word: string) =>{
    return word[0].toUpperCase() + word.slice(1)
}

export const getInitialName = (word: string):string =>{
    const wordArray = word.split(" ")
    const result = wordArray[0][0].toUpperCase()+wordArray[1][0].toUpperCase()
    return result
}