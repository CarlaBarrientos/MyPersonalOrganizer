// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "agendas e2e tests": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent("#nav-bar-menu")
      .click("#nav-bar-icon")
      .pause(2000)
      .click(".link.Agendas")
      .pause(2000)
      .click("#btn-add-agenda")
      .pause(2000)
      .setValue("input[id=agenda-name]", "Alejandro Gueno")
      .pause(1000)
      .setValue("input[id=agenda-desc]", "Un poco rata")
      .pause(1000)
      .setValue("input[id=agenda-start-hour]", "12:00")
      .pause(1000)
      .setValue("input[id=agenda-end-hour]", "20:00")
      .pause(1000)
      .click("#save-agenda")
      .pause(1000)
      .assert.containsText(".subheading", "Alejandro Gueno")
      .end();
  },
  "participants e2e": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent("#nav-bar-menu")
      .click("#nav-bar-icon")
      .pause(2000)
      .click(".link.Participants")
      .pause(2000)
      .click("#btn-add-participant")
      .pause(2000)
      .setValue("input[id=participant-name]", "Pepito")
      .pause(1000)
      .setValue("input[id=participant-contactNumber]", "70777777")
      .pause(1000)
      .click("#btn-save-participant")
      .pause(1000)
      .assert.containsText("#participant-name", "Pepito")
      .pause(2000)
      .click(".participant.Pepito")
      .pause(2000)
      .click("#btn-delete-participant")
      .pause(2000)
      .end();
  }
};
