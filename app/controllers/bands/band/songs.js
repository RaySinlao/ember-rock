import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';

const { Controller, computed, isEmpty } = Ember;


export default Controller.extend({

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

  canCreateSong: computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  searchTerm: '',

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
    const searchTerm = this.get('searchTerm').toLowerCase();

    return this.get('model.songs').filter((song) => {
      const searchTerm = this.get('searchTerm').toLowerCase();

      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;

    });

  }),

  newSongPlaceholder: Ember.computed('model.name', function() {
    var bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  isAddButtonDisabled: computed.empty('title'),
  hasSongs: computed.bool('model.songs.length'),
  canCreateSong: computed.or('songCreationStarted', 'hasSongs'),

  actions: {
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    updateRating(song, rating) {

      if (song.get('rating') === rating) {
        rating = null;
      }
      
      song.set('rating', rating);
      return song.save();
      
    },

    setSorting(option) {
      this.set('sortBy', option);
    }
  }

});
