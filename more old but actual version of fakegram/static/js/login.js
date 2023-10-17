(function(){
  var loginForm = document.getElementById('login-form');
  var numberOrUsernameOrEmailField = document.getElementById('numberOrUsernameOrEmail');
  var passwordField = document.getElementById('password');

  var emailRegExp = new RegExp(/^[\S]+@\S+\.\S+/);
  var mobileNumberRegExp = new RegExp(/^\d+$/);
  var usernameRegExp = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/);
  var passwordRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  var areThereAnyWhiteSpaces = /\s+/;

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearFields();

    var dataContainer = {}, isFormValid = true;

    if(checkFieldsValue()){
      isFormValid = false;
    }

    if(areThereAnyWhiteSpaces.test(numberOrUsernameOrEmailField.value)){
      numberOrUsernameOrEmailField.parentElement.nextElementSibling.innerHTML = 'Field shouldn\'t have any white spaces.';
      isFormValid = false;
    }else{
      if(emailRegExp.test(numberOrUsernameOrEmailField.value)){
        dataContainer.login = numberOrUsernameOrEmailField.value;
        dataContainer.type = 0; //email
      }else if(mobileNumberRegExp.test(numberOrUsernameOrEmailField.value)){
        dataContainer.login = numberOrUsernameOrEmailField.value;
        dataContainer.type = 1; //mobileNumber
      }else if(usernameRegExp.test(numberOrUsernameOrEmailField.value)){
        dataContainer.login = numberOrUsernameOrEmailField.value;
        dataContainer.type = 2; //username
      }else{
        numberOrUsernameOrEmailField.parentElement.nextElementSibling.innerHTML = 'INCORRECT INPUT.';
        isFormValid = false;
      }
    }

    if(!passwordRegExp.test(passwordField.value)){
      passwordField.parentElement.nextElementSibling.innerHTML = 'Password should have minimum eight characters, at least one letter, one number and one special character.';
      isFormValid = false;
    }

    if(isFormValid){
      dataContainer.password = passwordField.value;
      sendForm(dataContainer);
    }
  }, false);

  var checkFieldsValue = function(){
    if(!numberOrUsernameOrEmailField.value || !passwordField.value){
      if(!numberOrUsernameOrEmailField.value){
        numberOrUsernameOrEmailField.parentElement.nextElementSibling.innerHTML = 'Field is required.';
      }
      if(!passwordField.value){
        passwordField.parentElement.nextElementSibling.innerHTML = 'Field is required.';
      }
      return true;
    }else{
      return false;
    }
  };

  function clearFields(){
    numberOrUsernameOrEmailField.parentElement.nextElementSibling.innerHTML = '';
    passwordField.parentElement.nextElementSibling.innerHTML = '';
    document.getElementById('error').innerHTML = '';
  }

  function sendForm(data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/accounts/login', true);
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
          window.location = regExpLink.exec(document.location + '')[0];
        }else{
          window.location = new RegExp(/^(.*)(?=\/)/).exec(document.location + '')[0] + response.url;
        }
      }else if(response.login || response.password || response.wrongLoginOrPassword){
        if(response.login){
          numberOrUsernameOrEmailField.parentElement.nextElementSibling.innerHTML = response.login;
        }
        if(response.password){
          passwordField.parentElement.nextElementSibling.innerHTML = response.password;
        }
        if(response.wrongLoginOrPassword){
          document.getElementById('error').innerHTML = response.wrongLoginOrPassword;
        }
      }else{
        console.log(xhr, response);
      }
    }
    xhr.send(JSON.stringify(data));
  }
}());
