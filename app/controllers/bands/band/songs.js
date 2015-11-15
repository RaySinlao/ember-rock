import Ember from 'ember';
import {
  capitalize
}
from '../../../helpers/capitalize';

export default Ember.Controller.extend({

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },

  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function() {
    var options = {
      "ratingDesc": "rating:desc,title:asc",
      "ratingAsc": "rating:asc,title:asc",
      "titleDesc": "title:desc",
      "titleAsc": "title:asc"
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),


  songCreationStarted: false,

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  searchTerm: '',

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
    var searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model.songs').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !==
        -1;
    });
  }),

  newSongPlaceholder: Ember.computed('model.name', function() {
    var bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },

    updateRating: function(song, rating) {

      if (song.get('rating') === rating) {
        rating = null;
      }
      song.set('rating', rating);
      return song.save();
    },

    setSorting: function(option) {
      this.set('sortBy', option);
    }
  }

});
