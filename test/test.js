
function XHRDataSource(options) {
    options = options || {};
    this.url = options.url;
    this.method = options.method;
    this.param = options.param;
}

XHRDataSource.prototype.get = function (query, callback) {
    if (this.request) {
        this.request.abort();
    }

    var data = {};
    data[this.param] = query;
    
    this.request = jQuery.ajax({
        url: this.url,
        type: this.method,
        data: data,
        success: callback
    });
};

// test("Using spies", function () {
//     var spy = sinon.spy();
//     spy();

//     ok(spy.called);
//     ok(spy.calledOnce);
// });

// test("Stubbing global environments", function () {

//     // with sinon-qunit installed - you can use spy, stub and mock as properties of this inside the test:

//     this.stub(jQuery, "ajax");
//     jQuery.ajax("/url", {});
//     ok(jQuery.ajax.called); 
//     // When the test is done running, the jQuery.ajax method is 
//     // restored to the original one.
// });

// // Timers
// // The clock property works as previously explained:

// test("Some timing stuff", function () {
//     var spy = this.spy();
//     setTimeout(spy, 150);

//     this.clock.tick(149);
//     ok(!spy.called);

//     this.clock.tick(1);
//     ok(spy.called);
// });

// // XMLHttpRequest and the fake server
// // The final piece of the puzzle is the fake server. The default configuration for sinon-qunit is slightly more conservative than the default one. It does not automatically stub XMLHttpRequest. However, you can easily use it. All you have to do is to call this.sandbox.useFakeServer:



function goTeam(name) {
    return "Go, " + name + "!";
};

//Em.TEMPLATES['home'] = function(cntxt){return '<h3>League Info</h3><ul class="info">{{#each item in info}}<li>{{item}}</li>{{/each}}</ul><h3>Teams</h3>{{#if teams.isLoaded}}<ul class="teams"> {{#each team in teams}}{{#linkTo "team" team}}<p>{{team.name}}</p>{{/linkTo}}{{/each}}</ul>{{else}}<p class="loading">...Loading teams</p>{{/if}}'}
//Em.TEMPLATES['team'] = function(cntxt){return '<h3>Team Page: {{name}}</h3><p>team colors:{{colors}}</p>'}

var homeTemplate = Ember.Handlebars.precompile('<h3>League Info</h3><ul class="info">{{#each item in info}}<li>{{item}}</li>{{/each}}</ul><h3>Teams</h3>{{#if teams.length}}{{#view "App.TeamView"}}<ul class="teams">{{#each team in teams}}<li> {{#linkTo "team" team}}{{team.name}}{{/linkTo}}</li>{{/each}}</ul>{{/view}}{{else}}<p class="loading">...Loading teams</p>{{/if}}')
Ember.TEMPLATES['home'] = Ember.Handlebars.template(homeTemplate)

var teamTemplate = Ember.Handlebars.precompile('<h3>Team Page:<span class="team-name">{{name}}</span></h3><p>team colors:{{colors}}</p>')
Ember.TEMPLATES['team'] = Ember.Handlebars.template(teamTemplate)

module("Integration Tests", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test("/", function() {

  expect(1);
  
  // visit("/").then(function() {
  //   equal(goTeam("Celtics"), "Go, Celtics!", "function outputs string correctly")
  // });

  visit("/").then(function() {
    equal(find('ul.teams li a').eq(0).text().trim(), "Celtics", "The first team was rendered.");
  })

});

// test("/team/1", function() {

//   expect(1);

//   visit("/team/1").then(function() {
//     equal(find('h3 > span').text().trim(), "Celtics", "The team name was rendered on detail page.");
//   })

// });

// test("/team/2", function() {

//   expect(1);

//   visit("/team/2").then(function() {
//     equal(find('h3 > span').text().trim(), "Lakers", "The team name was rendered on detail page.");
//   })
// });

// test("/team/3", function() {

//   expect(1);

//   visit("/team/3").then(function() {
//     equal(find('h3 > span').text().trim(), "Bulls", "The team name was rendered on detail page.");
//   })
// });

// test("should make request", function () {

//   expect(1);
//     var server = this.sandbox.useFakeServer();
//     var dataSource = new XHRDataSource();
//     dataSource.get();
//     equal(1, server.requests.length);
// });

// test("/", function() {

//   expect(2);
  
//   visit("/").then(function() {
//     equal(goTeam("Celtics"), "Go, Celtics!", "function outputs string correctly")
//   });

//   visit("/").then(function() {
//     equal(find('ul.teams > a').eq(0).text().trim(), "Celtics", "The first team was rendered.");
//   })

// });

