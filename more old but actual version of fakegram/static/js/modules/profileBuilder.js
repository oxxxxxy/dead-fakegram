export var ProfileB = (function() {
  function ProfileB() {
    this.__proto__=ProfileB.prototype;
  };

  ProfileB.prototype.console=(function (){
    return function(){
      console.log("export var ProfileB", arguments);
    }
  }());

  ProfileB.prototype.profileConstructor=(function (){
    return function (dataResp, contentSection){
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
  }());
  ProfileB.prototype.makeProfileStories=(function (){
    return function (dataResp, where){
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
  }());
  /*ProfileB.prototype.=(function (){
    return function(){

    }
  }());
  ProfileB.prototype.=(function (){
    return function(){

    }
  }());
  ProfileB.prototype.=(function (){
    return function(){

    }
  }());
  ProfileB.prototype.=(function (){
    return function(){

    }
  }());*/


  return {
   ProfileB: ProfileB
  };
}())
