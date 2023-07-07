//Get data endpoints
const apiCountries = ("/api/v1.0/countries");
const apiCountryMetaData = ("/api/v1.0/countrymetadata/");

//Fetch json data: add Countries to drop down list
d3.json(apiCountries).then(function(data) {
    const country_names = data.country;
    country_names.sort((a, b) => a - b);
    //console.log("Countries: ", country_names);

    //select dropdown menu
    const select = document.getElementById("selDataset");

    //Add the dropdown options
    for (let i = 0; i<country_names.length; i++) {
        let option = document.createElement("option");
        option.text = country_names[i];
        option.value = country_names[i];
        //console.log(option)
        select.appendChild(option);
    }

})

//Startup country
function init() {
    getData("INDIA");
}

// On change to the DOM , call getData()
d3.selectAll("#selDataset").on("change", function() {
    let subjectSelected = d3.select("#selDataset");
    let subject = subjectSelected.property("value")
    getData(subject)
});


function getData(subject) {

    //Fetch json data
    d3.json(apiCountryMetaData + subject).then(function(data) {
        filteredMetaData = data.filter(function(d) {
            return d.country === parseInt(subject);
        })

        //console.log(filteredMetaData);

        //Capture metadata
        countryName = filteredMetaData[0].country;
        countryArea = filteredMetaData[0].area;
        countryCCA2 = filteredMetaData[0].cca2;
        countryCCA3 = filteredMetaData[0].cca3;
        countryGrowthRate = filteredMetaData[0].growthRate;
        countryDensity = filteredMetaData[0].density;
        countrypop1980 = filteredMetaData[0].pop1980;
        countrypop2000 = filteredMetaData[0].pop2000;
        countrypop2010 = filteredMetaData[0].pop2010;
        countrypop2022 = filteredMetaData[0].pop2022;
        countrypop2023 = filteredMetaData[0].pop2023;
        countrypop2030 = filteredMetaData[0].pop2030;
        countrypop2050 = filteredMetaData[0].pop2050;
    
        d3.select("#sample-metadata").text("Country: " + countryName);
        d3.select("#sample-metadata").append("p").text("Area: " + countryArea).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("CCA2: " + countryCCA2).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("CCA3: " + countryCCA3).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Growth Rate: " + countryGrowthRate).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Density: " + countryDensity).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 1980: " + countrypop1980).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2000: " + countrypop2000).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2010: " + countrypop2010).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2022: " + countrypop2022).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2023: " + countrypop2023).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2030: " + countrypop2030).style("margin", "0");
        d3.select("#sample-metadata").append("p").text("Pop 2050: " + countrypop2050).style("margin", "0");

    });

}

init();