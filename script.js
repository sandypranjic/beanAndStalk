/* 
Bean and Stalk is a website that I created to practice my branding and design skills in a very practical way that could be useful to my portfolio later, as I'm sure during freelancing that creating websites for cafes and e-commerce will be very likely. The brand is an eco-friendly cafe that doubles as a small plant shop. 

The app is contained in a name-space called plantShop. The user has the ability to add plants to their shopping cart, and to have the cost of all the plants they added calculated (with and without tax). My stretch goals for the app are to add the ability to remove individual items from the cart (by quantity) and have the cost re-calculated. 

Because we haven't yet learned Firebase, I utilized the built-in localStorage on the browser to send data to the storage and be able to retrieve it. This means that the user can navigate to different pages of the website, or even exit their browser, and the items they added to their cart and the total cost all stays. The user has the ability to empty their cart and thus clear the localStorage.

The app starts with plantShop.plantData, which is a small "database" I created listing all the plants available in the store, and different attributes for all the plants (whether it can survive low light, if it's toxic to pets, etc). Each plant is an object inside of the plantData array. One of the functions of the app is that the user can filter through the list of plants depending on what plant attributes they're looking for. The way this works is that on line 97, there's a reuseable function called filterPlants() that lets the user click different buttons (starting on line 163) and it triggers a function that filters through the plantData array and finds only objects that match those attributes. Then each onclick event correlated to the filter attributes calls the filterPlants() function and passes its new filtered array as an argument. The filterPlants() function then appends that list to the HTML, and the plants are displayed.

Because localStorage only accepts a string, I had to keep using stringify() and parseInt() on the value when I would send it back to the localStorage, and retrieve it in a variable to use in the app and do numerical things that require an integer, like incrementing items in the cart and adding up the cost. I also had to use regEx a few times to remove spaces (.replace(/ /g,'')) from things like the user's search query and the name of the plant in the plantData array so that it would match the data in localStorage.

*/

const plantShop = {}

plantShop.plantData = [
    {  
        name: "Philodendron Hederaceum",
        commonName: "Philodendron",
        image: "./assets/philodendron.jpg",
        price: 20,
        lowLight: true,
        droughtResistant: false,
        toxic: true,
        alt: "A long vine plant",
    },
    {
        name: "Acanthocereus Tetragonus",
        commonName: "Fairy Castle Cactus",
        image: "./assets/acanthocereusTetragonus.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
        alt: "A tall cactus in a living-room setting",
    },
    {
        name: "Monstera Deliciosa",
        commonName: "Swiss-Cheese Plant",
        image: "./assets/monstera.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: false,
        toxic: true,
        alt: "Close-up of a plant with leaf fenestration",
    },
    {
        name: "Sansevieria Trifasciata",
        commonName: "Snake Plant",
        image: "./assets/snakePlant.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
        alt: "A snake plant in a brown pot",
    },
    {
        name: "Ficus Lyrata",
        commonName: "Fiddle Leaf Fig",
        image: "./assets/fiddleLeaf.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: false,
        toxic: true,
        alt: "A small tree with big leaves",
    },
    {
        name: "Ficus Elastica",
        commonName: "Rubber Tree Plant",
        image: "./assets/ficusElastica.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
        alt: "A close-up of a small tree plant with thick leaves",
    },
    {
        name: "Ferocactus Glaucescens",
        commonName: "",
        image: "./assets/ferocactusGlaucescens.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
        alt: "A small cactus in a plastic pot",
    },
    {
        name: "Echeveria",
        commonName: "",
        image: "./assets/graptoveriaTitubans.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: false,
        alt: "A photo of many small succulents",
    },
    {
        name: "Epipremnum Aureum",
        commonName: "Pothos",
        image: "./assets/pothos.jpg",
        price: 20,
        lowLight: true,
        droughtResistant: true,
        toxic: true,
        alt: "A long vine plant on a metal chair",
    }
];

plantShop.filterPlants = function(filterBy) {
    filterBy.forEach(function(individualPlant) {
        const plantHtml = `
            <div class="plant">
                <img src="${individualPlant.image}" class="plantShopImg" alt="${individualPlant.alt}">
                <div class="addToCartButton" data-name="${individualPlant.name}" data-image="${individualPlant.image}" data-price="${individualPlant.price}" data-alt="${individualPlant.alt}">
                    <span>Add To Cart</span>
                </div>
                <div class="nameAndPriceFlex">
                    <div>
                        <span class="name">${individualPlant.name}</span>
                    </div>
                    <div>
                        <span class="price">$${individualPlant.price}</span>
                    </div>
                </div>
            </div>
        `;
        $(".items").append(plantHtml);
    });
};

/* 
When the user clicks the .addToCartButton on each plant, the cartCounter is incremented by 1 so that the user can see how many items they have in the cart.

The on-click function first checks if the item already exists in the LocalStorage before appending the plant to the page. This is because if a user wanted to add more than one of the same plant, I didn't want it to keep appending the same plant to the cart. In the case of multiple of the same plant, the quantity of the plant is increased, but it doesn't append another image.
*/

$(".items").on("click", ".addToCartButton", function() {
    plantShop.cartCounter++;
    localStorage.cart = JSON.stringify(plantShop.cartCounter);
    $(".cartText").html(`Cart (${localStorage.cart})`);
    $(".numberOfItemsInOpenCart").html(`You have ${plantShop.cartCounter} items in your cart.`);
    let plantName = $(this).data("name");
    let plantPrice = $(this).data("price");
    let plantImage = $(this).data("image");
    let plantAlt = $(this).data("alt");
    let trimmedPlantName = plantName.replace(/ /g,'');
    let cartItemHtml = `
        <div class="plantInCart">
            <div class="plantInCartImg">
            <img src="${plantImage}" alt="${plantAlt}">
            </div>
            <div class="plantInCartText">
                <span class="plantInCartName ${trimmedPlantName}" data-name="${trimmedPlantName}" data-price="${plantPrice}" data-alt="${plantAlt}"></span>
                <span class="plantInCartPrice ${trimmedPlantName}" data-name="${trimmedPlantName}">$${plantPrice}</span>
            </div>
        </div>
    `;
    if (localStorage[trimmedPlantName] == "null" || localStorage[trimmedPlantName] == undefined) {
        localStorage[trimmedPlantName] = "1";
        $(".itemsInCart").append(cartItemHtml);
        $(`.plantInCartName.${trimmedPlantName}`).html(`${plantName} x 1`);
    } else if (localStorage[trimmedPlantName] >= 1) {
        let quantityOfThisPlant = parseInt(localStorage[trimmedPlantName]);
        quantityOfThisPlant++;
        localStorage[trimmedPlantName] = JSON.stringify(quantityOfThisPlant);
        let quantityTimesPrice = quantityOfThisPlant * plantPrice;
        $(`.plantInCartPrice.${trimmedPlantName}`).html(`$${quantityTimesPrice}`);
        $(`.plantInCartName.${trimmedPlantName}`).html(`${plantName} x ${quantityOfThisPlant}`);
    };
    let updatedPrice = parseInt(localStorage.totalPrice);
    let integerPrice = parseInt(plantPrice);
    updatedPrice = updatedPrice + integerPrice;
    $(".priceSubTotal").html(`$${updatedPrice}`);
    localStorage.totalPrice = JSON.stringify(updatedPrice);
    let updatedPriceWithTax = parseInt(localStorage.totalPriceWithTax);
    updatedPriceWithTax = updatedPrice * 0.13 + updatedPrice;
    updatedPriceWithTax = updatedPriceWithTax.toFixed(2);
    localStorage.totalPriceWithTax = JSON.stringify(updatedPriceWithTax).replace(/['"]+/g, '');
    $(".priceTotal").html(`$${localStorage.totalPriceWithTax}`);
});

$(".allPlants").on("click", function() {
    $(".items").empty();
    plantShop.filterPlants(plantShop.plantData);
});

$(".lowLight").on("click", function() {
    const lowLightPlants = plantShop.plantData.filter(function(individualPlant) {
        return individualPlant.lowLight === true;
    });
    $(".items").empty();
    plantShop.filterPlants(lowLightPlants);
});

$(".brightLight").on("click", function() {
    const brightLightPlants = plantShop.plantData.filter(function(individualPlant) {
        return individualPlant.lowLight === false;
    });
    $(".items").empty();
    plantShop.filterPlants(brightLightPlants);
});

$(".droughtResistant").on("click", function() {
    const droughtResistantPlants = plantShop.plantData.filter(function(individualPlant) {
        return individualPlant.droughtResistant === true;
    });
    $(".items").empty();
    plantShop.filterPlants(droughtResistantPlants);
});

$(".nonToxic").on("click", function() {
    const nonToxicPlants = plantShop.plantData.filter(function(individualPlant) {
        return individualPlant.toxic === false;
    });
    $(".items").empty();
    plantShop.filterPlants(nonToxicPlants);
});

$(".cartText").on("click", function() {
    $(".addToCart").removeClass("hideCart");
});

$(".addToCart").on("click", ".xCart", function() {
    $(".addToCart").addClass("hideCart");
});

/* 
reloadItemsInCart() checks what's in the localStorage and appends each item to the page everytime the page is loaded. The function is called in the init() so that the items are reloaded every single time the page is refreshed or the user navigates to a different page.
*/

plantShop.reloadItemsInCart = function() {
    plantShop.plantData.forEach(function(value) {
        let trimmedValue = value.name.replace(/ /g,'');
        let plantPrice = value.price;
        let plantImage = value.image;
        let plantAlt = value.alt;
        Object.keys(localStorage).forEach(function(savedItem) {
            if (savedItem === trimmedValue) {
                let quantityOfThisPlant = parseInt(localStorage[trimmedValue]);
                let quantityTimesPrice = quantityOfThisPlant * plantPrice;
                let plantWithFixedSpacing = savedItem.replace(/([a-z])([A-Z])/g, '$1 $2');
                let cartItemHtml = `
                <div class="plantInCart">
                    <div class="plantInCartImg">
                    <img src="${plantImage}" alt="${plantAlt}">
                    </div>
                    <div class="plantInCartText">
                        <span class="plantInCartName ${trimmedValue}" data-name="${trimmedValue}" data-price="${plantPrice}">${plantWithFixedSpacing} x ${quantityOfThisPlant}</span>
                        <span class="plantInCartPrice ${trimmedValue}" data-name="${trimmedValue}" data-alt="${plantAlt}">$${quantityTimesPrice}</span>
                    </div>
                </div>
            `;
                $(".itemsInCart").append(cartItemHtml);
            }
        });
    });
};

$(".searchContainer").on("click", function() {
    $(this).hide();
    $(".searchBarContainer").addClass("searchBarActive");
});

$(".searchBarContainer").on("focusout", function() {
    $(".searchContainer").show();
    $(".searchBarContainer").removeClass("searchBarActive");
});

$(".searchBarContainer i").on("click", function() {
    let searchTerm = $("#searchBar").val();
    $("#searchBar").val("");
    $(".searchContainer").show();
    $(".searchBarContainer").removeClass("searchBarActive");
    plantShop.searchThroughDatabase(searchTerm);
});

/* 
The searchThroughDatabase() function is triggered on keyup so that the plants are appended dynamically as the user types their search.
*/

$(".searchBarContainer input").on("keyup", function() {
    let searchTerm = $("#searchBar").val();
    plantShop.searchThroughDatabase(searchTerm);
})

$(".emptyCart").on("click", function() {
    $(".itemsInCart").empty();
    localStorage.clear();
    plantShop.cartCounter = 0;
    localStorage.setItem("totalPrice", "0");
    localStorage.setItem("totalPriceWithTax", "0");
    $(".priceSubTotal").html(`$${localStorage.totalPrice}`);
    $(".priceTotal").html(`$${localStorage.totalPriceWithTax}`);
    $(".numberOfItemsInOpenCart").html(`You have ${plantShop.cartCounter} items in your cart.`);
})

/* 
Event listeners to open and close the mobile menu.
*/

$(".openMobileMenu").on("click", function() {
    $(".mobileMenu").addClass("slideOutMenu");
})

$(".exitMobileMenuButton").on("click", function() {
    $(".mobileMenu").removeClass("slideOutMenu");
});

/* 
This is the function that allows the user to append items to the page depending on their search query. It allows the user to search for plants either by scientific name or common name. I had to account for all the different ways the user could break the app in the if statement that checks if a value of any plant in the database matches the search query.

*/

plantShop.searchThroughDatabase = function(searchTerm) {
    $(".items").empty();
    plantShop.plantData.forEach(function(value) {
        let searchTermWithoutSpace = searchTerm.replace(/ /g,'');
        let searchTermInLowerCase = searchTerm.toLowerCase();
        let searchTermInLowerCaseWithoutSpaces = searchTerm.replace(/ /g,'').toLowerCase();
        let valueWithSpacing = value.name.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (value.name.includes(searchTerm) === true || value.name.includes(searchTermWithoutSpace) === true || value.name.includes(searchTermInLowerCase) === true || value.name.includes(searchTermInLowerCaseWithoutSpaces) === true || value.name.toLowerCase().includes(searchTerm) === true || valueWithSpacing.includes(searchTerm) === true || value.commonName.includes(searchTerm) || value.commonName.toLowerCase().includes(searchTerm)) {
            const plantHtml = `
            <div class="plant">
                <img src="${value.image}" class="plantShopImg" alt="${value.alt}">
                <div class="addToCartButton" data-name="${value.name}" data-image="${value.image}" data-price="${value.price}">
                    <span>Add To Cart</span>
                </div>
                <div class="nameAndPriceFlex">
                    <div>
                        <span class="name">${value.name}</span>
                    </div>
                    <div>
                        <span class="price">$${value.price}</span>
                    </div>
                </div>
            </div>
        `;
        $(".items").append(plantHtml);
        }
    });
};

/* 
The init has to check the localStorage before the page loads to check if there's anything in the cart and reload it to the page. If the localStorage.cart doesn't exist, it's created and set to 0 so that it's ready to increment every time the user adds an item. The same thing happens with totalPrice, so that it's set to 0 if there's nothing in the cart and ready to increment every time an item is added.
*/

plantShop.init = function() {
    plantShop.filterPlants(plantShop.plantData);
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $(".scrollContainer").addClass("scrollContainerActive");
            $(".headerImage").addClass("headerImageScroll");
        } else {
            $(".scrollContainer").removeClass("scrollContainerActive");
            $(".headerImage").removeClass("headerImageScroll");
        }
    });

    if (localStorage.getItem("cart") == "null" || localStorage.getItem("cart") == undefined) {
        localStorage.setItem("cart", "0");
        plantShop.cartCounter = parseInt(localStorage.cart);
        $(".cartText").html(`Cart (${plantShop.cartCounter})`);
        $(".numberOfItemsInOpenCart").html(`You have ${plantShop.cartCounter} items in your cart.`);
    } else {
        plantShop.cartCounter = parseInt(localStorage.cart);
        $(".cartText").html(`Cart (${plantShop.cartCounter})`);
        $(".numberOfItemsInOpenCart").html(`You have ${plantShop.cartCounter} items in your cart.`);
    }

    if (localStorage.getItem("totalPrice") == "null" || localStorage.getItem("totalPrice") == undefined && localStorage.getItem("totalPriceWithTax") == "null" || localStorage.getItem("totalPriceWithTax") == undefined) {
        localStorage.setItem("totalPrice", "0");
        localStorage.setItem("totalPriceWithTax", "0");
    } 
    else {
        $(".priceSubTotal").html(`$${localStorage.totalPrice}`);
        $(".priceTotal").html(`$${localStorage.totalPriceWithTax}`);
    }
};

$(document).ready(function() {
    plantShop.init();
    plantShop.reloadItemsInCart();
});