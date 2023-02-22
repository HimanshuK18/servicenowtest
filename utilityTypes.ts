//Partial changes all the properties in an object to be optional.
interface Point {
    x: number;
    y: number;
  }
  
  let pointPart: Partial<Point> = {}; // `Partial` allows x and y to be optional
  pointPart.x = 10;

  //Required changes all the properties in an object to be required.
  interface Car {
    make: string;
    model: string;
    mileage?: number;
  }
  
  let myCar: Required<Car> = {
    make: 'Ford',
    model: 'Focus',
    mileage: 12000 // `Required` forces mileage to be defined
  };
  
  //Record is a shortcut to defining an object type with a specific key type and value type.
  const nameAgeMap: Record<string, number> = {
    'Alice': 21,
    'Bob': 25
  };

  //Omit removes keys from an object type.
  interface Person {
    name: string;
    age: number;
    location?: string;
  }
  
  const boby: Omit<Person, 'age' | 'location'> = {
    name: 'Bob'
    // `Omit` has removed age and location from the type and they can't be defined here
  };

  //Pick removes all but the specified keys from an object type.
  interface Person {
    name: string;
    age: number;
    location?: string;
  }
  
  const bob: Pick<Person, 'name'> = {
    name: 'Bob'
    // `Pick` has only kept name, so age and location were removed from the type and they can't be defined here
  };

  //Exclude removes types from a union.
type Primitive = string | number | boolean
const value: Exclude<Primitive, string> = true;  // a string cannot be used here since Exclude removed it from the type.

//ReturnType extracts the return type of a function type.
type PointGenerator = () => { x: number; y: number; };
const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};

//Parameters extracts the parameter types of a function type as an array.
type PointPrinter = (p: { x: number; y: number; }) => void;
const points: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};