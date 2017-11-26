$("#submit").on("click", function() {
    var barcode = $("#barcode").val();
    console.log(barcode);
    httpGet(barcode);
    return false;
})

function httpGet(barcode) {
    console.log("in function");
    var xmlhttp = new XMLHttpRequest();
    var url = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var pageObject = JSON.parse(this.responseText);
            var allergens = getAllergens(pageObject);
            $('#barcodeForm').innerHtml = allergens.en
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function getAllergens(pageObject) {
        var product = pageObject.product;
        var allergens = product.allergens_hierarchy;
        var allergensEnglish = [];
        
        for (var i = 0; i < allergens.length; i++) {
            var allergen = allergens[i].split(":");
            console.log(allergen[0] + " " + allergen[1]);
            if (allergen[0] === "en") {
                allergensEnglish.push(allergen[1]);
            }
        }
        /*
        console.log("allergens in function: " + allergens);
        var allergensSplit = allergens.split(":");
        var allergensEnglish = "";
        for (var i = 0; i < allergensSplit.length; i++) {
            console.log("element: " + allergensSplit[i]);
            if (allergensSplit[i] == "en") {
                var allergensRest = allergensSplit[i+1];
                var allergensRestSplit = allergensRest.split(";")
                allergensEnglish = allergensRestSplit[0];
            }
        }*/
        console.log("allergens in english: " + allergensEnglish);
        
        // set content of #previousBarcode to barcode
        $('#previousBarcode').html(barcode);
        
        // set content of #preciousAllergens to allergensEnglish
        var allergensHtml = "";
        var currentAllergenHtml = "";
        for (var i = 0; i < allergensEnglish.length; i++) {
            currentAllergenHtml = "<li>" + allergensEnglish[i] + "</li>";
            allergensHtml += currentAllergenHtml;
        }
        
        $('#previousAllergens').html("<ul>" + allergensHtml + "</ul>");
        
        // use <ul>
        
        return allergensEnglish;
    }
};