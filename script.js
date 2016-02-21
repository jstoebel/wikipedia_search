var search = function(term) {
    //pre: 
    //post: results are returned based on content of search bar
    //as a .json file

    if ( term != "" ) {
        // var url = "/w/api.php?action=query&format=json&prop=revisions&meta=siteinfo&continue=&titles=Main+Page&rvprop=user%7Ccomment";
        var url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var callback = '&callback=?';
        // var page = 'http://en.wikipedia.org/?curid=';
        
        $.getJSON(url+term+callback, function(json) {
            displayResults(json);
        });
    };

}

var displayResults = function(json) {
    //pre: json: the response from wikipedia api
    //post: results (if any) are displayed


    var pages = json.query.pages;
    var urlRoot = "http://en.wikipedia.org/wiki/";

    console.log(pages)
    for (i in pages) {
        var title = pages[i].title;
        var extract = pages[i].extract;
        var link = urlRoot + encodeURI(title);

        var template = `
            <a href=${link} target='_blank'>            
                <div class="col-xs-12">
                    <div class="result-wrapper">
                        <div class="result-title">${title}</div>
                        <div class="result-extract">${extract}</div>
                        
                    </div>
                </div>
            </a>`

        $("#results-row").append(template)

    }
}

var handleErr = function (json) {
    //do nothing for now
}

$(document).ready(function(){

    $("#search-btn").click(function(){
        //if the text box is hidden
        if ($("#search-row").css("display") == "none") {
            $("#search-row").fadeIn("slow")
        } else {
            //otherwise submit the search term
            search($("#searchbox").val())
            
        }
    });

    $("#searchform").submit(function(event) {

        event.preventDefault();

        //submit the search to the API!
        search($("#searchbox").val())
    });
})