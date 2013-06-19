
/*jslint browser: true*/
/*global $, Ember, DS, App, console */

$.fn.decorate = function () {
	console.log($('ul.teams').children("li").length);
	$('ul.teams').children("li").css('color', 'red');
};

App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.initializer({
	name: "debug",
	initialize: function () {
		Ember.debug("Debug initializer");
		console.log('debug');
	}
});

App.Router.map(function () {
	this.resource("home", {
		path: "/"
	});
	this.resource("other", {
		path: "/other"
	});
	this.resource("another", {
		path: "/another"
	});
	this.resource('team', {
		path: '/team/:team_id'
	});
});

App.CustomFixtureAdapter = DS.FixtureAdapter.extend({
	latency: 2000
});

App.Store = DS.Store.extend({
	adapter: 'App.CustomFixtureAdapter'
});

App.Team = DS.Model.extend({
	name: DS.attr('string'),
	colors: DS.attr('string')
});

App.ApplicationRoute = Ember.Route.extend({
	setupController: function () {
		this.controllerFor('home').set('teams', App.Team.find());
		//this.controllerFor('home').set('schedules', App.Schedule.find());
		this.controllerFor('other').set('teams', App.Team.find());
		this.controllerFor('another').set('teams', App.Team.find());
	}, 
	events: function(){
		console.log('App.ApplicationRoute event captured.');
	}
});

App.HomeRoute = Ember.Route.extend({
	
	init: function () {
		console.log('init HomeRoute');
	},
	model: function () {
		return ['Coed', 'Saturdays from 9AM-3PM', 'at Park Center'];
	},
	setupController: function (controller, model) {
		
		controller.set('info', model);
		// controller.set('teams', App.Team.find());
		// this.controllerFor('other').set('teams', this.controller.get('teams'));
	}
});

App.OtherRoute = Ember.Route.extend({
	
	init: function () {
		console.log('init OtherRoute');
	},
	model: function () {
		return ['This is other info.', 'For the other page.'];
	},
	
	setupController: function (controller, model) {
		
		controller.set('info', model);
		// controller.set('teams', App.Team.find());
		// this.controllerFor('home').set('teams', this.controller.get('teams'));
		
	}
});

App.AnotherRoute = Ember.Route.extend({
	init: function () {
		console.log('init AnotherRoute');
	}
});

App.TeamRoute = Ember.Route.extend({
	
	// this is unecessary, and implemented by default
		
	//	model: function(params) {
	//		return App.Team.find(params.team_id);
	//	},
	//	setupController: function(controller, model) {
	//    	controller.set('content', model);
	//  }
	
});

App.HomeController = Ember.ArrayController.extend({
	
	init: function () {
		console.log('init HomeController');
	},
	
	teamsAreLoaded: function () {
		if (this.get('teams.isUpdating') === true) {
			return false;
		} else {
			return true;
		}
	}.property('teams.isUpdating')
});

App.OtherController = Ember.ArrayController.extend({
	
	init: function () {
		console.log('init OtherController');
	},
	
	teamsAreLoaded: function () {
		if (this.get('teams.isUpdating') === true) {
			return false;
		} else {
			return true;
		}
	}.property('teams.isUpdating')
});

App.AnotherController = Ember.ArrayController.extend({
	
	init: function () {
		console.log('init AnotherController');
	}
});

App.HomeView = Ember.View.extend({
	templateName: 'home'
});

App.TeamView = Ember.View.extend({
	
});

App.TeamsView = Ember.View.extend({
	
	init: function () {
		console.log('init TeamsView');
		//console.log(this.get('controller.teams'));
	},
	
	didInsertElement: function () {
		// At this point, no child elements have been rendered, so
		// schedule decorator to run after the child elements
		// have rendered.
		
		//this.callDecorate();
		this.$().decorate();
		//Ember.run.scheduleOnce('afterRender', this, 'callDecorate');
		//Ember.run.next(this, 'callDecorate');
		
		//var teams = this.get('controller');
		//console.log(teams)
		//console.log(teams.get('isSaving'));
		//console.log(teams.get('isLoaded'));
		
	},
	callDecorate: function () {
		//console.log('decorate')
		//console.log(this.$().pluginName());
		//this.$().decorate();
	},
	afterRender: function () {
		//console.log('afterRender');
	}
});

App.AnotherView = Ember.CollectionView.extend({
	
	// cant init() a CollectionView
	
	// init: function(){
	//   console.log('init AnotherContainerView');
	// },
	
	teamsAreLoaded: false,
	
	didInsertElement: function () {
		
		//this.$().decorate()
		//Ember.run.scheduleOnce('afterRender', this, 'callDecorate');
		console.log('didInsertElement');
		console.log(this.teamsAreLoaded);
		
		if (this.teamsAreLoaded === false) {
			this.$().html('<p class="loading">...Loading teams</p>');
		}
	},
	callDecorate: function () {
		this.$().decorate();
	},
	tagName: 'ul',
	classNames: ['teams'],
	contentBinding: 'controller.teams',
	itemViewClass: Ember.View.extend({
		template: Ember.Handlebars.compile('{{#linkTo "team" view.content}}{{view.content.name}}{{/linkTo}}')
		//template: Em.TEMPLATES['link']
	}),
	
	didInsertChildElements: function () {
		console.log(this.get('state'));
		Ember.run.scheduleOnce('afterRender', this, 'callDecorate');
		this.teamsAreLoaded = true;
	}.observes('[]')
	
});

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