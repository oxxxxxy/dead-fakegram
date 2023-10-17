(function(){
  var signupForm = document.getElementById('signup-form');
  var mobileEmailField = document.getElementById('mobile-email');
  var fullNameField = document.getElementById('full-name');
  var usernameField = document.getElementById('username');
  var passwordField = document.getElementById('password');
  var passwordConfirmField = document.getElementById('password-confirm');

  var emailRegExp = new RegExp(/^[\S]+@\S+\.\S+/);
  var mobileNumberRegExp = new RegExp(/^\d+$/);
  var usernameRegExp = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/);
  var passwordRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  var areThereAnyWhiteSpaces = /\s+/;

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearFields();

    var dataContainer = {}, isFormValid = true;

    if(checkFieldsValue()){
      isFormValid = false;
    }

    if(areThereAnyWhiteSpaces.test(mobileEmailField.value)){
      mobileEmailField.parentElement.nextElementSibling.innerHTML = 'Email or Mobile Number shouldn\'t have any white spaces.';
      isFormValid = false;
    }else{
      if(emailRegExp.test(mobileEmailField.value)){
        dataContainer.email = mobileEmailField.value;
        dataContainer.mobileNumber = '';
      }else if(mobileNumberRegExp.test(mobileEmailField.value)){
        dataContainer.mobileNumber = mobileEmailField.value;
        dataContainer.email = '';
      }else{
        mobileEmailField.parentElement.nextElementSibling.innerHTML = 'INCORRECT INPUT.';
        isFormValid = false;
      }
    }

    if(!usernameRegExp.test(usernameField.value)){
      usernameField.parentElement.nextElementSibling.innerHTML = 'Username should have minimum three characters and can contain only 0-9, a-z, A-Z, without any other characters.';
      isFormValid = false;
    }

    if(!passwordRegExp.test(passwordField.value)){
      passwordField.parentElement.nextElementSibling.innerHTML = 'Password should have minimum eight characters, at least one letter, one number and one special character.';
      isFormValid = false;
    }

    if(passwordField.value !== passwordConfirmField.value){
      passwordConfirmField.parentElement.nextElementSibling.innerHTML = 'Passwords DO NOT match.'
      isFormValid = false;
    }

    if(isFormValid){
      dataContainer.fullName = fullNameField.value;
      dataContainer.username = usernameField.value;
      dataContainer.password = passwordField.value;
      dataContainer.passwordConfirm = passwordConfirmField.value;
      sendForm(dataContainer);
    }
  }, false);

  var checkFieldsValue =(function() {
    return function(){
      if(!mobileEmailField.value || !fullNameField.value || !usernameField.value || !passwordField.value){
        if(!mobileEmailField.value){
          mobileEmailField.parentElement.nextElementSibling.innerHTML = 'Field is required.';
        }
        if(!fullNameField.value){
          fullNameField.parentElement.nextElementSibling.innerHTML = 'Field is required.';
        }
        if(!usernameField.value){
          usernameField.parentElement.nextElementSibling.innerHTML = 'Field is required.';
        }
        if(!passwordField.value){
          passwordField.parentElement.nextElementSibling.innerHTML = 'Field is required.';
        }
        return true;
      }else{
        return false;
      }
    };
  }());

  function clearFields(){
    mobileEmailField.parentElement.nextElementSibling.innerHTML = '';
    fullNameField.parentElement.nextElementSibling.innerHTML = '';
    usernameField.parentElement.nextElementSibling.innerHTML = '';
    passwordField.parentElement.nextElementSibling.innerHTML = '';
    passwordConfirmField.parentElement.nextElementSibling.innerHTML = '';
  }

  function sendForm(data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/accounts/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      var response;
      try {
        response = JSON.parse(xhr.response);
      } catch (e) {
        console.log(xhr, e);
      }
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
        var regExpLink = new RegExp(/^(.*)(?=\/accounts)/);
        if(regExpLink.test(document.location + '')){
          window.location = regExpLink.exec(document.location + '')[0] + response.url;
        }else{
          window.location = new RegExp(/^(.*)(?=\/)/).exec(document.location + '')[0] + response.url;
        }
      }else if(response.mobileOrEmail || response.fullName || response.username || response.password || response.passwordConfirm){
        if(response.mobileOrEmail){
          mobileEmailField.parentElement.nextElementSibling.innerHTML = response.mobileOrEmail;
        }
        if(response.fullName){
          fullNameField.parentElement.nextElementSibling.innerHTML = response.fullName;
        }
        if(response.username){
          usernameField.parentElement.nextElementSibling.innerHTML = response.username;
        }
        if(response.password){
          passwordField.parentElement.nextElementSibling.innerHTML = response.password;
        }
        if(response.passwordConfirm){
          passwordConfirmField.parentElement.nextElementSibling.innerHTML = response.passwordConfirm;
        }
      }else{
        console.log(xhr, response);
      }
    }
    xhr.send(JSON.stringify(data));
  }
}());
