import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
  model() {
    return this.modelFor('bands.band');
  },

  actions: {
    didTransition() {
      var band = this.modelFor('bands.band');
      var name = capitalizeWords(band.get('name'));
      document.title = `${band.get('name')} songs - Rock & Roll`;
    },

    createSong() {
      var controller = this.get('controller'),
          band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });

      song.save().then(function() {
        controller.set('title', '');
      });

    },

    updateRating(params) {
      const song = params.item;
      let rating = params.rating;

      if(song.get('rating') === rating) {
        rating = null;
      }

      song.set('rating', rating);
      return song.save();

    }
  }

});
