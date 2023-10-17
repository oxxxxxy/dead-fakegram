fetch(`/check`)
.then(
  (res)=>{
    if(res.url.match(/[^.*\/]+$/)=='authentication'){
      fetch('/parts',{
        method:'GET',
        headers:{
          'page_part':'authpart.html'
        }
      }).then(
        (res)=>{
          return res.text().then(
            function(text){
              document.getElementsByTagName('body')[0].innerHTML+=text;
              fetch('/parts',{
                method:'GET',
                headers:{
                  'page_part':'js/part_auth.js'
                }
              }).then(
                (res)=>{
                  return res.text().then(
                    function(text){
                      eval(text);
                    });
                });
            });
        });
    }else{
      window.location = res.url;
    }
  });
