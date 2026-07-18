
// Assets
import Pepperoni from "../assets/image/Pepperoni.jpeg";
import Cheeseburger from "../assets/image/Cheeseburger.png";
import GrilledChickenSandwich from "../assets/image/Grilled Chicken Sandwich.jpeg";
import CaesarSalad from "../assets/image/Caesar Salad.png";
import FrenchFries from "../assets/image/French Fries.png";
import Cappuccino from "../assets/image/Cappuccino.jpeg";




const cartData = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    price: 5,
    quantity: 1,
    image: Pepperoni,
    category: "Italian Pizza",
  },
  {
    id: 2,
    name: "Classic Cheeseburger",
    price: 4.5,
    quantity: 3,
    image: Cheeseburger,
    category: "Burgers",
  },
  {
    id: 3,
    name: "Grilled Chicken Sandwich",
    price: 4,
    quantity: 2,
    image: GrilledChickenSandwich,
    category: "Sandwiches",
  },
  {
    id: 4,
    name: "Caesar Salad",
    price: 3.5,
    quantity: 1,
    image: CaesarSalad,
    category: "Salads",
  },
  {
    id: 5,
    name: "French Fries",
    price: 2,
    quantity: 3,
    image: FrenchFries,
    category: "Sides",
  },
  {
    id: 6,
    name: "Cappuccino",
    price: 2.5,
    quantity: 2,
    image: Cappuccino,
    category: "Coffee",
  },
];

export default cartData;
