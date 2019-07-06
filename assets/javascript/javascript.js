var cars = [];
var axios = require("axios");
var cheerio = require("cheerio");

var nodeCraigslist = require("node-craigslist");

var craigslist = require("node-craigslist"),
    client = new craigslist.Client({
        city: "dallas"
    }),
    options = {
        vin: "",
        category: "cta",
        maxPrice: "80000",
        minPrice: "30000"
    };

client
    .search(options, "ford f150 raptor")
    .then(listings => {
        // filtered listings (by price)
        var listOfCars = listings.map(listing => getVin(listing.url));
        setTimeout(console.log(listOfCars), 5000);

        console.log(listOfCars);
    })
    .catch(err => {
        console.error(err);
    });

function getVin(url) {
    axios.get(url).then(function(response) {
        var $ = cheerio.load(response.data);

        var results = [];
        $("span").each(function(i, element) {
            var title = $(element).text();

            var link = $(element)
                .children()
                .attr("href");

            results.push({
                title: title,
                link: link
            });
        });

        return results[31];
    });
}
