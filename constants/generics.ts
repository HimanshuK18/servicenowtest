//this function accepts only number input
export function identity(arg: number): number {
    return arg;
}
//this function acceptsany input
export function identityA(arg: any): any {
    return arg;
}

/*
While using any is certainly generic in that it will cause the function to accept any and all types 
for the type of arg, we actually are losing the information about what that type was when the function
 returns. If we passed in a number, the only information we have is that any type could be returned.
 While using any is certainly generic in that it will cause the function to accept any and all types 
 for the type of arg, we actually are losing the information about what that type was when the 
 function returns. If we passed in a number, the only information we have is that any type could be 
 returned.
 */
export function identityG<Type>(arg: Type): Type {
    //console.log(arg.length);//error as kength is not a prpty of all types
    return arg;
}
let output = identityG<string>("myString");