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

var $articles = $("#results")

function displayArticles(n, data) {
    console.log(data);

    for (let i = 0; i < n; i++) {
        let newDiv = $("<div>").addClass("article");
        let title = $("<a>").text(data[i].headline.main);
        let author = $("<p>").text(data[i].byline.original);

        let time = data[i].pub_date;
        let cutIndex = time.indexOf("T");
        time = time.slice(0,cutIndex);

        let pubDate = $("<p>").text(time);

        title.attr("href", data[i].web_url);
        newDiv.append(title);
        newDiv.append(author);
        newDiv.append(pubDate);
        $articles.append(newDiv);
    }

    // author
    // article
    // date 

}

function getData() {
    var query = $("#search-terms").text().trim();
    var beginDate = $("#start-year").val().trim() + "0101";
    var endDate = $("#end-year").val().trim() + "1231";

    var requestedRecs = $("#num-records").val().trim();

    var numPages = (requestedRecs / 10);
    var remainder = requestedRecs % 10;

    if (remainder > 0) {
        numPages++;
    }

    $(".form-control").text("");

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

$("#submit-button").on("click", getData);