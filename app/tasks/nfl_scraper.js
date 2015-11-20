module.exports = {
  runScraper: function(){
    var request        = require('request');
    var cheerio        = require('cheerio');
    var fs             = require('fs');
    request('http://sports.yahoo.com/nfl/', function(error, response, html){
        if(!error && response.statusCode == 200){
          var $ = cheerio.load(html);
          var jsonArr = [];
          $('ol li div.game').each(function(i, element){

            //live or final
            var state = $(element).find('.state').text();
            state = state.replace(/(\r\n|\n|\r)/gm,"");

            //quarter and time
            var status = $(element).find('.period').text();

            var homeScore, visitingScore;
             if(status==="LIVE"){
                 //scores
               homeScore     = $(element).find('.team .score em').first().text();
               visitingScore = $(element).find('.team .score em').last().text();
             }
             else{
               homeScore     = $(element).find('.team .score').first().text();
               visitingScore = $(element).find('.team .score').last().text();
             }



             //teams
            var homeTeam = $(element).find('.team').first()
             .clone()    //clone the element
             .children() //select all the children
             .remove()   //remove all the children
             .end()  //again go back to selected element
             .text();


             var visitingTeam = $(element).find('.team').last()
             .clone()    //clone the element
             .children() //select all the children
             .remove()   //remove all the children
             .end()  //again go back to selected element
         .text();



            visitingTeam = visitingTeam.replace(/(\r\n|\n|\r)/gm,"");
            homeTeam = homeTeam.replace(/(\r\n|\n|\r)/gm,"");
            visitingTeam = visitingTeam.replace(/\s+/g, '');
            homeTeam = homeTeam.replace(/\s+/g, '');

            var gameData = {
              state: state,
              status: status,
              homeTeam: homeTeam,
              homeScore: homeScore,
              visitingTeam: visitingTeam,
              visitingScore: visitingScore
            }
            jsonArr.push(gameData);
          });
          fs.writeFile('output.json', JSON.stringify(jsonArr, null, 4), function(err){
            console.log('File successfully written!!!!! - Check your project directory for the output.json file');
          });
        }
    });

  }
}
