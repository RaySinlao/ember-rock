import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'rarwe/tests/helpers/start-app';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

var server;

module('Acceptance | bands', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
    server.shutdown();
  }
});


// -------------------------------
// Creating a new band


test('Create a new band', function(assert) {
  server = new Pretender(function() {

    httpStubs.stubBands(this, [
      {
        id: 1,
        attributes: {
          name: "Radiohead"
        }
      }
    ]);

    httpStubs.stubCreateBand(this, 2);
    
  });

  visit('/bands');
  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');

  andThen(function() {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', "Created band appears at the end of the list");
    assertElement(assert, '.nav a.active:contains("Songs")', "The Songs tab is active");
  });

});



// -------------------------------
// Creating a new song

test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {

    this.get('/bands', function() {

      var bands = JSON.stringify({
        data: [
          {
            id: 1,
            type: "bands",
            attributes: {
              name: "Radiohead"
            }
          }
        ]
      });

      return [200, { "Content-Type": "application/vnd.api+json" }, bands];

    });

    this.post('/songs', function() {
      var song = JSON.stringify({
        data: [
          {
            id: 1,
            type: "songs",
            attributes: {
              name: "Killer Cars"
            }
          }
        ]
      });

      return [200, { "Content-Type": "application/vnd.api+json" }, song];

    });

    // Goes to homepage 
    selectBand('Radiohead');
    click('.band-link:contains("Radiohead")');
    click('a:contains("create one")');
    fillIn('.new-song', 'Killer Cars');
    submit('.new-song-form');

    andThen(function() {
      assertElement(assert, '.songs .song:contains("Killer Cars")', "Creates the song and displays it in the list");    
    });

  });
});



// -------------------------------
// Listing bands 

test('List bands', function(assert) {
  server = new Pretender(function() {

    this.get('/bands', function(){

      var response = {
        data: [
          {
            id: 1,
            type: "bands",
            attributes: {
              name: "Radiohead"
            }
          },
          {
            id: 2,
            type: "bands",
            attributes: {
              name: "Long Distance Calling"
            }
          }
        ]
      };

      return [200, { "Content-Type": "application/vnd.api+json" }, JSON.stringify(response)];

    });
  });

  visit('/bands');

  andThen(function() {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertLength(assert, '.band-link:contains("Radiohead")', 1, "First band link contains the band name");
    assertLength(assert, '.band-link:contains("Long Distance Calling")', 1, "The other band link contains the band name");
  });

});
