import axios from "axios"


export const FlashFilter = (flash) => {

    return(
        {
            type:'FLASHFILTER',
            payload:flash
        }
    )
}

export const VenteFlash = () => {

    return function (dispatch) {
        axios.get('http://localhost:4000/api/flash')
        .then((responce)=>{
            dispatch(
                {
                    type:'VENTEFLASH',
                    payload:responce.data
                }
            )
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
export const VenteJrn = () => {

    return function (dispatch) {
        axios.get('http://localhost:3500/api/sales-data')
        .then((responce)=>{
            dispatch(
                {
                    type:'VENTEJOURNALIERE',
                    payload:responce.data
                }
            )
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
export const Stock = () => {

    return function (dispatch) {
        axios.get('http://localhost:5000/api/stock')
        .then((responce)=>{
            dispatch(
                {
                    type:'STOCK',
                    payload:responce.data
                }
            )
        })
        .catch((error) => {
            console.log(error);
        });
    }
}