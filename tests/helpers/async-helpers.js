import Ember from 'ember';

function selectBand(app, name) {
  visit('/')
  .click('.band-link:contains("' + name + '")');

  return app.testHelpers.wait();
}

Ember.Test.registerAsyncHelper('selectBand', selectBand)