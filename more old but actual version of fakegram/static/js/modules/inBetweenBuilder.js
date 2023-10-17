import {BTools} from './builderTools.js';
export var InBetweenB = (function(BTools) {//BTools
  function InBetweenB() {
    
    console.log("inBetweenBuilder test", BTools)
  };
  InBetweenB.prototype.console=(function (){
    return function(){
      console.log("export var InBetweenB", arguments);
    }
  }());
  InBetweenB.prototype.menuOfThePost=(function (){
    return function (e,body){
      let article=e.target.closest("article")
      ,motpUserId=article.children[0].children[0].children[1].attributes.almostLinkId.nodeValue
      ,motpPostId=article.attributes.almostLinkId.nodeValue;
      deletePostContainer={
        article:article
        ,parentNode:article.parentNode
      };
      let motpDiv=document.createElement("div");
      motpDiv.setAttribute("class", "RnEpo Yx5HN anyMenu");
        let motpDDiv=document.createElement("div");
        motpDDiv.setAttribute("class", "pbNvD  _5VoHb fPMEg");
          let motpDDDiv=document.createElement("div");
          motpDDDiv.setAttribute("class", "piCib");
            let motpDDDDiv=document.createElement("div");
            motpDDDDiv.setAttribute("class", "mt3GC");
            if(motpUserId!=whoami.userId){
              let motpDDDDBttn1=document.createElement("button");
              motpDDDDBttn1.setAttribute("class", "aOOlW -Cab_ reportPost");
              motpDDDDBttn1.setAttribute("almostLinkId", motpPostId);
              motpDDDDBttn1.innerHTML="Report";
            motpDDDDiv.appendChild(motpDDDDBttn1);
              let motpDDDDBttn2=document.createElement("button");
              motpDDDDBttn2.setAttribute("class", "aOOlW -Cab_ unfollow");
              motpDDDDBttn2.setAttribute("almostLinkId", motpUserId);
              motpDDDDBttn2.innerHTML="Unfollow";
            motpDDDDiv.appendChild(motpDDDDBttn2);
            }else{
              let motpDDDDBttn3=document.createElement("button");
              motpDDDDBttn3.setAttribute("class", "aOOlW -Cab_ deletePost");
              motpDDDDBttn3.setAttribute("almostLinkId", motpPostId);
              motpDDDDBttn3.innerHTML="Delete post";
            motpDDDDiv.appendChild(motpDDDDBttn3);
            }
              let motpDDDDBttn5=document.createElement("button");
              motpDDDDBttn5.setAttribute("class", "aOOlW HoLwm closeMenu");
              motpDDDDBttn5.innerHTML="Cancel";
            motpDDDDiv.appendChild(motpDDDDBttn5);
          motpDDDiv.appendChild(motpDDDDiv);
        motpDDiv.appendChild(motpDDDiv);
      motpDiv.appendChild(motpDDiv);
      body.appendChild(motpDiv);
    }
  }());
  InBetweenB.prototype.makeEmptyMessage=(function (){
    return function (textMessage, where, countPX){
      let memDiv=document.createElement("div");
      memDiv.setAttribute("class", "message");
      memDiv.style.height="calc(100vh - "+countPX+")";
        let memDDiv=document.createElement("div");
        memDDiv.setAttribute("class", "messageContainer");
      memDiv.appendChild(memDDiv);
          let memDDDiv1=document.createElement("div");
          memDDDiv1.setAttribute("class", "messageEmoji");
          memDDDiv1.innerHTML=":(";
        memDDiv.appendChild(memDDDiv1);
          let memDDDiv2=document.createElement("div");
          memDDDiv2.setAttribute("class", "messageContainer messageContainerBorder");
        memDDiv.appendChild(memDDDiv2);
          let memDDDiv3=document.createElement("div");
          memDDDiv3.setAttribute("class", "messageContainer");
            let memDDD3P=document.createElement("p");
            memDDD3P.setAttribute("class", "messageText");
            memDDD3P.innerHTML=textMessage;
          memDDDiv3.appendChild(memDDD3P);
        memDDiv.appendChild(memDDDiv3);
      where.appendChild(memDiv);
    }
  }());
  InBetweenB.prototype.makeProfileAndSuggestionPosts=(function (){
    return function (dataResp, where){
      let j=0
      ,length=dataResp.posts.length;
      while(j<length){
        let mppDiv = BTools.BTools.prototype.varEleClaSty("div", "Nnq7C weEfm");
        for(let i=0;i<3&&j<length;i++){
          let mppDDiv = BTools.BTools.prototype.varEleClaSty("div", "v1Nh3 kIKUG  _bz0w almostLinkIdContainer");
          mppDDiv.setAttribute("almostLinkId", dataResp.posts[j]._id);//need
            let mppDDA = BTools.BTools.prototype.varEleClaSty("a", "cpdntch");
              let mppDDADiv = BTools.BTools.prototype.varEleClaSty("div", "eLAPa");
                let mppDDADDiv = BTools.BTools.prototype.varEleClaSty("div", "KL4Bh");
                  let mppDDADDImg = BTools.BTools.prototype.varEleClaSty("img", "FFVAD viewAll", "object-fit: cover;");
                  let mppDDADDImgAlt=(function(){if(dataResp.username){return dataResp.username}return dataResp.posts_authors[j].username}());
                  mppDDADDImg.setAttribute("alt", mppDDADDImgAlt+"'s content");//need
                  mppDDADDImg.setAttribute("src", dataResp.posts[j].post_content_url);//need
          mppDiv = BTools.BTools.prototype.appendALotOfChilden(true, mppDiv, mppDDiv, mppDDA, mppDDADiv, mppDDADDiv, mppDDADDImg);
          if(j==length-1){
            switch (length%3) {
              case 1:
                let mppDDiv2 = BTools.BTools.prototype.varEleClaSty("div", "v1Nh3 kIKUG  _bz0w");
                mppDDiv2.setAttribute("almostLinkId", "");
                let mppDDiv3=mppDDiv2.cloneNode(false);
                mppDiv = BTools.BTools.prototype.appendALotOfChilden(false, mppDiv, mppDDiv2, mppDDiv3);
                break;
              case 2:
                let mppDDiv4 = BTools.BTools.prototype.varEleClaSty("div", "v1Nh3 kIKUG  _bz0w");
                mppDDiv4.setAttribute("almostLinkId", "");
                mppDiv = BTools.BTools.prototype.appendALotOfChilden(false, mppDiv, mppDDiv4);
                break;
            }
          }
          j++;
        }
        where.appendChild(mppDiv);
      }
    }
  }());
  InBetweenB.prototype.makeFeedAndSuggestionStories=(function (){
    return function (dataResp, where){
      let mfsDiv=BTools.BTools.prototype.varEleClaSty("div", "Stories_cnt1 NFpost1");
        let mfsDDiv=BTools.BTools.prototype.varEleClaSty("div", "SC_cnt");
          let mfsDDDiv=BTools.BTools.prototype.varEleClaSty("div", "SC2_cnt1 SC2_cnt2 _cn2t2_l2", "width: auto;");
            let mfsDDDDiv=BTools.BTools.prototype.varEleClaSty("div");
              let translateX=0;
              for(let i=0, length=dataResp.stories.length;i<length;i++){
                let mfs4DDiv=BTools.BTools.prototype.varEleClaSty("div", "SC4_user viewStory");
                mfs4DDiv.setAttribute("almostLinkId", dataResp.stories[i]._id);
                let mfs4DDivStyleContainer="transform: translateX("+translateX+"px);";
                mfs4DDiv.setAttribute("style", mfs4DDivStyleContainer);
                  let mfs4DDBttn=BTools.BTools.prototype.varEleClaSty("button", "SC4u_bttn");
                    let mfs4DDBDiv=BTools.BTools.prototype.varEleClaSty("div", "SC4ub_img_cnt1 SC4ub_img_cnt2");
                      let mfs4DDBDCanvas=BTools.BTools.prototype.varEleClaSty("canvas", "SC4ubic_cnvs SC4ubic_cnvs2");
                      mfs4DDBDCanvas.setAttribute("height", "66");
                      mfs4DDBDCanvas.setAttribute("width", "66");
                      let mfs4DDBDSpan=BTools.BTools.prototype.varEleClaSty("span", "SC4ubic_icon_cnt1");
                        let mfs4DDBDSImg=BTools.BTools.prototype.varEleClaSty("img", "SC4ubicic_icon");
                        mfs4DDBDSImg.setAttribute("src", dataResp.stories_authors[i].prof_pic);
                      mfs4DDBDSpan.appendChild(mfs4DDBDSImg);
                    mfs4DDBDiv.appendChild(mfs4DDBDCanvas);
                    mfs4DDBDiv.appendChild(mfs4DDBDSpan);
                    let mfs4DDBDiv2=BTools.BTools.prototype.varEleClaSty("div", "SC4ub_name_cnt1");
                    mfs4DDBDiv2.setAttribute("almostLinkId", dataResp.stories_authors[i].author_id);
                    mfs4DDBDiv2.innerHTML=dataResp.stories_authors[i].username;
                  mfs4DDBttn.appendChild(mfs4DDBDiv);
                  mfs4DDBttn.appendChild(mfs4DDBDiv2);
                mfs4DDiv.appendChild(mfs4DDBttn);
            mfsDDDDiv.appendChild(mfs4DDiv);
                translateX+=80;
              }
            let mfsDDDDivStyleContainer="flex-direction: row; padding-top: 10px; padding-left: 0px; padding-right: "+translateX+"px;";
            mfsDDDDiv.setAttribute("style", mfsDDDDivStyleContainer);//need
      mfsDiv = BTools.BTools.prototype.appendALotOfChilden(true, mfsDiv, mfsDDiv, mfsDDDiv, mfsDDDDiv);
      where.appendChild(mfsDiv);
    }
  }());
  /*InBetweenB.prototype.=(function (){
    return function(){

    }
  }());
  InBetweenB.prototype.=(function (){
    return function(){

    }
  }());
  InBetweenB.prototype.=(function (){
    return function(){

    }
  }());*/
  return {
   InBetweenB: InBetweenB
  };
}(BTools));//BTools
