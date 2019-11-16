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
    },
    {
        name: "Acanthocereus Tetragonus",
        commonName: "Fairy Castle Cactus",
        image: "./assets/acanthocereusTetragonus.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
    },
    {
        name: "Monstera Deliciosa",
        commonName: "Swiss-Cheese Plant",
        image: "./assets/monstera.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: false,
        toxic: true,
    },
    {
        name: "Sansevieria Trifasciata",
        commonName: "Snake Plant",
        image: "./assets/snakePlant.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
    },
    {
        name: "Ficus Lyrata",
        commonName: "Fiddle Leaf Fig",
        image: "./assets/fiddleLeaf.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: false,
        toxic: true,
    },
    {
        name: "Ficus Elastica",
        commonName: "Rubber Tree Plant",
        image: "./assets/ficusElastica.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
    },
    {
        name: "Ferocactus Glaucescens",
        commonName: "",
        image: "./assets/ferocactusGlaucescens.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: true,
    },
    {
        name: "Echeveria",
        commonName: "",
        image: "./assets/graptoveriaTitubans.jpg",
        price: 20,
        lowLight: false,
        droughtResistant: true,
        toxic: false,
    },
    {
        name: "Epipremnum Aureum",
        commonName: "Pothos",
        image: "./assets/pothos.jpg",
        price: 20,
        lowLight: true,
        droughtResistant: true,
        toxic: true,
    }
];

plantShop.filterPlants = function(filterBy) {
    filterBy.forEach(function(individualPlant) {
        const plantHtml = `
            <div class="plant">
                <img src="${individualPlant.image}" class="plantShopImg">
                <div class="addToCartButton" data-name="${individualPlant.name}" data-image="${individualPlant.image}" data-price="${individualPlant.price}">
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

$(".items").on("click", ".addToCartButton", function() {
    plantShop.cartCounter++;
    console.log(`Added to cart ${plantShop.cartCounter}`);
    localStorage.cart = JSON.stringify(plantShop.cartCounter);
    $(".cartText").html(`Cart (${localStorage.cart})`);
    $(".numberOfItemsInOpenCart").html(`You have ${plantShop.cartCounter} items in your cart.`);
    let plantName = $(this).data("name");
    let plantPrice = $(this).data("price");
    let plantImage = $(this).data("image");
    let trimmedPlantName = plantName.replace(/ /g,'');
    console.log(trimmedPlantName);
    // plantShop.checkQuantityInCart(trimmedPlantName);
    let cartItemHtml = `
        <div class="plantInCart">
            <div class="plantInCartImg">
            <img src="${plantImage}" />
            </div>
            <div class="plantInCartText">
                <span class="plantInCartName ${trimmedPlantName}" data-name="${trimmedPlantName}" data-price="${plantPrice}"></span>
                <span class="plantInCartPrice ${trimmedPlantName}" data-name="${trimmedPlantName}">$${plantPrice}</span>
            </div>
        </div>
    `;
    if (localStorage[trimmedPlantName] == "null" || localStorage[trimmedPlantName] == undefined) {
        localStorage[trimmedPlantName] = "1";
        console.log(`${localStorage[trimmedPlantName]} has been added to the local storage.`);
        $(".itemsInCart").append(cartItemHtml);
        $(`.plantInCartName.${trimmedPlantName}`).html(`${plantName} x 1`);
    } else if (localStorage[trimmedPlantName] >= 1) {
        let quantityOfThisPlant = parseInt(localStorage[trimmedPlantName]);
        quantityOfThisPlant++;
        localStorage[trimmedPlantName] = JSON.stringify(quantityOfThisPlant);
        console.log(`The total quantity of ${trimmedPlantName} is ${localStorage[trimmedPlantName]}`);
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

plantShop.init = function() {
    console.log("working");
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
        console.log(localStorage.cart, plantShop.cartCounter);
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
});