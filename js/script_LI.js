var data = [{
        "make": "Gibson",
        "model": "Les Paul",
        "type": "Electric",
        "price": "$3,000",
        "image": "http://www.sweetwater.com/images/items/120/LPST5HTHDCH-medium.jpg?9782bd"
    },
    {
        "make": "Gibson",
        "model": "SG",
        "type": "Electric",
        "price": "$1,500",
        "image": "http://www.sweetwater.com/images/items/120/SGSEBCH-medium.jpg?e69cfe"
    },
    {
        "make": "Fender",
        "model": "Telecaster",
        "type": "Electric",
        "price": "$2,000",
        "image": "http://www.sweetwater.com/images/items/120/TelePLMPHB-medium.jpg?28e48b"
    },
    {
        "make": "Fender",
        "model": "Stratocaster",
        "type": "Electric",
        "price": "$2,000",
        "image": "http://www.sweetwater.com/images/items/120/StratAMM3SB2-medium.jpg?dfd0a9"
    },
    {
        "make": "Gretsch",
        "model": "White Falcon",
        "type": "Electric",
        "price": "$5,000",
        "image": "http://www.sweetwater.com/images/items/120/G613655GE-medium.jpg?9bfb0e"
    },
    {
        "make": "Paul Reed Smith",
        "model": "Custom 24",
        "type": "Electric",
        "price": "$5,000",
        "image": "http://www.sweetwater.com/images/items/120/HBII10BGWB-medium.jpg?982763"
    },
    {
        "make": "Gibson",
        "model": "Hummingbird",
        "type": "Acoustic",
        "price": "$2,500",
        "image": "http://www.sweetwater.com/images/items/120/SSHBHCNP-medium.jpg?11fbea"
    }
];

var products = "",
    makes = "",
    models = "",
    types = "";

for (var i = 0; i < data.length; i++) {
    var make = data[i].make,
        model = data[i].model,
        type = data[i].type,
        price = data[i].price,
        rawPrice = price.replace("$", ""),
        rawPrice = parseInt(rawPrice.replace(",", "")),
        image = data[i].image;

    //create product cards
    products += "<div class='col-sm-7 col-lg-5 col-xl-2 product' data-make='" + make + "' data-model='" + model + "' data-type='" + type + "' data-price='" + rawPrice + "'><div class='product-inner'><img src='" + image + "'></div><br />Make: " + make + "<br /><div class='person-info'>Model: <h4 class='full-name'>" + model + "<h4><br />Type: " + type + "<br />Price: " + price + "</div></div>";

    //create dropdown of makes
    if (makes.indexOf("<option value='" + make + "'>" + make + "</option>") == -1) {
        makes += "<option value='" + make + "'>" + make + "</option>";
    }

    //create dropdown of models
    if (models.indexOf("<option value='" + model + "'>" + model + "</option>") == -1) {
        models += "<option value='" + model + "'>" + model + "</option>";
    }

    //create dropdown of types
    if (types.indexOf("<option value='" + type + "'>" + type + "</option>") == -1) {
        types += "<option value='" + type + "'>" + type + "</option>";
    }
}

$("#products").html(products);
$(".filter-make").append(makes);
$(".filter-model").append(models);
$(".filter-type").append(types);

var filtersObject = {};

//on filter change
$(".filter").on("change", function() {
    var filterName = $(this).data("filter"),
        filterVal = $(this).val();

    if (filterVal == "") {
        delete filtersObject[filterName];
    } else {
        filtersObject[filterName] = filterVal;
    }

    var filters = "";

    for (var key in filtersObject) {
        if (filtersObject.hasOwnProperty(key)) {
            filters += "[data-" + key + "='" + filtersObject[key] + "']";
        }
    }

    if (filters == "") {
        $(".product").show();
    } else {
        $(".product").hide();
        $(".product").hide().filter(filters).show();
    }
});

//on search form submit
$("#search-form").submit(function(e) {
    e.preventDefault();
    var query = $("#search-form input").val().toLowerCase();

    $(".product").hide();
    $(".product").each(function() {
        var make = $(this).data("make").toLowerCase(),
            model = $(this).data("model").toLowerCase(),
            type = $(this).data("type").toLowerCase();

        if (make.indexOf(query) > -1 || model.indexOf(query) > -1 || type.indexOf(query) > -1) {
            $(this).show();
        }
    });
});