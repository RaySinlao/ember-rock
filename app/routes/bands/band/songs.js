import Ember from 'ember';
import Song from '../../../models/song';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('bands.band');
  },

  actions: {
    createSong: function() {
      var controller = this.get('controller');
      var band       = this.modelFor('bands.band');
      var title      = controller.get('title');

      var song       = Song.create({title: title, band: band});
      band.get('songs').pushObject(song);
      controller.set('title', '')

    },

    /*
     * Handles the action that bubbled up from the component being used in templates/bands/band/song.hbs
     *
     */
    updateRating: function(params) {
      var song   = params.item,
          rating = params.rating;

      song.set('rating', rating);

    }
  }

});
