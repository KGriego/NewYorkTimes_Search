// API Key: bc3f94c9ca8842b4b60d371d559cf03e


/*
Inputs:

    Search term (q=xyz)
    Num records (docs.length)
        more than 10, add pages together
        until less than 10 remaining
        run num records
    Start yr (optional) (begin_date=YYYYMMDD)
        string += "0101"
    End yr (optional) (end_date=YYYYMMDD)
        string += "1231"

Top articles displayed below
*/

/*
    Fn for pages of articles
    Fn for individual articles

    reponse.
*/

function getData() {
    // var query = $("#input-box").text();
    
    var query = "uk";
    var beginDate = "1980" + "0101";
    var endDate = "2010" + "1231";

    //var requestedRecs = $("#input-box").text();
    
    var numPages = (requestedRecs / 10) + 1;
    var remainder = requestedRecs % 10;

    for (var pgNum = 1; pgNum <= numPages; pgNum++) {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "bc3f94c9ca8842b4b60d371d559cf03e",
            'q': query,
            'begin_date': beginDate,
            'end_date': endDate,
            'page': pgNum,
        });

        $.ajax({
            url: url,
            method: 'GET',
        }).then(function (result) {
            var data = result.response.docs;

            var numArticles = 0;
            if (pgNum === numPages) {
                numArticles = remainder;
            } else {
                numArticles = 10;
            }

            displayArticles(numArticles, data);
        })
    }
}

function clearInputs() {
// $("#input-box").text("");
}

$("#submit-button").on("click", getData);