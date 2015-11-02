import Ember from 'ember';


export default Ember.Object.extend({
  name: '',
  description: '',

  /*
   * If you don't explicitly pass in an empty songs array for each band object you create, 
   * they will share the underlying array defined on the class (the prototype).
   *
   */

  setupSongs: Ember.on('init', function() {

    // Defines songs array for new band
    if (!this.get('songs')) {
      this.set('songs', []);
    }
  }),

  // Creates a slug for the URL
  slug: Ember.computed('name', function() {
    return this.get('name').dasherize();
  })

});
