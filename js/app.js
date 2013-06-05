
$.fn.decorate = function() {
  console.log($('ul.teams').children("li").length)
  $('ul.teams').children("li").css('color', 'red');
};

// Ember.subscribe('render', {
//   before: function(name, start, payload){
//     return start
//   },
//   after: function(name, end, payload, start){
//     var duration = Math.round(end - start)
//     var template = payload.template
//     //console.log(payload.object)
//     console.log('rendered ', name, 'with ', payload.object, 'took ', duration, 'ms')
//   }
// })

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.initializer({
  name: "debug",
  initialize: function() {
    Ember.debug("Debug initializer");
    console.log('debug')
  }
});

App.initializer({
  name: "buildTemplates",
 
  initialize: function(container, application) {
    //console.log('buildTemplates')
    //console.log(container)
    //console.log(application)
    //console.log(Em.TEMPLATES)
    Ember.debug("Em.TEMPLATES: " + Em.TEMPLATES);
    Ember.debug(Em.TEMPLATES['application']);

    // $(function(){
    //   /* Look up an attribute in a meta tag */
    //   var attributes = $('meta[name="current-user"]').attr('content')

    //   /* Do something with it */
    // });
  }
});


App.Router.map(function() {
  this.resource("home", { path: "/" });
  this.resource("other", { path: "/other" });
  this.resource("another", { path: "/another" });  
  this.resource('team', { path: '/team/:team_id' });
});

// var customAdapter = DS.Adapter.create({
//   find: function (store, type, id) { },
//   findAll: function (store, type) { }
// });

//Ember Data///////////////////////////////////////////////////

App.CustomFixtureAdapter = DS.FixtureAdapter.extend({
  latency: 2000
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'App.CustomFixtureAdapter'
});

App.Team = DS.Model.extend({
  name: DS.attr('string'),
  colors: DS.attr('string')
})

//Ember Data///////////////////////////////////////////////////


//Ember Model///////////////////////////////////////////////////

// Example
// var attr = Ember.attr;

// App.User = Ember.Model.extend({
//   id: attr(),
//   name: attr()
// });

// App.User.url = "/users";
// App.User.adapter = Ember.RESTAdapter.create();

// var newUser = App.User.create({name: "Erik"});
// newUser.save(); // POST to /users.json

// var existingUser = App.User.find(1); // GET /users/1.json
// existingUser.set('name', 'Kris');
// existingUser.get('isDirty'); // => true
// existingUser.save(); // PUT /users/1.json

// var attr = Ember.attr;

// App.Team = Ember.Model.extend({
//   name: attr('string'),
//   colors: attr('string')
// });

// App.CustomFixtureAdapter = Ember.FixtureAdapter.extend({
//   latency: 2000
// });

// App.Team.adapter = App.CustomFixtureAdapter.create();

// App.Schedule = DS.Model.extend({
//   location: DS.attr('string')
// })

// // // When using Ember-Model

// App.Schedule.adapter = Ember.Adapter.create({
//   findAll: function(klass, records){
//     $.getJSON('data/schedules.json').then(function(data){
//       records.load(klass, data.schedules)
//     })
//   }
// })

//App.Schedule.adapter = Ember.RESTAdapter.create();





App.ApplicationRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('home').set('teams', App.Team.find());
    //this.controllerFor('home').set('schedules', App.Schedule.find());
    this.controllerFor('other').set('teams', App.Team.find());
    this.controllerFor('another').set('teams', App.Team.find());    
  }
});

App.HomeRoute = Ember.Route.extend({

  init: function(){
    console.log('init HomeRoute')
  },
  model: function(){
    return ['Coed', 'Saturdays from 9AM-3PM', 'at Park Center']
  },
  setupController: function(controller, model){

    controller.set('info', model);

    // controller.set('teams', App.Team.find());
    // this.controllerFor('other').set('teams', this.controller.get('teams'));
  }
});

App.OtherRoute = Ember.Route.extend({

  init: function(){
    console.log('init OtherRoute')
  },
  model: function(){
    return ['This is other info.', 'For the other page.']
  },

  setupController: function(controller, model){

    controller.set('info', model);

    // controller.set('teams', App.Team.find());
    // this.controllerFor('home').set('teams', this.controller.get('teams'));

  }
});

App.AnotherRoute = Ember.Route.extend({
  init: function(){
    console.log('init AnotherRoute')
  }
});

App.HomeController = Ember.ArrayController.extend({

  init: function(){
    console.log('init HomeController')
  },

  teamsAreLoaded: function() {
    if (this.get('teams.isUpdating') === true){
      return false;
    }else{
      return true;
    }
  }.property('teams.isUpdating')
});

App.OtherController = Ember.ArrayController.extend({

  init: function(){
    console.log('init OtherController')
  },

  teamsAreLoaded: function() {
    if (this.get('teams.isUpdating') === true){
      return false;
    }else{
      return true;
    }
  }.property('teams.isUpdating')
});

App.AnotherController = Ember.ArrayController.extend({

  init: function(){
    console.log('init AnotherController')
  }
});

App.HomeView = Ember.View.extend({
  templateName: 'home'
});

App.TeamView = Ember.View.extend({

  init: function(){
    console.log('init TeamsView');
    //console.log(this.get('controller.teams'));
  },

  didInsertElement: function() {
    // At this point, no child elements have been rendered, so
    // schedule decorator to run after the child elements
    // have rendered.

    //this.callDecorate();
    this.$().decorate()
    //Ember.run.scheduleOnce('afterRender', this, 'callDecorate');
    //Ember.run.next(this, 'callDecorate');

    var teams = this.get('controller');
    //console.log(teams)
    //console.log(teams.get('isSaving'));
    //console.log(teams.get('isLoaded'));

  },
  callDecorate: function() {
    //console.log('decorate')
    //console.log(this.$().pluginName());
    this.$().decorate()
  },
  afterRender: function(){
    //console.log('afterRender');
  }
})

App.TeamsView = Ember.View.extend({

  init: function(){
    console.log('init TeamsView');
    //console.log(this.get('controller.teams'));
  },

  didInsertElement: function() {
    // At this point, no child elements have been rendered, so
    // schedule decorator to run after the child elements
    // have rendered.

    //this.callDecorate();
    this.$().decorate()
    //Ember.run.scheduleOnce('afterRender', this, 'callDecorate');
    //Ember.run.next(this, 'callDecorate');

    var teams = this.get('controller');
    //console.log(teams)
    //console.log(teams.get('isSaving'));
    //console.log(teams.get('isLoaded'));

  },
  callDecorate: function() {
    //console.log('decorate')
    //console.log(this.$().pluginName());
    this.$().decorate()
  },
  afterRender: function(){
    //console.log('afterRender');
  }
})

App.AnotherView = Ember.CollectionView.extend({

  // cant init() a CollectionView
  
  // init: function(){
  //   console.log('init AnotherContainerView');
  // },

  teamsAreLoaded: false,

  didInsertElement: function() {

    //this.$().decorate()
    //Ember.run.scheduleOnce('afterRender', this, 'callDecorate');

    console.log('didInsertElement');
    console.log(this.teamsAreLoaded);

    if (this.teamsAreLoaded === false){
      this.$().html('<p class="loading">...Loading teams</p>');
    }
  },  
  callDecorate: function() {
    this.$().decorate()
  },
  tagName: 'ul',
  classNames: ['teams'],
  contentBinding: 'controller.teams',
  itemViewClass: Ember.View.extend({
    template: Ember.Handlebars.compile('{{#linkTo "team" view.content}}{{view.content.name}}{{/linkTo}}')
    //template: Em.TEMPLATES['link']
  }),
  didInsertChildElements: function() {
    console.log(this.get('state'))
    Ember.run.scheduleOnce('afterRender', this, 'callDecorate');
    this.teamsAreLoaded = true;
  }.observes('[]')
})

App.Team.FIXTURES = [
  {
    id: 1,
    name: 'Celtics',
    colors: 'Green, White'
  }, {
    id: 2,
    name: 'Lakers',
    colors: 'Yellow, Black'
  }, {
    id: 3,
    name: 'Bulls',
    colors: 'Red, Black'
  }, {
    id: 4,
    name: 'Mavericks',
    colors: 'Blue, White'
  }, {
    id: 5,
    name: 'Spurs',
    colors: 'Black, Grey, White'
  }
];

//Ember.run(object, function(obj) { obj.set('loaded', true); });

// App.MasonryView = Ember.CollectionView.extend({
//   didInsertElement: function() {
//     // At this point, no child elements have been rendered, so
//     // schedule buildMasonry to run after the child elements
//     // have rendered.
//     Ember.run.scheduleOnce('afterRender', this, 'buildMasonry');
//   },
//   buildMasonry: function() {
//     this.$().masonry();
//   }
// });






