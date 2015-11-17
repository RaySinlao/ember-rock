import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('band', params.id);
  },

  afterModel(band) {
    var description = band.get('description');

    if (Ember.isEmpty(description)) {
      this.transitionTo('bands.band.songs');
    } else {
      this.transitionTo('bands.band.details');
    }
    
  }
});
