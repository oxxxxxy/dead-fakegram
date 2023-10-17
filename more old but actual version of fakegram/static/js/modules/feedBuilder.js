import {BTools} from './builderTools.js';
import {InBetweenB}from './inBetweenBuilder.js';
export var FeedB = (function(BTools, InBetweenB) {
  function FeedB() {
    this.__proto__=FeedB.prototype;
    console.log("test", BTools, InBetweenB)
  };

  FeedB.prototype.console=(function (){
    return function(){
      console.log("export var FeedB", arguments);
    }
  }());

  FeedB.prototype.makePost=(function (){
    return function (dataResp, where, cn2t2_list){
      for(let i=dataResp.posts.length-1; i>=0;i--){
        let postArticle=document.createElement("article");
        postArticle.setAttribute("class", "NFpost1 NFpost2 NFpost3 NFpost4 almostLinkIdContainer");
        postArticle.setAttribute("almostLinkId", `${dataResp.posts[i]._id}`);
        //1st part
          let postAHeader=document.createElement("header");
          postAHeader.setAttribute("class", "NFPhead1 NFPhead2 NFPhead3");
            let pahDiv=document.createElement("div");
            pahDiv.setAttribute("class", "NFPHcnt1");
            pahDiv.setAttribute("tabindex", "0");
            pahDiv.setAttribute("role","button");
              let pahdCanvas=document.createElement("canvas");
              pahdCanvas.setAttribute("class","NFPHCcnvs NFPHCcnvsNFPHCcnvs");
              let pahdA=document.createElement("a");
              pahdA.setAttribute("class", "NFPHCa1 NFPHCa2 NPEca_a2 NFPHCa1NFPHCa2NPEca_a2");
              pahdA.setAttribute("almostLinkId",`${dataResp.posts_authors[i].author_id}`);/*need*/
                let pahdaImg=document.createElement("img");
                pahdaImg.setAttribute("class","NFPHCaImg");
                pahdaImg.setAttribute("src",`${dataResp.posts_authors[i].prof_pic}`);/*need*/
                pahdaImg.setAttribute("alt",`${dataResp.posts_authors[i].username}'s profile picture`);/*need*/
              pahdA.appendChild(pahdaImg);
            pahDiv.appendChild(pahdCanvas);
            pahDiv.appendChild(pahdA);
            let pahDiv2=document.createElement("div");
            pahDiv2.setAttribute("class", "NFPHcntT");
              let pahD2Div=document.createElement("div");
                let pahD2DDiv=document.createElement("div");
                pahD2DDiv.setAttribute("class", "NFPHcTc");
                  let pahD2DDHtwo=document.createElement("h2");
                  pahD2DDHtwo.setAttribute("class", "NFPHcTch2");
                    let pahD2DDHtA=document.createElement("a");
                    pahD2DDHtA.setAttribute("class", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch viewProfile");
                    pahD2DDHtA.setAttribute("title", `${dataResp.posts_authors[i].username}`);/*need*/
                    pahD2DDHtA.setAttribute("almostLinkId",`${dataResp.posts_authors[i].author_id}`);/*need*/
                    pahD2DDHtA.innerHTML=`${dataResp.posts_authors[i].username}`;/*need*/
                  pahD2DDHtwo.appendChild(pahD2DDHtA);
                pahD2DDiv.appendChild(pahD2DDHtwo);
              pahD2Div.appendChild(pahD2DDiv);
            pahDiv2.appendChild(pahD2Div);
          postAHeader.appendChild(pahDiv);
          postAHeader.appendChild(pahDiv2);
        postArticle.appendChild(postAHeader);
        //2nd part
          let postADiv=document.createElement("div");
          postADiv.setAttribute("class", "NFPcntnt");
            let padDiv=document.createElement("div");
            padDiv.setAttribute("class", "NFPCbttn");
            padDiv.setAttribute("role", "button");
            padDiv.setAttribute("tabindex", "0");
              let padDDiv=document.createElement("div");
              padDDiv.setAttribute("class", "NFPCBcnt1 NFPCBcnt2 NFPCBcnt3");
                let padDDDiv=document.createElement("div");
                padDDDiv.setAttribute("class", "NFPCBCcnt1");
                padDDDiv.setAttribute("role", "button");
                padDDDiv.setAttribute("tabindex", "0");
                  let padDDDDiv=document.createElement("div");
                  padDDDDiv.setAttribute("class", "NFPCBC2cnt");
                    let padDDDDImg=BTools.BTools.prototype.varEleClaSty("img", "NFPCBC3img like");//EBANIYROT
                    padDDDDImg.setAttribute("alt", "No photo description available.");
                  //  padDDDDImg.setAttribute("class", "NFPCBC3img like");
                    padDDDDImg.setAttribute("src", `${dataResp.posts[i].post_content_url}`);//need
                  padDDDDiv.appendChild(padDDDDImg);
                padDDDiv.appendChild(padDDDDiv);
              padDDiv.appendChild(padDDDiv);
            padDiv.appendChild(padDDiv);
          postADiv.appendChild(padDiv);
        postArticle.appendChild(postADiv);
        //3rd part
          let postADiv2=document.createElement("div");
          postADiv2.setAttribute("class","NFPmenu eo2As");
            let pad2Section=document.createElement("section");
            pad2Section.setAttribute("class","NFPMcnt1 NFPMcnt2 ltpMr Slqrh");
              let pad2SSpan=document.createElement("span");
              pad2SSpan.setAttribute("class","NFPMcs fr66n");
                let pad2SSButton=document.createElement("button");
                pad2SSButton.setAttribute("class","NFPMcsbttn1 NFPMcsbttn2 NFPMcsbttn3 dCJp8 afkep _0mzm- like");
                  let pad2SSBSpan=document.createElement("span");
                  if(dataResp.posts[i].post_likes.length>0){
                    function checkLike(id) {
                      return id.user_id == whoami.userId;
                    }
                    try {
                      dataResp.posts[i].post_likes.find(checkLike).user_id;
                      pad2SSBSpan.setAttribute("class","NPEca_logo c2lac_logo2 sprite_heart_filled__24__red_5 c2lac_logo2 like");
                    } catch (e) {
                      pad2SSBSpan.setAttribute("class","NPEca_logo c2lac_logo2 sprite_heart_empty_24 c2lac_logo2 like");
                    }
                  }else{
                    pad2SSBSpan.setAttribute("class","NPEca_logo c2lac_logo2 sprite_heart_empty_24 c2lac_logo2 like");
                  }
                  pad2SSBSpan.setAttribute("aria-label","Like");
                pad2SSButton.appendChild(pad2SSBSpan);
              pad2SSpan.appendChild(pad2SSButton);
              let pad2SSpan2=document.createElement("span");
              pad2SSpan2.setAttribute("class","NFPMcs2 _15y0l");
                let pad2SS2Button=document.createElement("button");
                pad2SS2Button.setAttribute("class","NFPMcsbttn1 NFPMcsbttn2 NFPMcsbttn3 dCJp8 afkep _0mzm- comment");
                  let pad2SS2BSpan=document.createElement("span");
                  pad2SS2BSpan.setAttribute("class","NPEca_comment c2lac_logo2 glyphsSpriteComment__outline__24__grey_9 c2lac_logo2 comment");
                  pad2SS2BSpan.setAttribute("aria-label","Comment");
                pad2SS2Button.appendChild(pad2SS2BSpan);
              pad2SSpan2.appendChild(pad2SS2Button);
            pad2Section.appendChild(pad2SSpan);
            pad2Section.appendChild(pad2SSpan2);
            let pad2Section2=document.createElement("section");
            pad2Section2.setAttribute("class","NFPMcntT1 NFPMcntT2 EDfFK ygqzn");
            if(dataResp.posts[i].post_likes.length>0){
              let pad2SDiv=document.createElement("div");
              pad2SDiv.setAttribute("class","c2la_cnt1 NFPMcTc2 c2la_cnt3 c2la_cnt4 NFPMcTc5 Igw0E  IwRSH   eGOV_  ybXk5  vwCYk ");
                let pad2SDDiv=document.createElement("div");
                pad2SDDiv.setAttribute("class","NFPMcTcc Nm9Fw");
                  let pad2SDDButton=document.createElement("button");
                  pad2SDDButton.setAttribute("class","_0mzm- sqdOP yWX7d _8A5w5");
                  pad2SDDButton.setAttribute("type","button");
                    let pad2SDDBSpan=document.createElement("span");
                    pad2SDDBSpan.innerHTML=`${dataResp.posts[i].post_likes.length}`;/*need*/
                  pad2SDDButton.appendChild(pad2SDDBSpan);
                  if(dataResp.posts[i].post_likes.length==1){
                    pad2SDDButton.innerHTML+=" like";
                  }else{
                    pad2SDDButton.innerHTML+=" likes";
                  }
                pad2SDDiv.appendChild(pad2SDDButton);
              pad2SDiv.appendChild(pad2SDDiv);
            pad2Section2.appendChild(pad2SDiv);
            }
            let pad2Div=document.createElement("div");
            pad2Div.setAttribute("class","NFPMcntTh1 NFPMcntTh2 KlCQn  EtaWk");
              let pad2DUl=document.createElement("ul");
              pad2DUl.setAttribute("class","NFPMcThul k59kT");
              if(dataResp.posts[i].post_description.length>0){
                let pad2DUDiv=document.createElement("div");
                pad2DUDiv.setAttribute("class","NFPCbttn ZyFrc");
                pad2DUDiv.setAttribute("role","button");
                  let pad2DUDLi=document.createElement("li");
                  pad2DUDLi.setAttribute("class","gElp9 NFPCBli");
                  pad2DUDLi.setAttribute("role","menuitem");
                    let pad2DUDLDiv=document.createElement("div");
                    pad2DUDLDiv.setAttribute("class","NFPCBld P9YgZ");
                      let pad2DUDLDDiv=document.createElement("div");
                      pad2DUDLDDiv.setAttribute("class","NFPCBld21 NFPCBld22 C7I1f X7jCj");
                        let pad2DUDLDDDiv=document.createElement("div");
                        pad2DUDLDDDiv.setAttribute("class","NFPCBld3 C4VMK");
                          let pad2DUDLDDDHtwo=document.createElement("h2");
                          pad2DUDLDDDHtwo.setAttribute("class","NFPCBld3h2 _6lAjh");
                          pad2DUDLDDDHtwo.setAttribute("style","padding-bottom:5px");
                            let pad2DUDLDDDHtA=document.createElement("a");
                            pad2DUDLDDDHtA.setAttribute("class","NFPHcTch2a1 NFPHcTch2a2 NFPCBld3h2a3 FPmhX notranslate TlrDj cpdntch viewProfile");
                            pad2DUDLDDDHtA.setAttribute("title",`${dataResp.posts_authors[i].username}`);/*need*/
                            pad2DUDLDDDHtA.setAttribute("almostLinkId",`${dataResp.posts_authors[i].author_id}`);/*need*/
                            pad2DUDLDDDHtA.innerHTML=`${dataResp.posts_authors[i].username}`;/*need*/
                          pad2DUDLDDDHtwo.appendChild(pad2DUDLDDDHtA);
                          let pad2DUDLDDDSpan=document.createElement("span");
                            let pad2DUDLDDDSSpan=document.createElement("span");
                          if(dataResp.posts[i].post_description.length>150&&!cn2t2_list){
                            pad2DUDLDDDSSpan.innerHTML=`${dataResp.posts[i].post_description.substr(0, 150)}`;/*need*/
                          pad2DUDLDDDSpan.appendChild(pad2DUDLDDDSSpan);
                            let pad2DUDLDDDSSpan2=document.createElement("span");
                            pad2DUDLDDDSSpan2.setAttribute("class","NFPCBld3ss _2UvmX");
                            pad2DUDLDDDSSpan2.innerHTML="...&nbsp;";
                              let pad2DUDLDDDSS2Button=document.createElement("button");
                              pad2DUDLDDDSS2Button.setAttribute("class","NFPCBld3ssb sXUSN cpdntch viewAll");
                              pad2DUDLDDDSS2Button.innerHTML="more";
                            pad2DUDLDDDSSpan2.appendChild(pad2DUDLDDDSS2Button);
                          pad2DUDLDDDSpan.appendChild(pad2DUDLDDDSSpan2);
                          }else{
                            pad2DUDLDDDSSpan.innerHTML=`${dataResp.posts[i].post_description}`;/*need*/
                          pad2DUDLDDDSpan.appendChild(pad2DUDLDDDSSpan);
                          }
                        pad2DUDLDDDiv.appendChild(pad2DUDLDDDHtwo);
                        pad2DUDLDDDiv.appendChild(pad2DUDLDDDSpan);
                      pad2DUDLDDiv.appendChild(pad2DUDLDDDiv);
                    pad2DUDLDiv.appendChild(pad2DUDLDDiv);
                  pad2DUDLi.appendChild(pad2DUDLDiv);
                pad2DUDiv.appendChild(pad2DUDLi);
              pad2Div.appendChild(pad2DUDiv);
              }
                /*comments*/
              if(dataResp.posts[i].post_comments.length>0){
                let kk=dataResp.posts[i].post_comments.length-1;
                if(!cn2t2_list){
                  if(dataResp.posts[i].post_comments.length<2){
                    while(kk>=0){
                      addCommentToThePost(kk);
                      kk--;
                    }
                  }else if(dataResp.posts[i].post_comments.length>=2){
                    while(kk>=dataResp.posts[i].post_comments.length-2){
                      addCommentToThePost(kk);
                      kk--;
                    }
                  }
                  if(dataResp.posts[i].post_comments.length>2){
                      let pad2DULi=document.createElement("li");
                      pad2DULi.setAttribute("class","lnrre");
                        let pad2DULButton=document.createElement("button");
                        pad2DULButton.setAttribute("class","Z4IfV _0mzm- sqdOP yWX7d viewAll");
                        pad2DULButton.setAttribute("type","button");
                        pad2DULButton.innerHTML="View all ";
                          let pad2DULBSpan=document.createElement("span");
                          pad2DULBSpan.innerHTML=`${dataResp.posts[i].post_comments.length}`;/*need*/
                        pad2DULButton.appendChild(pad2DULBSpan);
                        pad2DULButton.innerHTML+=" comments";
                      pad2DULi.appendChild(pad2DULButton);
                    pad2Div.appendChild(pad2DULi);
                  }
                }else{
                  while(kk>=0){
                    addCommentToThePost(kk);
                    kk--;
                  }
                }
                function addCommentToThePost(kk){
                  let pad2DUDiv2=document.createElement("div");
                  pad2DUDiv2.setAttribute("class","NFPCbttn ZyFrc");
                  pad2DUDiv2.setAttribute("role","button");
                    let pad2DUD2Li=document.createElement("li");
                    pad2DUD2Li.setAttribute("class","gElp9 NFPCBli");
                    pad2DUD2Li.setAttribute("role","menuitem");
                      let pad2DUD2LDiv=document.createElement("div");
                      pad2DUD2LDiv.setAttribute("class","NFPCBld P9YgZ");
                        let pad2DUD2LDDiv=document.createElement("div");
                        pad2DUD2LDDiv.setAttribute("class","NFPCBld21  C7I1f ");
                          let pad2DUD2LDDDiv=document.createElement("div");
                          pad2DUD2LDDDiv.setAttribute("class","NFPCBld3 C4VMK");
                            let pad2DUD2LDDDHthree=document.createElement("h3");
                            pad2DUD2LDDDHthree.setAttribute("class","NFPCBld3h2 _6lAjh");
                              let pad2DUD2LDDDHtA=document.createElement("a");
                              pad2DUD2LDDDHtA.setAttribute("class","NFPHcTch2a1 NFPHcTch2a2 NFPCBld3h2a3 FPmhX notranslate TlrDj  cpdntch viewProfile");
                              pad2DUD2LDDDHtA.setAttribute("title",`${dataResp.posts[i].post_comments[kk].comment.username}`);/*need*/
                              pad2DUD2LDDDHtA.setAttribute("almostLinkId",`${dataResp.posts[i].post_comments[kk].comment.userId}`);/*need*/
                              pad2DUD2LDDDHtA.innerHTML=`${dataResp.posts[i].post_comments[kk].comment.username}`;/*need*/
                            pad2DUD2LDDDHthree.appendChild(pad2DUD2LDDDHtA);
                            let pad2DUD2LDDDSpan=document.createElement("span");
                              let pad2DUD2LDDDSSpan=document.createElement("span");
                              pad2DUD2LDDDSSpan.innerHTML=`${dataResp.posts[i].post_comments[kk].comment.userComment}`;/*need*/
                            pad2DUD2LDDDSpan.appendChild(pad2DUD2LDDDSSpan);
                          pad2DUD2LDDDiv.appendChild(pad2DUD2LDDDHthree);
                          pad2DUD2LDDDiv.appendChild(pad2DUD2LDDDSpan);
                        pad2DUD2LDDiv.appendChild(pad2DUD2LDDDiv);
                      pad2DUD2LDiv.appendChild(pad2DUD2LDDiv);
                      if(dataResp.posts[i].post_comments[kk].comment.userId==whoami.userId){
                          let pad2DUD2LDSpan=document.createElement("span");
                          pad2DUD2LDSpan.setAttribute("class","jdtwu");
                            let pad2DUD2LDSButton=document.createElement("button");
                            pad2DUD2LDSButton.setAttribute("class","_2ic5v");
                              let pad2DUD2LDSBSpan=document.createElement("span");
                              pad2DUD2LDSBSpan.setAttribute("class","glyphsSpriteGrey_Close u-__7 deleteComment");
                              pad2DUD2LDSBSpan.setAttribute("aria-label","Like");
                              pad2DUD2LDSBSpan.setAttribute("almostLinkId",`${dataResp.posts[i].post_comments[kk].comment.created}`);/*need*/
                            pad2DUD2LDSButton.appendChild(pad2DUD2LDSBSpan);
                          pad2DUD2LDSpan.appendChild(pad2DUD2LDSButton);
                        pad2DUD2LDiv.appendChild(pad2DUD2LDSpan);
                      }
                    pad2DUD2Li.appendChild(pad2DUD2LDiv);
                  pad2DUDiv2.appendChild(pad2DUD2Li);
                pad2DUl.insertBefore(pad2DUDiv2, pad2DUl.childNodes[0]);
                }
              }
            pad2Div.appendChild(pad2DUl);
            let pad2Div2=document.createElement("div");
            pad2Div2.setAttribute("class","NFPMcntF1 NFPMcntF2 k_Q0X NnvRN");
              let pad2D2A=document.createElement("a");
              pad2D2A.setAttribute("class","NFPMcntFa c-Yi7 cpdntch");
                let pad2D2ATime=document.createElement("time");
                let postCreatedDate= new Date(dataResp.posts[i].post_created);
                pad2D2ATime.setAttribute("class","NFPMcntFat1 NFPMcntFat2 _1o9PC Nzb55 viewAll");
                pad2D2ATime.setAttribute("datetime",`${postCreatedDate.toISOString()}`);/*need*/
                pad2D2ATime.setAttribute("title",`${postCreatedDate.toDateString().substr(4, 15)}`);/*need*/
                pad2D2ATime.innerHTML= BTools.BTools.prototype.timeSince(postCreatedDate)+" ago";/*need*/
              pad2D2A.appendChild(pad2D2ATime);
            pad2Div2.appendChild(pad2D2A);
          postADiv2.appendChild(pad2Section);
          postADiv2.appendChild(pad2Section2);
          postADiv2.appendChild(pad2Div);
          postADiv2.appendChild(pad2Div2);
          //add comment
            let pad2Section3=document.createElement("section");
            pad2Section3.setAttribute("class","sH9wk _JgwE");
              let pad2S3div=document.createElement("div");
              pad2S3div.setAttribute("class","RxpZH");
                let pad2S3Ddiv=document.createElement("div");
                pad2S3Ddiv.setAttribute("class","X7cDz");
                  let pad2S3DFTextarea=document.createElement("textarea");
                  pad2S3DFTextarea.setAttribute("class","Ypffh");
                  pad2S3DFTextarea.setAttribute("placeholder","Add a comment…");
                  pad2S3DFTextarea.setAttribute("aria-label","Add a comment…");
                  pad2S3DFTextarea.setAttribute("autocomplete","off");
                  pad2S3DFTextarea.setAttribute("autocorrect","off");
                  let pad2S3DFButton=document.createElement("button");
                  pad2S3DFButton.setAttribute("class","_0mzm- sqdOP yWX7d addcomment");
                  pad2S3DFButton.setAttribute("disabled","");
                  pad2S3DFButton.innerHTML="Post";
                pad2S3Ddiv.appendChild(pad2S3DFTextarea);
                pad2S3Ddiv.appendChild(pad2S3DFButton);
              pad2S3div.appendChild(pad2S3Ddiv);
            pad2Section3.appendChild(pad2S3div);
          postADiv2.appendChild(pad2Section3);
        postArticle.appendChild(postADiv2);
        //4th part
          let postADiv3=document.createElement("div");
          postADiv3.setAttribute("class","NFPmore MEAGs");
            let pad3Button=document.createElement("button");
            pad3Button.setAttribute("class","NFPMcsbttn1 NFPMcsbttn2 NFPMcsbttn3 dCJp8 afkep _0mzm- moreOptions");
              let pad3BSpan=document.createElement("span");
              pad3BSpan.setAttribute("class","NFPMbs_more c2lac_logo2 moreOptions");
              pad3BSpan.setAttribute("aria-label","More options");
            pad3Button.appendChild(pad3BSpan);
          postADiv3.appendChild(pad3Button);
        postArticle.appendChild(postADiv3);
        where.appendChild(postArticle);
        if(cn2t2_list){
          cn2t2_list.appendChild(where);
          cn2t2_list.classList.add("activeContentSection");
          cn2t2_list.style.display="block";
        }
      }
    }
  }());
  FeedB.prototype.feedConstructor=(function (){
    return function (dataResp, contentSection){
      let fcDivPostsContainer=BTools.BTools.prototype.varEleClaSty("div", "");
      if(dataResp.hasData==true){
        let postsLen=dataResp.posts.length
        ,storiesLen=dataResp.stories.length;
        if(storiesLen>0){
          let stories_authors=[];
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
          let fcDivStoriesContainer=BTools.BTools.prototype.varEleClaSty("div", "");
          contentSection.appendChild(fcDivStoriesContainer);
          InBetweenB.InBetweenB.prototype.makeFeedAndSuggestionStories(dataResp, fcDivStoriesContainer)
        }
        if(postsLen>0){
          let posts_authors=[];
          dataResp.posts.sort(function (a, b) {
            return new Date(a.post_created) - new Date(b.post_created);
          });
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
          let fcDDiv=BTools.BTools.prototype.varEleClaSty("div", "_cn2t2_l1", "flex-direction: column; min-height:100vh;padding-bottom: 650px; padding-top: 0px;");
          fcDivPostsContainer.appendChild(fcDDiv);
          FeedB.prototype.makePost(dataResp,fcDDiv);
        }else{
          let searchContainer=BTools.BTools.prototype.varEleClaSty("div");
            let searchContainerA=BTools.BTools.prototype.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch SearchSection");
            searchContainerA.innerHTML="Search";
          searchContainer.appendChild(searchContainerA)
          let postContainer=BTools.BTools.prototype.varEleClaSty("div");
            let postContainerA=BTools.BTools.prototype.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch NewPostStorySection");
            postContainerA.innerHTML="Post";
          postContainer.appendChild(postContainerA)
          if(dataResp.usersIds>1){
            let text="Your following and you haven't any posts yet. Make one "+postContainer.innerHTML+". And you can use "+searchContainer.innerHTML+" to find new user to follow.";
            InBetweenB.InBetweenB.prototype.makeEmptyMessage(text, fcDivPostsContainer, "110px");
          }else{
            let text="You haven't following and any posts yet. Use "+searchContainer.innerHTML+" to find new user to follow. And you can make one "+postContainer.innerHTML+".";
            InBetweenB.InBetweenB.prototype.makeEmptyMessage(text, fcDivPostsContainer, "110px");
          }
        }
      }else{
        let searchContainer=BTools.BTools.prototype.varEleClaSty("div");
          let searchContainerA=BTools.BTools.prototype.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch SearchSection");
          searchContainerA.innerHTML="Search";
        searchContainer.appendChild(searchContainerA)
        let storyContainer=BTools.BTools.prototype.varEleClaSty("div");
          let storyContainerA=BTools.BTools.prototype.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch NewPostStorySection");
          storyContainerA.innerHTML="Story";
        storyContainer.appendChild(storyContainerA)
        let postContainer=BTools.BTools.prototype.varEleClaSty("div");
          let postContainerA=BTools.BTools.prototype.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch NewPostStorySection");
          postContainerA.innerHTML="Post";
        postContainer.appendChild(postContainerA)
        if(dataResp.usersIds>1){
          let text="Your following and you haven't any posts or stories yet. Make one "+postContainer.innerHTML+" or "+storyContainer.innerHTML+". And you can use "+searchContainer.innerHTML+" to find new user to follow.";
          InBetweenB.InBetweenB.prototype.makeEmptyMessage(text, fcDivPostsContainer, "110px");
        }else{
          let text="You haven't following and any posts or stories yet. Use "+searchContainer.innerHTML+" to find new user to follow. And you can make one "+postContainer.innerHTML+" or "+storyContainer.innerHTML+".";
          InBetweenB.InBetweenB.prototype.makeEmptyMessage(text, fcDivPostsContainer, "110px");
        }
      }
      contentSection.appendChild(fcDivPostsContainer);
      contentSection.classList.add("activeContentSection");
      contentSection.style.display="block";
    }
  }());
  /*FeedB.prototype.=(function (){
    return function(){

    }
  }());
  FeedB.prototype.=(function (){
    return function(){

    }
  }());
  FeedB.prototype.=(function (){
    return function(){

    }
  }());
  FeedB.prototype.=(function (){
    return function(){

    }
  }());
  FeedB.prototype.=(function (){
    return function(){

    }
  }());
  FeedB.prototype.=(function (){
    return function(){

    }
  }());*/

  return {
   FeedB: FeedB
  };
}(BTools, InBetweenB))
