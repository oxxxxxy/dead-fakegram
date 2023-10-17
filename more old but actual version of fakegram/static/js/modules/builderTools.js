export var BTools = (function() {
  function BTools() {
    this.__proto__=BTools.prototype;
  };
  BTools.prototype.console=(function (){
    return function(){
      console.log("export var BTools", arguments);
    }
  }());

  BTools.prototype.timeSince=(function () {
    return function(date, isShort){
      let seconds = Math.floor((new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);
      let words=[" years", " months", " weeks", " days", " hours", " minutes", " seconds"];
      if(isShort==true){
        for(let i=0, wordsLength=words.length;i<wordsLength;i++){
          if(i<wordsLength-3){
            words[i]=words[i].substr(0, 2);
          }else{
            words[i]=words[i].substr(0, 4);
          }
        }
      }
      if (interval >= 1) {
        return interval + words[0];
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return interval + words[1];
      }
      interval = Math.floor(seconds / 604800);
      if (interval >= 1) {
        return interval + words[2];
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + words[3];
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return interval + words[4];
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return interval + words[5];
      }
      return Math.floor(seconds) + words[6];
    }
  }());
  BTools.prototype.shuffleArray=(function (){
    return function(arr){
      let currentIndex = arr.length, temporaryValue, randomIndex;
      while (0!==currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }
      return arr;
    }
  }());
  BTools.prototype.doTheyMatch=(function (){
    return function(firstId, arrayOfIds){
      for(let i = 0, len=arrayOfIds.length; i < len; i++) {
        if(firstId==arrayOfIds[i]){
          return true;
        }
      }
      return false;
    }
  }());
  BTools.prototype.varEleClaSty=function(contentOfElement, contentOfClass, contentOfStyle){
      let nameOfVariable;
      nameOfVariable=document.createElement(contentOfElement);
      if(!contentOfElement){
        console.log("you missed the contentOfElement");
        return;
      }
      if(contentOfClass){
        nameOfVariable.setAttribute("class", contentOfClass);
      }
      if(contentOfStyle){
        nameOfVariable.setAttribute("style", contentOfStyle);
      }
      return nameOfVariable;
    }
  ;
  BTools.prototype.appendALotOfChilden=(function (){
    return function(isItCurved, mainDOM){
      if(!mainDOM||!isItCurved){
        console.log("you missed the mainDOM or isItCurved");
        return;
      }
      if(arguments.length>2){
        if(isItCurved==true){
          for(let i=arguments.length-1, j=arguments.length-2;j>0;i--){
            arguments[j].appendChild(arguments[i]);
            j--;
          }
          return mainDOM;
        }else if(isItCurved==false){
          for(let i=2, length=arguments.length;i<length;i++){
            mainDOM.appendChild(arguments[i]);
          }
          return mainDOM;
        }
      }
    }
  }());

  return {
   BTools: BTools
  };
}())
