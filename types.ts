//javascript object 
const car = { type: "Fiat", model: "500", color: "white" };
//typescript object
const carType: { typeCar: string, model: string, year: number } = {
    typeCar: "Toyota",
    model: "Corolla",
    year: 2009
};

//Index signatures can be used for objects without a defined list of properties.
const nameAge: { [index: string]: number } = {};
nameAge.Jack = 25; // no error
//nameAge.Mark = "Fifty"; // Error: Type 'string' is not assignable to type 'number'.