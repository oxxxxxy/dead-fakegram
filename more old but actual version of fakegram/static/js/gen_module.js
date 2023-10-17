var SomePart = (function() {
  function SomePart() {
    console.log('pm_fepo SomePart')

  };
  SomePart.prototype.example=function(){
    console.log("example");
  };
  return {
   SomePart: SomePart
  };
}());
