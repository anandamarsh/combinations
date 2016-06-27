var express = require('express');
var router = express.Router();

/**
 * This function returns a combination from the given set. It first generates a function and then executes it.
 * @param noOfPlaces
 * @returns {content:<a <br> separated list of combinations>, noOfComb:<number of combinations>}
 */
function generateCombinations(noOfPlaces) {
    // we generate the sourcecode for the function to execute
    var functStr = "var content = ''; \
        var charSet = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; \
        var noOfChars = charSet.length; \
        var noOfComb = 0; \
    ";
    for(var i=noOfPlaces; i>0; i--)
        functStr += "for(var p"+i+"=0; p"+i+"<noOfChars; p"+i+"++) ";
    functStr += "{  content +=";
    for(var i=noOfPlaces; i>0; i--)
        functStr += " charSet[p"+i+"] +";
    functStr += "'<br>';noOfComb++;}; return {content:content, noOfComb:noOfComb};"
    // and then execute what has been generated
    return (new Function (functStr))();
}

/* GET home page. */
router.get('/', function(req, res, next) {
    var result = { content:"", noOfComb:0 };
    // prepare the contents
    for(var noOfPlaces=2; noOfPlaces<=4; noOfPlaces++){
        var partialResult = generateCombinations(noOfPlaces);
        result.content += partialResult.content;
        result.noOfComb += partialResult.noOfComb;
    }
    res.render('index', result);
});

/* API end point for getting the number of combinations (for unit testing) */
router.get('/test', function(req, res, next) {
    // ensure that the params are correct
    var minPlaces = req.query.min_places;
    var maxPlaces = req.query.max_places;
    if(!minPlaces || !maxPlaces || isNaN(minPlaces) || isNaN(maxPlaces))
        return res.sendStatus(500);
    minPlaces = parseInt(minPlaces);
    maxPlaces = parseInt(maxPlaces);
    if(minPlaces<=0 || maxPlaces<minPlaces)
        return res.sendStatus(500);
    // prepare the contents
    var noOfComb=0;
    for(var noOfPlaces=minPlaces; noOfPlaces<=maxPlaces; noOfPlaces++){
        var partialResult = generateCombinations(noOfPlaces);
        noOfComb += partialResult.noOfComb;
    }
    res.send({noOfComb: noOfComb});
});

/* GET an html with client side js code that runs the same algorithm, but does it locally.  */
router.get('/client_side', function(req, res, next) {
    res.render('client_side');
});

module.exports = router;
