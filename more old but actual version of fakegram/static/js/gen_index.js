import {BTools} from './modules/builderTools.js';
var builderTools = Object.create(null);
console.log("mark",builderTools);
builderTools = new BTools.BTools();
builderTools.console(builderTools);

import {InBetweenB}from './modules/inBetweenBuilder.js';
var inBetweenBuilder //= Object.create(null)
;
console.log("mark",inBetweenBuilder);
inBetweenBuilder = new InBetweenB.InBetweenB();
inBetweenBuilder.console(inBetweenBuilder);

import {FeedB} from './modules/feedBuilder.js';
var feedBuilder = Object.create(null);
feedBuilder = new FeedB.FeedB();
feedBuilder.console(feedBuilder);

import {ActivityB}from './modules/activityBuilder.js';
var activityBuilder = Object.create(null);
activityBuilder = new ActivityB.ActivityB();
activityBuilder.console(activityBuilder);

import {ProfileB}from './modules/profileBuilder.js';
var profileBuilder = Object.create(null);
profileBuilder = new ProfileB.ProfileB();
profileBuilder.console(profileBuilder);

import {SuggestionB}from './modules/suggestionBuilder.js';
var suggestionBuilder = Object.create(null);
suggestionBuilder = new SuggestionB.SuggestionB();
suggestionBuilder.console(suggestionBuilder);

fetch(`/check`)
.then((res)=>{
  if(res.url.match(/[^.*\/]+$/)=='authentication'){
    window.location = res.url;
  }else{
    return res.json();

  }
}).then(waidata=>{
  let btn_list_on, btn_list_off, searchReady=true, mmbReady=false, deletePostContainer={}, cn2t2_list, logoOrSearch, post_input, post_inp_desc, post_send, whoami=waidata, allContainerSection, story_send, story_input, story_inp_desc;
  fetch('/parts',{
    method:'GET',
    headers:{
      'page_part':'main.html'
    }
  }).then(
    (res)=>{
      return res.text().then(
        function(text){
          console.log(SomePart, "SomePart");
          (function(sp) {
            console.log("sp",sp)
            sp.SomePart
          }(SomePart));
          //load block
          document.getElementsByTagName('body')[0].innerHTML+=text;
          let check=false;
          let body=document.getElementsByTagName('body')[0];
          function deltwo(){
            try {
              if(body.getElementsByClassName('block_screen')[0]){
                document.getElementsByClassName('general-container')[0].style.display="inherit";
                body.removeChild(body.getElementsByClassName('block_screen')[0]);
                check=true;
              }
            } catch (e) {
              console.log(e);
            }
          }
          let intervalId = setInterval(
            function(){
              if(check == true){
                 clearInterval(intervalId);
               }
               deltwo();
            },
          1000);
          //initial block
          cn2t2_list=document.getElementsByClassName('_cn2t2');
          logoOrSearch=document.getElementsByClassName('GCNTC2-add_stori')[0].children[0];


          //new post block
          post_send= document.getElementById('new_post_send');
          post_input= document.getElementById('new_post');
          post_inp_desc= document.getElementById('new_post_desc');
          post_send.addEventListener('click', (e) =>{
            e.preventDefault();
            let desc = {
              post_desc:"",
              post_date:Date.now()
            };
            let uDate={};
            uDate=desc.post_date;
            desc.post_desc=post_inp_desc.value;
            desc=desc.post_desc;

            let formData = new FormData();
            let data = post_input.files[0];
            if(data!==undefined){
              formData.append("post_img", data);
              formData.append("desc", JSON.stringify(desc));
              formData.append("userdate", JSON.stringify(uDate));
              fetch('/post',{
                method:'POST',
                body:formData,
              }).then(res=>{
                console.log(res)
              });
            }else{
              console.log("post inp empty")
            }
          });
          story_send= document.getElementById('new_story_send');
          story_input= document.getElementById('new_story');
          story_inp_desc= document.getElementById('new_story_desc');
          story_send.addEventListener('click', (e) =>{
            e.preventDefault();
            let desc = {
              story_desc:"",//50 max 14
              story_date:Date.now()
            };

            desc.story_desc=story_inp_desc.value;

            let formData = new FormData();
            let data = story_input.files[0];
            if(data!==undefined){
              formData.append("story_img", data);
              formData.append("desc", JSON.stringify(desc));
              fetch('/story',{
                method:'POST',
                body:formData,
              }).then(res=>{
                console.log(res)
              });
            }else{
              console.log("story inp empty")
            }
          });


          dataLoader(0,cn2t2_list[0]);

          window.addEventListener('click', e=>{
            e.preventDefault;
            if(e.target.className.match(/ like/i)){
              let almostLink=e.target.closest("article")
              ,ready=true;
              function likePostDelete(likeSpan){
                ready=false;
                let method;
                if(likeSpan.matches(".sprite_heart_empty_24")){
                  method="POST";
                }else{
                  method="DELETE";
                }
                fetch("/like",{
                  method:method
                  ,body:JSON.stringify({post:almostLink.attributes.almostLinkId.nodeValue
                    ,author:almostLink.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].attributes.almostLinkId.nodeValue
                    ,time:Date.now()
                    })
                  ,headers:{'Content-Type':'application/json'}
                }).then(res=>{
                  ready=true;
                });
                if(method=="POST"){
                  likeSpan.classList.remove("sprite_heart_empty_24");
                  likeSpan.classList.add("sprite_heart_filled__24__red_5");
                }else{
                  likeSpan.classList.remove("sprite_heart_filled__24__red_5");
                  likeSpan.classList.add("sprite_heart_empty_24");
                }
              }
              if(e.target.matches("button")&&ready==true){
                likePostDelete(e.target.children[0]);
              }else if(e.target.matches("span")&&ready==true){
                likePostDelete(e.target);
              }else if(e.detail==2&&e.target.matches("img")&&ready==true){
                likePostDelete(e.target.closest(".NFPcntnt").nextSibling.children[0].children[0].children[0].children[0]);
              }
            }else if(e.target.className.match(/ comment/i)||e.target.className.match(/ viewAll/i)){
              if(cn2t2_list[cn2t2_list.length-1].innerHTML!=""){
                cn2t2_list[cn2t2_list.length-1].innerHTML="";
              }
              let container={
                post:e.target.closest(".almostLinkIdContainer").attributes.almostLinkId.nodeValue
              };
              fetch("/post",{
                method:"GET"
                ,headers:container
              }).then(res=>{
                return res.json();
              }).then(data=>{
                let singlePostDiv=document.createElement("div");
                makePost(data, singlePostDiv, activateContentSections(cn2t2_list.length-1, true));
              });
            }else if(e.target.closest("#main_menu_btn")&&mmbReady==true){
              mmbReady=false;
              mainMenuActivist(e.target.closest("#main_menu_btn"));
            }else if(e.target.className.match(/ addcomment/i)){
              let value=e.target.previousSibling.value
              ,almostLink=e.target.closest("article")
              ,commentContainer={
                post:almostLink.attributes.almostLinkId.nodeValue
                ,comment:{
                  created:Date.now().toString()
                  ,userId:whoami.userId
                  ,username:whoami.username
                  ,userComment:value
                }
                ,author:almostLink.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].attributes.almostLinkId.nodeValue
                ,time:Date.now()
              };
              e.target.previousSibling.value="";
              e.target.setAttribute("disabled","");
              fetch("/comment",{
                method:"POST"
                ,body:JSON.stringify(commentContainer)
                ,headers:{'Content-Type':'application/json'}
              }).then(res=>{
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
                            pad2DUD2LDDDHtA.setAttribute("title",whoami.username);/*need*/
                            pad2DUD2LDDDHtA.setAttribute("almostLinkId",whoami.userId);/*need*/
                            pad2DUD2LDDDHtA.innerHTML=whoami.username;/*need*/
                          pad2DUD2LDDDHthree.appendChild(pad2DUD2LDDDHtA);
                          let pad2DUD2LDDDSpan=document.createElement("span");
                            let pad2DUD2LDDDSSpan=document.createElement("span");
                            pad2DUD2LDDDSSpan.innerHTML=value;/*need*/
                          pad2DUD2LDDDSpan.appendChild(pad2DUD2LDDDSSpan);
                        pad2DUD2LDDDiv.appendChild(pad2DUD2LDDDHthree);
                        pad2DUD2LDDDiv.appendChild(pad2DUD2LDDDSpan);
                      pad2DUD2LDDiv.appendChild(pad2DUD2LDDDiv);
                      let pad2DUD2LDSpan=document.createElement("span");
                      pad2DUD2LDSpan.setAttribute("class","jdtwu");
                        let pad2DUD2LDSButton=document.createElement("button");
                        pad2DUD2LDSButton.setAttribute("class","_2ic5v");
                          let pad2DUD2LDSBSpan=document.createElement("span");
                          pad2DUD2LDSBSpan.setAttribute("class","glyphsSpriteGrey_Close u-__7 deleteComment");
                          pad2DUD2LDSBSpan.setAttribute("aria-label","Like");
                          pad2DUD2LDSBSpan.setAttribute("commentId",commentContainer.comment.created);/*need*/
                        pad2DUD2LDSButton.appendChild(pad2DUD2LDSBSpan);
                      pad2DUD2LDSpan.appendChild(pad2DUD2LDSButton);
                    pad2DUD2LDiv.appendChild(pad2DUD2LDDiv);
                    pad2DUD2LDiv.appendChild(pad2DUD2LDSpan);
                  pad2DUD2Li.appendChild(pad2DUD2LDiv);
                pad2DUDiv2.appendChild(pad2DUD2Li);
                e.target.parentNode.parentNode.parentNode.parentNode.children[2].lastChild.appendChild(pad2DUDiv2);
              });
            }else if(e.target.className.match(/ deleteComment/i)){
              let container={
                post:e.target.closest("article").attributes.almostLinkId.nodeValue
                ,commentId:e.target.attributes[2].nodeValue
              };
              fetch("/comment",{
                method:"DELETE"
                ,body:JSON.stringify(container)
                ,headers:{'Content-Type':'application/json'}
              });
              let div=e.target.closest(".NFPCbttn")
              ,ul=div.parentNode
              ,node
              ,nodes=ul.childNodes;
              for(let i=0,j=0, len=nodes.length; i<len; i++){
                node = nodes[i];
                if(node == div){
                  ul.removeChild(node);
                }
              }
            }else if(e.target.className.match(/ moreOptions/i)){
              inBetweenBuilder.menuOfThePost(e, body);
            }else if(e.target.className.match(/ deletePost/i)){
              let container={
                post:e.target.attributes.almostLinkId.nodeValue
              };
              fetch("/post",{
                method:"DELETE"
                ,body:JSON.stringify(container)
                ,headers:{'Content-Type':'application/json'}
              }).then(res=>{
                for(let i=0, len=deletePostContainer.parentNode.children.length; i<len; i++){
                  if(deletePostContainer.parentNode.children[i]==deletePostContainer.article){
                    deletePostContainer.parentNode.removeChild(deletePostContainer.parentNode.children[i])
                  }
                }
                body.removeChild(body.getElementsByClassName('anyMenu')[0]);
              });
            }else if(e.target.className.match(/ reportPost/i)||e.target.className.match(/ closeMenu/i)){
              body.removeChild(body.getElementsByClassName('anyMenu')[0]);
            }else if(e.target.closest(".viewProfile")){
              let almostLinkId=e.target.closest(".viewProfile").attributes.almostLinkId.nodeValue;
              if(almostLinkId==whoami.userId){
                mainMenuActivist(document.querySelectorAll("#main_menu_btn")[4])
              }else{
                dataLoader(4, activateContentSections(cn2t2_list.length-1, true), almostLinkId);
              }
            }else if(e.target.className.match(/ follow/)){
              let bttn=e.target, userAlmostLinkId={
                userId:bttn.attributes.almostLinkId.nodeValue
                ,time:Date.now()
              };
              fetch("/following",{
                method:"POST"
                ,body:JSON.stringify(userAlmostLinkId)
                ,headers:{'Content-Type':'application/json'}
              }).then(res=>{
                let section=bttn.closest(".zwlfE");
                if(section){
                  let num=section.childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML;
                  num=parseInt(num);
                  section.childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML=num+1;
                }
                whoami.user_following.push(userAlmostLinkId.userId);
                bttn.classList.remove("follow");
                bttn.classList.add("unfollow");
                bttn.innerHTML="Unfollow";
              });
            }else if(e.target.className.match(/ unfollow/)){
              let bttn=e.target, userAlmostLinkId={
                userId:bttn.attributes.almostLinkId.nodeValue
              };
              fetch("/following",{
                method:"DELETE"
                ,body:JSON.stringify(userAlmostLinkId)
                ,headers:{'Content-Type':'application/json'}
              }).then(res=>{
                let i=0, section=bttn.closest(".zwlfE");
                if(section){
                  let num=section.childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML;
                  num=parseInt(num);
                  section.childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML=num-1;
                }
                while(i<whoami.user_following.length){
                  if(whoami.user_following[i]==userAlmostLinkId.userId){
                    whoami.user_following.splice(i, 1);
                  }
                  i++;
                }
                bttn.classList.remove("unfollow");
                bttn.classList.add("follow");
                bttn.innerHTML="Follow";
              });
            }else if(e.target.closest("._0aCwM")){
              let target=e.target, closest=target.closest("._0aCwM");
              if(closest.childNodes[1].tagName=="DIV"){
                activateSearchArea(closest);
              }else if(target.className.match(/ coreSpriteSearchClear/i)){
                cSASmakeSearch();
              }
            }
          });
          window.addEventListener('keyup', e=>{
            if(e.target.className.match(/Ypffh/i)){
              if(e.target.value.match(/([^\s]+)/gm)!=null){
                if(e.target.nextSibling.attributes.disabled){
                  e.target.nextSibling.removeAttribute("disabled")
                }
              }else{
                if(!e.target.nextSibling.attributes.disabled){
                  e.target.nextSibling.setAttribute("disabled","")
                }
              }
            }else if(e.target.className.match(/XTCLo x3qfX/i)){
              if(e.target.value.match(/([^\s]+)/gm)!=null&&searchReady==true){
                if(e.keyCode!=8||e.which!=8){
                  let parNode=e.target.parentNode;
                  searchReady=false;
                  fetch('/search',{
                    method:'GET',
                    headers:{
                      "searchReq":e.target.value
                    }
                  }).then(res=>{
                    return res.json();
                  }).then(dataResp=>{
                    buildFoundProfiles(dataResp, parNode);
                    searchReady=true;
                  });
                }
              }
            }
          });
          function activateContentSections(nOB, returnSection){
            for(let i=0, length=cn2t2_list.length;i<length;i++){
              if(cn2t2_list[i].className.match(/activeContentSection/i)){
                cn2t2_list[i].classList.remove("activeContentSection");
                cn2t2_list[i].style.display="none";
                if(returnSection==true){
                  return cn2t2_list[nOB];
                }
                cn2t2_list[nOB].classList.add("activeContentSection");
                cn2t2_list[nOB].style.display="block";
                return;
              }
            }
          }
          function mainMenuActivist(bttn){
            let classListOn=["glyphsSpriteHome__filled__24__grey_9", "glyphsSpriteSearch__filled__24__grey_9","", "sprite_heart_filled__24__grey_9","glyphsSpriteUser__filled__24__grey_9"]
            ,classListOff=["glyphsSpriteHome__outline__24__grey_9", "glyphsSpriteSearch__outline__24__grey_9","", "sprite_heart_empty_24","NPEcp_logo"]
            ,bttnParent=bttn.parentNode, childArr=bttnParent.children, bPlength=bttnParent.children.length
            ,numOfBttn=(function(){for(let i=0, j=0; i<bPlength;i++){if(childArr[i].tagName=="BUTTON"){if(childArr[i]==bttn){return j;}j++;}}}());
            checkSearchAndSuggestion(numOfBttn);
            if(bttn.className.match(/active_main_bttn/i)){
              if(numOfBttn==2){
                mmbReady=true;
              }else{
                dataLoader(numOfBttn, activateContentSections(numOfBttn, true))
              }
            }else if(!bttn.className.match(/active_main_bttn/i)){
              if(cn2t2_list[numOfBttn].innerHTML==""){
                dataLoader(numOfBttn, activateContentSections(numOfBttn, true));
              }else if(cn2t2_list[numOfBttn].innerHTML!=""){
                mmbReady=true;
                activateContentSections(numOfBttn, false);
                if(numOfBttn==2){
                }
              }
              activateBttns(numOfBttn);
            }
            function activateBttns(nOB){
              for(let i=0, j=0; i<bPlength;i++){
                if(childArr[i].tagName=="BUTTON"){
                  if(childArr[i].className.match(/active_main_bttn/i)){
                    childArr[i].classList.remove("active_main_bttn");
                    if(j!=2){
                      childArr[i].children[0].children[0].classList.remove(classListOn[j]);
                      childArr[i].children[0].children[0].classList.add(classListOff[j]);
                    }
                  }
                  if(j==nOB){
                    childArr[i].classList.add("active_main_bttn");
                    if(j!=2){
                      childArr[i].children[0].children[0].classList.remove(classListOff[j]);
                      childArr[i].children[0].children[0].classList.add(classListOn[j]);
                    }
                  }
                  j++;
                }
              }
            }
          }
          function checkSearchAndSuggestion(nOB){
            if(nOB==1){
              if(logoOrSearch.children[0].classList.length==0){
                cSASmakeSearch();
              }
            }else{
              if(logoOrSearch.children[0].classList.length>0){
                cSASmakeLogo();
              }
            }
          }
          function cSASmakeSearch(){
            let sasmsDiv=builderTools.varEleClaSty("div", "LWmhU _0aCwM");
              let sasmsDInput=builderTools.varEleClaSty("input", "XTCLo x3qfX");
              sasmsDInput.setAttribute("type", "text");
              sasmsDInput.setAttribute("autocapitalize", "none");
              sasmsDInput.setAttribute("placeholder", "Search");
              sasmsDInput.setAttribute("value", "");
              let sasmsDIDiv=builderTools.varEleClaSty("div", "pbgfb Di7vw");
                let sasmsDIDDiv=builderTools.varEleClaSty("div", "eyXLr wUAXj");
                  let sasmsDIDDSpan1=builderTools.varEleClaSty("span", "_6RZXI coreSpriteSearchIcon");
                  let sasmsDIDDSpan2=builderTools.varEleClaSty("span", "TqC_a");
                  sasmsDIDDSpan2.innerHTML="Search";
                sasmsDIDDiv= builderTools.appendALotOfChilden(false, sasmsDIDDiv, sasmsDIDDSpan1, sasmsDIDDSpan2);
              sasmsDIDiv.appendChild(sasmsDIDDiv);
            sasmsDiv= builderTools.appendALotOfChilden(false, sasmsDiv, sasmsDInput, sasmsDIDiv);
            logoOrSearch.innerHTML="";
            logoOrSearch= builderTools.appendALotOfChilden(true, logoOrSearch, sasmsDiv);
          }
          function cSASmakeLogo(){
            let sasmlDiv=builderTools.varEleClaSty("div", "");
              let sasmlDA=builderTools.varEleClaSty("a", "");
                let sasmlDADiv=builderTools.varEleClaSty("div", "block_screen_font", "color: black; font-size: 23px;");
                sasmlDADiv.innerHTML="Fakegram";
            logoOrSearch.innerHTML="";
            logoOrSearch= builderTools.appendALotOfChilden(true, logoOrSearch, sasmlDiv, sasmlDA, sasmlDADiv);
          }
          function activateSearchArea(closest){
            let asaSpan= builderTools.varEleClaSty("span", "mlrQa coreSpriteSearchIcon");
            let asaDiv1=builderTools.varEleClaSty("div", "jLwSh");
            let asaDiv2= builderTools.varEleClaSty("div");
            let asaDiv3=builderTools.varEleClaSty("div", "aIYm8 coreSpriteSearchClear");
            closest=builderTools.appendALotOfChilden(false, closest, asaSpan, asaDiv1, asaDiv2, asaDiv3);
            closest.childNodes[1].remove();
          }
          function buildFoundProfiles(dataResp, parNode){
            let bfpDiv1=builderTools.varEleClaSty("div", "VR6_Q");
            let bfpDiv2=builderTools.varEleClaSty("div", "drKGC");
              let bfpD2Div=builderTools.varEleClaSty("div", "fuqBx");
              if(dataResp.hasData==true){
                for(let i=0, profLength=dataResp.profiles.length;i<profLength; i++){
                  let bfpD2DA=builderTools.varEleClaSty("a", "yCE8d viewProfile");
                  bfpD2DA.setAttribute("almostLinkId", dataResp.profiles[i].id)//need
                    let bfpD2DADiv=builderTools.varEleClaSty("div", "z556c");
                      let bfpD2DADDiv1=builderTools.varEleClaSty("div", "RR-M-  g9vPa");
                        let bfpD2DADDCanvas=builderTools.varEleClaSty("canvas", "CfWVH", "position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;");
                        bfpD2DADDCanvas.setAttribute("height","42");
                        bfpD2DADDCanvas.setAttribute("width","42");
                        let bfpD2DADDSpan=builderTools.varEleClaSty("span","_2dbep","width: 32px; height: 32px;");
                          let bfpD2DADDSImg=builderTools.varEleClaSty("img","_6q-tv","width: 32px; height: 32px;");
                          bfpD2DADDSImg.setAttribute("alt",dataResp.profiles[i].username+"'s profile picture");//need
                          bfpD2DADDSImg.setAttribute("src",dataResp.profiles[i].prof_pic);//need
                        bfpD2DADDSpan.appendChild(bfpD2DADDSImg);
                      bfpD2DADDiv1=builderTools.appendALotOfChilden(false, bfpD2DADDiv1, bfpD2DADDCanvas, bfpD2DADDSpan);
                      let bfpD2DADDiv2=builderTools.varEleClaSty("div", "_2_M76");
                        let bfpD2DADD2Div=builderTools.varEleClaSty("div", "uyeeR");
                          let bfpD2DADD2DSpan=builderTools.varEleClaSty("span", "Ap253");
                          bfpD2DADD2DSpan.innerHTML=dataResp.profiles[i].username;//need
                        bfpD2DADD2Div.appendChild(bfpD2DADD2DSpan);
                        let bfpD2DADD2Span=builderTools.varEleClaSty("span", "Fy4o8");
                        bfpD2DADD2Span.innerHTML=dataResp.profiles[i].email;//need
                      bfpD2DADDiv2=builderTools.appendALotOfChilden(false, bfpD2DADDiv2, bfpD2DADD2Div, bfpD2DADD2Span);
                    bfpD2DADiv=builderTools.appendALotOfChilden(false, bfpD2DADiv, bfpD2DADDiv1, bfpD2DADDiv2);
                  bfpD2DA.appendChild(bfpD2DADiv);
                  bfpD2Div.appendChild(bfpD2DA);
                }
              }else{
                let bfpD2DDiv=builderTools.varEleClaSty("div", "_1fBIg");
                bfpD2DDiv.innerHTML="No results found.";
                bfpD2Div.appendChild(bfpD2DDiv);
              }
            bfpDiv2.appendChild(bfpD2Div);
            if(parNode.childNodes[3].innerHTML!=""){
              parNode.childNodes[3].innerHTML="";
            }
            parNode.childNodes[3]= builderTools.appendALotOfChilden(false, parNode.childNodes[3], bfpDiv1, bfpDiv2);
          }
        });
    });

  function dataLoader(nOB, contentSection, almostLinkId){
    if(contentSection.innerHTML!=""){
      contentSection.innerHTML="";
    }
    if(nOB!=2){
      fetch('/data',{
        method:'GET',
        headers:{
          "need":nOB,
          "almostLinkId":almostLinkId
        }
      }).then((res)=>{
        return res.json()
      }).then((data)=>{
        switch (nOB){
          case 0://"feed"
              feedConstructor(data, contentSection);
            break;
          case 1://"suggestion"
              suggestionConstructor(data, contentSection);
            break;
          case 3://"activity"
              activityConstructor(data, contentSection);
            break;
          case 4://"profile"
              profileConstructor(data, contentSection);
            break;
          default:
            console.log("dataLoader err");
        }
        mmbReady=true;
      });
    }
  }
  function makePost(dataResp, where, cn2t2_list){
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
                  let padDDDDImg=builderTools.varEleClaSty("img", "NFPCBC3img like");//EBANIYROT
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
              pad2D2ATime.innerHTML= builderTools.timeSince(postCreatedDate)+" ago";/*need*/
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
  function feedConstructor (dataResp, contentSection){
    let fcDivPostsContainer=builderTools.varEleClaSty("div", "");
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
        let fcDivStoriesContainer=builderTools.varEleClaSty("div", "");
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
        let fcDDiv=builderTools.varEleClaSty("div", "_cn2t2_l1", "flex-direction: column; min-height:100vh;padding-bottom: 650px; padding-top: 0px;");
        fcDivPostsContainer.appendChild(fcDDiv);
        makePost(dataResp,fcDDiv);
      }else{
        let searchContainer=builderTools.varEleClaSty("div");
          let searchContainerA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch SearchSection");
          searchContainerA.innerHTML="Search";
        searchContainer.appendChild(searchContainerA)
        let postContainer=builderTools.varEleClaSty("div");
          let postContainerA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch NewPostStorySection");
          postContainerA.innerHTML="Post";
        postContainer.appendChild(postContainerA)
        if(dataResp.usersIds>1){
          let text="Your following and you haven't any posts yet. Make one "+postContainer.innerHTML+". And you can use "+searchContainer.innerHTML+" to find new user to follow.";
          inBetweenBuilder.makeEmptyMessage(text, fcDivPostsContainer, "110px");
        }else{
          let text="You haven't following and any posts yet. Use "+searchContainer.innerHTML+" to find new user to follow. And you can make one "+postContainer.innerHTML+".";
          inBetweenBuilder.makeEmptyMessage(text, fcDivPostsContainer, "110px");
        }
      }
    }else{
      let searchContainer=builderTools.varEleClaSty("div");
        let searchContainerA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch SearchSection");
        searchContainerA.innerHTML="Search";
      searchContainer.appendChild(searchContainerA)
      let storyContainer=builderTools.varEleClaSty("div");
        let storyContainerA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch NewPostStorySection");
        storyContainerA.innerHTML="Story";
      storyContainer.appendChild(storyContainerA)
      let postContainer=builderTools.varEleClaSty("div");
        let postContainerA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPHcTch2a3 cpdntch NewPostStorySection");
        postContainerA.innerHTML="Post";
      postContainer.appendChild(postContainerA)
      if(dataResp.usersIds>1){
        let text="Your following and you haven't any posts or stories yet. Make one "+postContainer.innerHTML+" or "+storyContainer.innerHTML+". And you can use "+searchContainer.innerHTML+" to find new user to follow.";
        inBetweenBuilder.makeEmptyMessage(text, fcDivPostsContainer, "110px");
      }else{
        let text="You haven't following and any posts or stories yet. Use "+searchContainer.innerHTML+" to find new user to follow. And you can make one "+postContainer.innerHTML+" or "+storyContainer.innerHTML+".";
        inBetweenBuilder.makeEmptyMessage(text, fcDivPostsContainer, "110px");
      }
    }
    contentSection.appendChild(fcDivPostsContainer);
    contentSection.classList.add("activeContentSection");
    contentSection.style.display="block";
  }
  function makeProfileStories(dataResp, where){
    let translateX=0;
    for(let i=0, length=dataResp.stories.length;i<length;i++){
      let mpsDiv;
      let mpsDivStyleContainer="transform: translateX("+translateX+"px);";
      mpsDiv = builderTools.varEleClaSty("div", "SC4_user viewStory", mpsDivStyleContainer);
      mpsDiv.setAttribute("almostLinkId",dataResp.stories[i]._id);//need
        let mpsDDiv = builderTools.varEleClaSty("div", "bsGjF");
          let mpsDDDiv = builderTools.varEleClaSty("div", "_3D7yK");
            let mpsDDDDiv = builderTools.varEleClaSty("div", "aoVrC D1yaK");
              let mpsDDDDCanvas = builderTools.varEleClaSty("canvas", " ", "position: absolute; top: -5px; left: -5px; width: 87px; height: 87px;");
              mpsDDDDCanvas.setAttribute("width","87");
              mpsDDDDCanvas.setAttribute("height","87");
              let mpsDDDDDiv = builderTools.varEleClaSty("div", "tUtVM", "width: 77px; height: 77px;");
                let mpsDDDDDImg = builderTools.varEleClaSty("img", "NCYx-");
                mpsDDDDDImg.setAttribute("src",dataResp.stories[i].story_url);//need
                mpsDDDDDImg.setAttribute("alt", " "+dataResp.username+"'s story picture")//need
              mpsDDDDDiv.appendChild(mpsDDDDDImg);
            mpsDDDDiv = builderTools.appendALotOfChilden(false, mpsDDDDiv, mpsDDDDCanvas, mpsDDDDDiv);
            let mpsDDDDiv2 = builderTools.varEleClaSty("div", "eXle2");
            if(dataResp.stories[i].story_desc.length<15){
              mpsDDDDiv2.innerHTML=dataResp.stories[i].story_desc;//need
            }else{
              mpsDDDDiv2.innerHTML=dataResp.stories[i].story_desc.substr(0, 14)+"...&nbsp;";//need
            }
          mpsDDDiv = builderTools.appendALotOfChilden(false, mpsDDDiv, mpsDDDDiv, mpsDDDDiv2);
        mpsDDiv.appendChild(mpsDDDiv);
      mpsDiv.appendChild(mpsDDiv);
      where.appendChild(mpsDiv);
      translateX+=106;
    }
    let whereStyleContainer="flex-direction: row; padding-left: 0px; padding-right: "+translateX+"px;";
    where.setAttribute("style",whereStyleContainer);
  }
  function profileConstructor(dataResp, contentSection){
    let pcProfileContainer = builderTools.varEleClaSty("div", " ");
      //headerPart
      let pcDiv= builderTools.varEleClaSty("div", "v9tJq VfzDr NFpost1", "margin-bottom:0px;margin-top:5px; padding-bottom:25px;");
        let pcDHeader= builderTools.varEleClaSty("header", "vtbgv _cn2t2_l3", "margin-bottom: 0px;");
        pcDHeader.setAttribute("almostLinkId", dataResp.id);
          //1part of pcDHeader
          let pcDHDiv= builderTools.varEleClaSty("div", "XjzKX");
            let pcDHDDiv= builderTools.varEleClaSty("div", "SC4ub_img_cnt1 NFPHCa2");
              let pcDHDDSpan= builderTools.varEleClaSty("span", "SC4ubic_icon_cnt1", "width: 170px; height: 170px;");
                let pcDHDDSImg= builderTools.varEleClaSty("img", "_6q-tv");
                let pcDHDDSImgAltContainer=dataResp.username;//need
                pcDHDDSImgAltContainer+="'s profile picture";
                pcDHDDSImg.setAttribute("alt", pcDHDDSImgAltContainer);
                pcDHDDSImg.setAttribute("src", dataResp.prof_pic);//need
          pcDHDiv = builderTools.appendALotOfChilden(true, pcDHDiv, pcDHDDiv, pcDHDDSpan, pcDHDDSImg);
          //2part of pcDHeader
          let pcDHSection= builderTools.varEleClaSty("section", "zwlfE");
            //1part of pcDHSection
            let pcDHSDiv= builderTools.varEleClaSty("div", "nZSzR");
              let pcDHSDHone= builderTools.varEleClaSty("h1", "_7UhW9 fKFbl yUEEX KV-D4 fDxYl", "width: 100%;");
              pcDHSDHone.innerHTML=dataResp.username;//need
            pcDHSDiv.appendChild(pcDHSDHone);
              let pcDHSDDiv= builderTools.varEleClaSty("div", "-pairs-icon-xxx1 NFPMcTc2 -pairs-icon-xxx3 -pairs-icon-xxx5 Igw0E  IwRSH eGOV_  _4EzTm ");
                let pcDHSDDSpan= builderTools.varEleClaSty("span", "BY3EC  bqE32");
                  let pcDHSDDSSpan= builderTools.varEleClaSty("span", "vBF20 _1OSdk");
                    let pcDHSDDSSBttn= builderTools.varEleClaSty("button", "_5f5mN -fzfL _6VtSN yZn4P");
                    pcDHSDDSSBttn.setAttribute("almostLinkId",dataResp.id);
                if(dataResp.id!=whoami.userId){
                  if(builderTools.doTheyMatch(dataResp.id, whoami.user_following)){
                    pcDHSDDSSBttn.classList.add("unfollow")
                    pcDHSDDSSBttn.innerHTML="Unfollow";
                  }else{
                    pcDHSDDSSBttn.classList.add("follow")
                    pcDHSDDSSBttn.innerHTML="Follow";
                  }
                }else{
                  pcDHSDDSSBttn.classList.add("editProfile")
                  pcDHSDDSSBttn.innerHTML="Edit Profile";
                }
            pcDHSDiv= builderTools.appendALotOfChilden(true, pcDHSDiv, pcDHSDDiv, pcDHSDDSpan, pcDHSDDSSpan, pcDHSDDSSBttn);
            let pcDHSDiv2= builderTools.varEleClaSty("div", "pofofo");
              let pcDHSD2Div= builderTools.varEleClaSty("div", "_pofofo");
                let pcDHSD2DSpan= builderTools.varEleClaSty("span", "-nal3");
                  let pcDHSD2DSSpan= builderTools.varEleClaSty("span", "g47SY");
                  pcDHSD2DSSpan.innerHTML=dataResp.posts.length;//need
                pcDHSD2DSpan.appendChild(pcDHSD2DSSpan);
                pcDHSD2DSpan.innerHTML+=" posts";
            pcDHSDiv2= builderTools.appendALotOfChilden(true, pcDHSDiv2, pcDHSD2Div, pcDHSD2DSpan);
              let pcDHSD2Div2=pcDHSD2Div.cloneNode(false);
                let pcDHSD2D2A= builderTools.varEleClaSty("a", "-nal3 viewFollowers");
                  let pcDHSD2D2ASpan=pcDHSD2DSSpan.cloneNode(false);
                  pcDHSD2D2ASpan.innerHTML=dataResp.followers.length;//need
                pcDHSD2D2A.appendChild(pcDHSD2D2ASpan);
                pcDHSD2D2A.innerHTML+=" followers";
              pcDHSD2Div2.appendChild(pcDHSD2D2A);
            pcDHSDiv2= builderTools.appendALotOfChilden(true, pcDHSDiv2, pcDHSD2Div2, pcDHSD2D2A);
              let pcDHSD2Div3=pcDHSD2Div2.cloneNode(false);
                let pcDHSD2D3A=pcDHSD2D2A.cloneNode(false);
                pcDHSD2D3A.classList.remove("viewFollowers");
                pcDHSD2D3A.classList.add("viewFollowing");
                  let pcDHSD2D3ASpan=pcDHSD2DSSpan.cloneNode(false);
                  pcDHSD2D3ASpan.innerHTML=dataResp.following.length;//need
                pcDHSD2D3A.appendChild(pcDHSD2D3ASpan);
                pcDHSD2D3A.innerHTML+=" following";
            pcDHSDiv2= builderTools.appendALotOfChilden(true, pcDHSDiv2, pcDHSD2Div3, pcDHSD2D3A);
            //3part of pcDHSection
            let pcDHSDiv3= builderTools.varEleClaSty("div", "-vDIg");
              let pcDHSD3Hone= builderTools.varEleClaSty("h1", "rhpdm", "padding-bottom:5px;");
              pcDHSD3Hone.innerHTML=dataResp.email;//need
              let pcDHSD3Br= builderTools.varEleClaSty("br");
              let pcDHSD3Span= builderTools.varEleClaSty("span", "width:100%");
              pcDHSD3Span.innerHTML=dataResp.description;//need //max100charecters
            pcDHSDiv3 = builderTools.appendALotOfChilden(false, pcDHSDiv3, pcDHSD3Hone, pcDHSD3Br, pcDHSD3Span);
          pcDHSection = builderTools.appendALotOfChilden(false, pcDHSection, pcDHSDiv, pcDHSDiv2, pcDHSDiv3);
        pcDHeader = builderTools.appendALotOfChilden(false, pcDHeader, pcDHDiv, pcDHSection);
      pcDiv.appendChild(pcDHeader);
    pcProfileContainer.appendChild(pcDiv);
    if(dataResp.hasData==true){
      if(dataResp.stories.length>0){
        let pcDiv2 = builderTools.varEleClaSty("div", "Stories_cnt1 NFpost1");
          let pcD2Div = builderTools.varEleClaSty("div", "SC_cnt", "height:130px");
            let pcD2DDiv = builderTools.varEleClaSty("div", "SC2_cnt1 SC2_cnt2 _cn2t2_l2", "width: auto;height:130px");
              let pcD2DDDiv= builderTools.varEleClaSty("div");
              makeProfileStories(dataResp, pcD2DDDiv);
        pcDiv2 = builderTools.appendALotOfChilden(true, pcDiv2, pcD2Div, pcD2DDiv, pcD2DDDiv);
        pcProfileContainer.appendChild(pcDiv2);
      }
      if(dataResp.posts.length>0){
        let pcDiv3 = builderTools.varEleClaSty("div", " VfzDr NFpost1", "padding:10px 10px 10px;margin:5px 0px 55px;max-width:650px;");
          let pcD3Div = builderTools.varEleClaSty("div", "_2z6nI");
            let pcD3DArticle = builderTools.varEleClaSty("article", "FyNDV");
              let pcD3DADiv = builderTools.varEleClaSty("div");
                let pcD3DADDiv = builderTools.varEleClaSty("div", "_cn2t2_l1", "flex-direction: column; padding-bottom: 0px; padding-top: 0px;");
                  makeProfileAndSuggestionPosts(dataResp, pcD3DADDiv);
        pcDiv3 = builderTools.appendALotOfChilden(true, pcDiv3, pcD3Div, pcD3DArticle, pcD3DADiv, pcD3DADDiv);
        pcProfileContainer.appendChild(pcDiv3);
      }else{
        let pcDiv3 = builderTools.varEleClaSty("div", " VfzDr NFpost1", "padding:10px 10px 10px;margin:5px 0px 55px;max-width:650px;");
          let pcD3Div = builderTools.varEleClaSty("div", "_2z6nI");
            let pcD3DArticle = builderTools.varEleClaSty("article", "FyNDV");
              makeEmptyMessage("Haven't any posts yet.", pcD3DArticle, "505px");
        pcDiv3 = builderTools.appendALotOfChilden(true, pcDiv3, pcD3Div, pcD3DArticle, );
        pcProfileContainer.appendChild(pcDiv3);
      }
  }else{
    let pcDiv3 = builderTools.varEleClaSty("div", " VfzDr NFpost1", "padding:10px 10px 10px;margin:5px 0px 55px;max-width:650px;");
      let pcD3Div = builderTools.varEleClaSty("div", "_2z6nI");
        let pcD3DArticle = builderTools.varEleClaSty("article", "FyNDV");
          makeEmptyMessage("Haven't any posts or stories yet.", pcD3DArticle, "370px");
    pcDiv3 = builderTools.appendALotOfChilden(true, pcDiv3, pcD3Div, pcD3DArticle, );
    pcProfileContainer.appendChild(pcDiv3);
  }
    contentSection.appendChild(pcProfileContainer);
    contentSection.classList.add("activeContentSection");
    contentSection.style.display="block";
  }
  function suggestionConstructor(dataResp, contentSection){
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
  function activityConstructor(dataResp, contentSection){
    let acActivityContainer= builderTools.varEleClaSty("div", " ");
    if(dataResp.length>0){
      for(let i=dataResp.length-1;i>=0;i--){
        let acDiv=builderTools.varEleClaSty("div", "PUHRj  H_sJK");
          let acDDiv1=builderTools.varEleClaSty("div", "cek9Q");
            let acDD1Div=builderTools.varEleClaSty("div", "H59PT");
              let acDD1DDiv=builderTools.varEleClaSty("div", "RR-M-");
                let acDD1DDCanvas=builderTools.varEleClaSty("canvas", "CfWVH", "position: absolute; top: -5px; left: -5px; width: 50px; height: 50px;");
                acDD1DDCanvas.setAttribute("height","50");
                acDD1DDCanvas.setAttribute("width","50");
                let acDD1DDA=builderTools.varEleClaSty("a", "_2dbep qNELH kIKUG", "width: 50px; height: 50px;");
                  let acDD1DDAImg=builderTools.varEleClaSty("img","_6q-tv");
                  acDD1DDAImg.setAttribute("alt",dataResp[i].user.username+"'s profile picture");//need
                  acDD1DDAImg.setAttribute("src",dataResp[i].user.prof_pic);//need
                acDD1DDA.appendChild(acDD1DDAImg);
              acDD1DDiv=builderTools.appendALotOfChilden(false, acDD1DDiv, acDD1DDCanvas, acDD1DDA);
        acDiv=builderTools.appendALotOfChilden(true, acDiv, acDDiv1, acDD1Div, acDD1DDiv);
          let acDDiv2=builderTools.varEleClaSty("div", "strandFOll");
            let acDD2Div1=builderTools.varEleClaSty("div", "PUHRj", "font-size:18px;line-height:22px");
              let acDD2DDiv=builderTools.varEleClaSty("div", "NFPCBld3 C4VMK");
                let acDD2DDHthree=builderTools.varEleClaSty("h3", "NFPCBld3h2 _6lAjh");
                  let acDD2DDHthA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPCBld3h2a3 FPmhX notranslate TlrDj  cpdntch viewProfile");
                if(dataResp[i].userId==whoami.userId){
                  acDD2DDHthA.classList.remove("viewProfile");
                  acDD2DDHthA.innerHTML="You";
                }else{
                  acDD2DDHthA.setAttribute("title",dataResp[i].user.username);//need
                  acDD2DDHthA.setAttribute("almostLinkId",dataResp[i].userId);//need
                  acDD2DDHthA.innerHTML=dataResp[i].user.username;//need
                }
                acDD2DDHthree.appendChild(acDD2DDHthA);
                let acDD2DDSpan=builderTools.varEleClaSty("span");
                if(dataResp[i].type==0){
                  acDD2DDSpan.innerHTML="liked your ";
                }else if(dataResp[i].type==1){
                  acDD2DDSpan.innerHTML="commented your ";
                }else if(dataResp[i].type==2){
                  acDD2DDSpan.innerHTML="started following you.";
                }
                if(dataResp[i].type==0||dataResp[i].type==1){
                  let acDD2DDSHthree=builderTools.varEleClaSty("h3", "NFPCBld3h2 _6lAjh");
                    let acDD2DDSHthA=builderTools.varEleClaSty("a", "NFPHcTch2a1 NFPHcTch2a2 NFPCBld3h2a3 FPmhX notranslate TlrDj  cpdntch almostLinkIdContainer viewAll");
                    acDD2DDSHthA.setAttribute("almostLinkId",dataResp[i].postId);//need
                    acDD2DDSHthA.innerHTML="post";//need
                  acDD2DDSpan=builderTools.appendALotOfChilden(true, acDD2DDSpan, acDD2DDSHthree, acDD2DDSHthA);
                  acDD2DDSpan.innerHTML+=".";
                }
                let acDD2DDTime=builderTools.varEleClaSty("time", "HsXaJ Nzb55");
                let acDD2DDTimeDate= new Date(dataResp[i].time);
                acDD2DDTime.setAttribute("datetime", acDD2DDTimeDate.toISOString());//need
                acDD2DDTime.setAttribute("title", acDD2DDTimeDate.toDateString().substr(4, 15));//need
                acDD2DDTime.innerHTML=builderTools.timeSince(acDD2DDTimeDate, true);//need
              acDD2DDiv=builderTools.appendALotOfChilden(false, acDD2DDiv, acDD2DDHthree, acDD2DDSpan, acDD2DDTime);
          acDDiv2=builderTools.appendALotOfChilden(true, acDDiv2, acDD2Div1, acDD2DDiv);
          if(dataResp[i].type==2){
            let acDD2Div2=builderTools.varEleClaSty("div", "PUHRj -pairs-icon-xxx1 NFPMcTc2 -pairs-icon-xxx3 -pairs-icon-xxx5 Igw0E  IwRSH eGOV_  _4EzTm ");
              let acDD2D2Span=builderTools.varEleClaSty("span", "BY3EC  bqE32");
                let acDD2D2SSpan=builderTools.varEleClaSty("span", "vBF20 _1OSdk");
                  let acDD2D2SSButton=builderTools.varEleClaSty("button", "_5f5mN -fzfL _6VtSN yZn4P ", "font-size:18px;line-height:22px; padding:3px 24px;");
                  acDD2D2SSButton.setAttribute("almostLinkId", dataResp[i].userId);
                if(builderTools.doTheyMatch(dataResp[i].userId, whoami.user_following)){
                  acDD2D2SSButton.classList.add("unfollow");
                  acDD2D2SSButton.innerHTML="Unfollow";
                }else{
                  acDD2D2SSButton.classList.add("follow");
                  acDD2D2SSButton.innerHTML="Follow";
                }
          acDDiv2=builderTools.appendALotOfChilden(true, acDDiv2, acDD2Div2, acDD2D2Span, acDD2D2SSpan, acDD2D2SSButton);
          }
        acDiv.appendChild(acDDiv2);
        acActivityContainer.appendChild(acDiv)
      }
    }else{
      console.log("empty")
    }
    contentSection.appendChild(acActivityContainer);
    contentSection.classList.add("activeContentSection");
    contentSection.style.display="block";
  }
});


console.log(document.scripts)
var script = document.createElement("script");
script.src = "js/moduletest.js";

document.body.appendChild(script);
