module.exports = {
  label: "Connect to Wrike_demo",
  mock_input: {
    access_token: ""
  },
  oauth: "wrike_test_9b26d99939",
  validate: function (input, output) {
    // auth credentials will be available in input.auth.access_token
    // callback pattern
    // output(error, success)
    output(null, true)
  }
}