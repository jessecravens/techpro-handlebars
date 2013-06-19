
/*jslint browser: true*/
/*global $, Ember, DS, App, console */

$.fn.decorate = function () {
	$('ul.teams').children("li").css('color', 'red');
};

App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_ACTIVE_GENERATION: true
});

//App.initializer({
//	name: "debug",
//	initialize: function () {
//		Ember.debug("Debug initializer");
//		console.log('debug');
//	}
//});

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
		this.controllerFor('other').set('teams', App.Team.find());
		this.controllerFor('another').set('teams', App.Team.find());
	}, 
	events: { 

	}
});

App.HomeRoute = Ember.Route.extend({
	
	model: function () {
		return ['Coed', 'Saturdays from 9AM-3PM', 'at Park Center'];
	},
	setupController: function (controller, model) {
		
		controller.set('info', model);
		//controller.set('teams', App.Team.find());
	}
});

App.OtherRoute = Ember.Route.extend({
	
	model: function () {
		return ['This is other info.', 'For the other page.'];
	},
	
	setupController: function (controller, model) {
		
		controller.set('info', model);
		//controller.set('teams', App.Team.find());
	}
});

App.AnotherRoute = Ember.Route.extend({
});

App.TeamRoute = Ember.Route.extend({
	
	// this is unecessary, and implemented by default
		
	//	model: function(params) {
	//		return App.Team.find(params.team_id);
	//	},
	//	setupController: function(controller, model) {
	//		controller.set('content', model);
	//  }
	
});

App.HomeController = Ember.ArrayController.extend({
	
	teamsAreLoaded: function () {
		if (this.get('teams.isUpdating') === true) {
			return false;
		} else {
			return true;
		}
	}.property('teams.isUpdating')
	
});

App.OtherController = Ember.ArrayController.extend({
	
	teamsAreLoaded: function () {
		if (this.get('teams.isUpdating') === true) {
			return false;
		} else {
			return true;
		}
	}.property('teams.isUpdating')
	
});

App.AnotherController = Ember.ArrayController.extend({
	
});

App.HomeView = Ember.View.extend({
	
	templateName: 'home'
	
});

App.TeamView = Ember.View.extend({
	
});

App.TeamsView = Ember.View.extend({
	
	didInsertElement: function () {
		this.$().decorate();
	}
	
});

App.AnotherView = Ember.CollectionView.extend({

	teamsAreLoaded: false,
	
	didInsertElement: function () {
		
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
	}),
	
	didInsertChildElements: function () {
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