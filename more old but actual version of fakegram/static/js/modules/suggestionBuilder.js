export var SuggestionB = (function() {
  function SuggestionB() {
    this.__proto__=SuggestionB.prototype;
  };

  SuggestionB.prototype.console=(function (){
    return function(){
      console.log("export var SuggestionB", arguments);
    }
  }());

  SuggestionB.prototype.suggestionConstructor=(function (){
    return function (dataResp, contentSection){
      let postsLen=dataResp.posts.length
      ,storiesLen=dataResp.stories.length;
      if(storiesLen>0){
        let stories_authors=[];
        dataResp.stories= builderTools.shuffleArray(dataResp.stories);
        for (let i = 0; i <storiesLen; i++) {
          for (let j = 0, dataRespUsers=dataResp.users.length; j < dataRespUsers; j++) {
            if(dataResp.users[j].id==dataResp.stories[i].author){
              let authorPart={
                author_id:dataResp.users[j].id
                ,prof_pic:dataResp.users[j].prof_pic
                ,username:dataResp.users[j].username
              };
              stories_authors.push(authorPart);
            }
          }
        }
        dataResp.stories_authors=[].concat(stories_authors);
        let scContainer1=builderTools.varEleClaSty("div", "");
        contentSection.appendChild(scContainer1);
        makeFeedAndSuggestionStories(dataResp, scContainer1)
      }
      let scContainer2=builderTools.varEleClaSty("div", "")
      ,posts_authors=[];
      dataResp.posts=builderTools.shuffleArray(dataResp.posts);
      for(let i=0;i<postsLen;i++){
        for(let j=0, usersLen=dataResp.users.length;j<usersLen;j++){
          if(dataResp.users[j].posts.length>0){
            for(let k=dataResp.users[j].posts.length-1;k>=0;k--){
              if(dataResp.users[j].posts[k].post==dataResp.posts[i]._id){
                let authorPart={
                  author_id:dataResp.users[j].id
                  ,prof_pic:dataResp.users[j].prof_pic
                  ,username:dataResp.users[j].username
                };
                posts_authors.push(authorPart);
                dataResp.users[j].posts.splice(k, 1);
              }
            }
          }
        }
      }
      dataResp.posts_authors=[].concat(posts_authors);
      let scDiv = builderTools.varEleClaSty("div", " VfzDr NFpost1", "padding:10px 10px 10px;margin:5px 0px 55px;max-width:650px;");
        let scD3Div = builderTools.varEleClaSty("div", "_2z6nI");
          let scD3DArticle = builderTools.varEleClaSty("article", "FyNDV");
            let scD3DADiv = builderTools.varEleClaSty("div");
              let scD3DADDiv = builderTools.varEleClaSty("div", "_cn2t2_l1", "flex-direction: column; padding-bottom: 0px; padding-top: 0px;");
                makeProfileAndSuggestionPosts(dataResp, scD3DADDiv);
      scDiv = builderTools.appendALotOfChilden(true, scDiv, scD3Div, scD3DArticle, scD3DADiv, scD3DADDiv);
      scContainer2.appendChild(scDiv);
      contentSection.appendChild(scContainer2);
      contentSection.classList.add("activeContentSection");
      contentSection.style.display="block";
    }
  }());
  /*SuggestionB.prototype.=(function (){
    return function(){

    }
  }());
  SuggestionB.prototype.=(function (){
    return function(){

    }
  }());
  SuggestionB.prototype.=(function (){
    return function(){

    }
  }());
  SuggestionB.prototype.=(function (){
    return function(){

    }
  }());
  SuggestionB.prototype.=(function (){
    return function(){

    }
  }());*/

  return {
   SuggestionB: SuggestionB
  };
}())
