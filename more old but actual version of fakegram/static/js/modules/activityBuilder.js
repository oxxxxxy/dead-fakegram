export var ActivityB = (function() {
  function ActivityB() {
    this.__proto__=ActivityB.prototype;
  };

  ActivityB.prototype.console=(function (){
    return function(){
      console.log("export var ActivityB", arguments);
    }
  }());

  ActivityB.prototype.activityConstructor=(function (){
    return function (dataResp, contentSection){
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
  }());
  /*ActivityB.prototype.=(function (){
    return function(){

    }
  }());
  ActivityB.prototype.=(function (){
    return function(){

    }
  }());
  ActivityB.prototype.=(function (){
    return function(){

    }
  }());*/
  return {
   ActivityB: ActivityB
  };
}())
