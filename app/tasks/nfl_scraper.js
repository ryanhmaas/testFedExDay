var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var CronJob = require('cron').CronJob;
var job = new CronJob('0 */15 * * * *', function(){
  request('http://sports.yahoo.com/nfl/', function(error, response, html){
      if(!error && response.statusCode == 200){
        var $ = cheerio.load(html);
        var json = {time: "", teams:""};
        $('ol li div.game').each(function(i, element){
          var time = $(element).find('.state').text();
          time = time.replace(/(\r\n|\n|\r)/gm,"");

          var teams = $(element).find('.team').text();
          teams = teams.replace(/(\r\n|\n|\r)/gm,"");

          json.time = time;
          json.teams = teams;
        });
      }
  });
  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
  });
});
job.start();
