var request = require('request');
var cheerio = require('cheerio');


request('http://sports.yahoo.com/nfl/', function(error, response, html){
    if(!error && response.statusCode == 200){
      var $ = cheerio.load(html);
      $('ol li div.game').each(function(i, element){
        var time = $(element).find('.state').text();
        console.log(time);
        time = time.replace(/(\r\n|\n|\r)/gm,"");
        var teams = $(element).find('.team').text();
        teams = teams.replace(/(\r\n|\n|\r)/gm,"");
        var data = {
          time: time,
          teams: teams
        }
       console.log(data);
      });
    }
});
