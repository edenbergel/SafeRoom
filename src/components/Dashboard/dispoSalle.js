const dispoSalle = (placesAvailable, placesTaken)=>{
  const demi = placesAvailable/2;
  if(placesTaken < demi){
    return 'green';
  };
  if(demi <= placesTaken &&  placesTaken < (demi*2)) {
    return 'orange';
  };
  if(placesTaken == placesAvailable){
    return 'red';
  };
};

export {dispoSalle};