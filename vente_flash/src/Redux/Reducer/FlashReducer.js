
const initState={
       vente:[
       {
        id: 1,
        groupement: 'Group A',
        model: 'Model 1',
        marque: 'Marque 1',
        societe: 'Societe 1',
        date: '2023-04-05',
        volume: 10,
        marge: 5000,
        ca: 100000
      },
      {
        id: 2,
        groupement: 'Group B',
        model: 'Model 2',
        marque: 'Marque 1',
        societe: 'Societe 1',
        date: '2023-04-05',
        volume: 13,
        marge: 4600,
        ca: 850000
      },
      {
        id: 3,
        groupement: 'Group A',
        model: 'Model 1',
        marque: 'Marque 2',
        societe: 'Societe 1',
        date: '2023-04-05',
        volume: 4,
        marge: 9000,
        ca: 290000
      },
      
    ],
    data: []
    ,
    jrn: []
    ,
    stock: []
    ,
}

const FlashReducer = (state=initState, action) => {

    switch(action.type){
      
      case 'FLASHFILTER':
        const filteredVente = state.vente.filter(function(flsh){
          return flsh.groupement === action.payload.groupe && flsh.marque === action.payload.marque
                && flsh.societe === action.payload.societe && flsh.date === action.payload.date
        })
        return { ...state, vente: filteredVente };

      case 'VENTEFLASH':
        return { ...state, data:action.payload }
      
      case 'VENTEJOURNALIERE':
        return { ...state, jrn:action.payload }
      
      case 'STOCK':
        return { ...state, stock:action.payload }
      
      default :
          return state
    }    
}


export default FlashReducer;