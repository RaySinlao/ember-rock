import Ember from 'ember';

export default Ember.Controller.extend({

  sortProperties: ['rating:desc', 'title:asc'],
  sortedSongs: Ember.computed.sort('model.songs', 'sortProperties'),

  songCreationStarted: false,

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },

    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      song.save();

    }
  }

});
