export const trimMatch = {
    trimStructureVersion : 1,
    structure : {
        trimVersion : true,
        matchId : true,
        metadata : {
            participants : true
        },
        info : {
            gameMode : true,
            gameType: true,
            participants : {
              assists: true,
              championId : true,
              deaths : true,
              kills: true,
              teamPosition: true,
              banId: true,
              puuid: true,
            },
            teams : {
              bans : true
            }
        }
    } 
}

export function trimObj( obj, trim, newObj ) {

  Object.keys( trim ).forEach( key => {
    if ( Object.keys( trim[key] ).length > 0 ) {
      newObj[key] = Array.isArray( obj[key] ) ? [] : {};
      if ( Array.isArray( obj[key] ) ) {
        obj[key].forEach( ( prop, index) => {
          newObj[key][index] = {};
          trimObj( obj[key][index], trim[key], newObj[key][index] );
        })
      }else{
        trimObj( obj[key], trim[key], newObj[key] )
      }
    }else if ( trim[key] ) {  
      newObj[key] = obj[key]; 
    }
  } )

  return newObj;
}