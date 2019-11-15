/* 
Minimal Viable Product:

A namespace to hold the entire app:
const plantShop = {};


An object that contains an array of objects that contain info on each individual plant
plantShop.plantData = [
    {
    name: "Philodendron Hederaceum",
    toxic: true,
    lowLight: true,
    droughtResistant: true,
    price: 20
    },
    {
    name: "Monstera Deliciosa",
    toxic: true,
    lowLight: true,
    droughtResistant: false,
    price: 20
    }
];

When the user clicks Sort by lowLight,
- Empty whatever is in the plant results div currently
- Loop through all the objects in the plantData array
    If item has a property of lowLight: true
        Append a div containing the image and all the plant's info in a new div *** could probably be a reuseable function for all the different filters

Do the same for bright light, toxicity, and drought resistance to allow the user to filter through different plant properties

When the user clicks the Add to Cart button:
- The Cart element slides out from the side
- Add the item to the cart array
    - Loop through the cart and append all the items to the cart section
- Add 1 to the quantity span the user sees
- Add the price of the new plant to the subtotal price
- Multiply the subtotal by 13% to calculate tax

When the user clicks the Remove from Cart button:
- Subtract this element's price from the subtotal
- Recalculate the total
- Delete item from the Cart

When the user increases the quantity of a specific item:
- Increment the quantity item the user sees
- Use parseInt to increase the quantity 

When the user clicks the X on the Cart:
- The Cart element slides back to be hidden off the screen
- Use parseInt to convert the quantity value to a number
- Multiply the price of the item by the quantity
- Recalculate the subtotal
- Recalculate the total with tax and shipping included


*/


