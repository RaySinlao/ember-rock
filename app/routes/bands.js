import Ember from 'ember';


function wait(promise, delay) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}

export default Ember.Route.extend({
  model() {
    return this.store.findAll('band');
  },

  afterModel(model) {
    var bands = model;
    if (bands.length === 1) {
      this.transitionTo('bands.band', bands.get('firstObject'));
    }
  },

  actions: {
    didTransition() {
      document.title = 'Bands - Rock & Roll';
    },

    createBand() {
      var route = this,
        controller = this.get('controller');

      var band = this.store.createRecord('band', controller.getProperties('name'));

      band.save().then(function() {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band);
      });

    }
  }
});
