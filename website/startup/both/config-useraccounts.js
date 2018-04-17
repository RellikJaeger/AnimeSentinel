import '/imports/api/users/users.js';
import SimpleSchema from 'simpl-schema';

if (Meteor.isClient) {
  require('/imports/ui/layouts/main.js');
  require('/imports/ui/pages/useraccounts.js');
}

// Configuration
AccountsTemplates.configure({
  defaultTemplate: 'pages_useraccounts',
  defaultLayout: 'layouts_main',
  defaultLayoutRegions: {},
  defaultContentRegion: 'content',

  enablePasswordChange: true,
  enforceEmailVerification: true,
  sendVerificationEmail: true,

  showForgotPasswordLink: true,
  showResendVerificationEmailLink: true,

  continuousValidation: true,
  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: true,
  positiveFeedback: true,

  homeRoutePath: '/sign-in',

  texts: {
    errors: {
      loginForbidden: 'Invalid email or password',
      mustBeLoggedIn: 'You must be logged in to access this page',
    }
  }
});

// Fields for sign in form
AccountsTemplates.addFields([{
  _id: 'username',
  type: 'text',
  required: true
}]);

let emailField = AccountsTemplates.removeField('email');
emailField.re = SimpleSchema.RegEx.EmailWithTLD;
AccountsTemplates.addField(emailField);

let passwordField = AccountsTemplates.removeField('password');
passwordField.minLength = 8;
AccountsTemplates.addField(passwordField);

AccountsTemplates.addField({
  _id: 'malUsername',
  type: 'text',
  displayName: 'MAL Username'
});

AccountsTemplates.addField({
  _id: 'malPassword',
  type: 'password',
  displayName: 'MAL Password'
});

// Email templates
if (Meteor.isServer) {
  Accounts.emailTemplates.siteName = 'AnimeSentinel';
  Accounts.emailTemplates.from = 'AnimeSentinel <animesentinel@wilcodeboer.me>';

  Accounts.emailTemplates.resetPassword = {
    subject() {
      return 'Reset your password for AnimeSentinel';
    },
    text(user, url) {
      url = url.replace('/#', '');
      return `Hey ${user.username}!\n\n`
        + `Reset your password by clicking the following link:\n`
        + `${url}\n\n`
        + `Thanks,\n`
        + `AnimeSentinel`;
    }
  };

  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return 'Verify your email for AnimeSentinel';
    },
    text(user, url) {
      url = url.replace('/#', '');
      return `Hey ${user.username}!\n\n`
        + `Verify your email by clicking the following link:\n`
        + `${url}\n\n`
        + `Thanks,\n`
        + `AnimeSentinel`;
    }
  };
}