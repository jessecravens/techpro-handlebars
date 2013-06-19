
var homeTemplate = Ember.Handlebars.precompile('<h3>League Info</h3><ul class="info">{{#each item in info}}<li>{{item}}</li>{{/each}}</ul><h3>Teams</h3>{{#if teams.length}}{{#view "App.TeamView"}}<ul class="teams">{{#each team in teams}}<li> {{#linkTo "team" team}}{{team.name}}{{/linkTo}}</li>{{/each}}</ul>{{/view}}{{else}}<p class="loading">...Loading teams</p>{{/if}}');

Ember.TEMPLATES['home'] = Ember.Handlebars.template(homeTemplate);

var teamTemplate = Ember.Handlebars.precompile('<h3>Team Page:<span class="team-name">{{name}}</span></h3><p>team colors:{{colors}}</p>');

Ember.TEMPLATES['team'] = Ember.Handlebars.template(teamTemplate);


module("Integration Tests", {
	setup: function () {
		Ember.run(App, App.advanceReadiness);
	},
	teardown: function () {
		App.reset();
	}
});

test("/", function () {

	expect(1);

	visit("/").then(function () {
		equal(find('ul.teams li a').eq(0).text().trim(), "Celtics", "The first team was rendered.");
	})

});

 test("/team/1", function() {

   expect(1);

   visit("/team/1").then(function() {
     equal(find('h3 > span').text().trim(), "Celtics", "The team name was rendered on detail page.");
   })

 });

 test("/team/2", function() {

   expect(1);

   visit("/team/2").then(function() {
     equal(find('h3 > span').text().trim(), "Lakers", "The team name was rendered on detail page.");
   })
 });

 test("/team/3", function() {

   expect(1);

   visit("/team/3").then(function() {
     equal(find('h3 > span').text().trim(), "Bulls", "The team name was rendered on detail page.");
   })
 });

 test("/team/4", function() {

   expect(1);

   visit("/team/4").then(function() {
     equal(find('h3 > span').text().trim(), "Mavericks", "The team name was rendered on detail page.");
   })
 });

 test("/team/5", function() {

   expect(1);

   visit("/team/5").then(function() {
     equal(find('h3 > span').text().trim(), "Spurs", "The team name was rendered on detail page.");
   })
 });
