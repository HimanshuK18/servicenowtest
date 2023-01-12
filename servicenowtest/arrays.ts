let v: any = true;
v = "string"; // no error as it can be "any" type, so it disables type checking

// type-safe counterpart of any type, unknown isn’t assignable to anything but itself and any,
// without performing a type assertion
let u: unknown = 55;
if (typeof u === "string")
{ let w: string = u;}

// create an array of type string and push value 
const names: string[] = ["smith"];
names.push("Dylan");
// names = ["Tom"]  //  The value of a constant can't be changed through reassignment 
// names.push(2);   // throw error as it array of type string

let namess: readonly string[] = ["Dylan"];
//namess.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.


//A tuple is a typed array with a pre-defined length and types for each index.
//Tuples are great because they allow each element in the array to be a known type of value.
let ourTuple: [number, boolean, string];
ourTuple = [5, false, 'Coding God was here'];
ourTuple.push("New text");
//A good practice is to make your tuple readonly. As in the above example we can add forth element to the array 
// of any type

const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];

//Named tuples allow us to provide context for our values at each index.
const graph: [x: number, y: number] = [55.2, 41.3];