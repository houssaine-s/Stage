import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stock } from "../Actions/VenteAction";
import './flash.css';




export default function GetStock(){

    const stock = useSelector((state)=>state.VenteReducer.stock)
    const [groupement, setGroupement] = useState();
    const [site, setSite] = useState();
    const [marque, setMarque] = useState();
    const [modele, setModele] = useState();


    const [disponiblemoins, setDisponiblemoins] = useState(0);
    const [disponibleplus, setDisponibleplus] = useState(0);
    const [reservemoins, setReservemoins] = useState(0);
    const [reserveplus, setReserveplus] = useState(0);
    const [consignationmoins, setConsignationmoins] = useState(0);
    const [consignationplus, setConsignationplus] = useState(0);
    const [ckdmoins, setCkdmoins] = useState(0);
    const [ckdplus, setCkdplus] = useState(0);
    const [totalstmoins, setTotalstmoins] = useState(0);
    const [totalstplus, setTotalstplus] = useState(0);

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Stock());
    }, []);

    const groupementSet = new Set();
    const siteSet = new Set();
    const marqueSet = new Set();
    const modeleSet = new Set();

    stock.forEach((stk) => {
      groupementSet.add(stk.groupe);
      siteSet.add(stk.site);
      marqueSet.add(stk.marque);
      modeleSet.add(stk.modele);
    });

    const groupementList = Array.from(groupementSet);
    const siteList = Array.from(siteSet);
    const marqueList = Array.from(marqueSet);
    const modeleList = Array.from(modeleSet);

    function stockfilter(){
        const filter = stock.filter(function(stock){
          if (groupement && stock.groupe !== groupement) {
            return false;
          }
          if (site && stock.site !== site) {
              return false;
          }
          if (marque && stock.marque !== marque) {
              return false;
          }
          if (modele && stock.modele !== modele) {
            return false;
        }
          return stock.groupe === groupement || stock.site === site || stock.marque === marque || stock.modele === modele;
        })



        const dispo = filter.filter((disp) => {
            return disp.statut === 'Stock disponible';
        })
        setDisponiblemoins(dispo.reduce((total, curr) => Number(total) + Number(curr.stminus), 0));
        setDisponibleplus(dispo.reduce((total, curr) => Number(total) + Number(curr.stplus), 0));

        const reser = filter.filter((res) => {
            return res.statut === 'Stock reservé';
        })
        setReservemoins(reser.reduce((total, curr) => Number(total) + Number(curr.stminus), 0));
        setReserveplus(reser.reduce((total, curr) => Number(total) + Number(curr.stplus), 0));

        const cons = filter.filter((con) => {
            return con.statut === 'Commande stock';
        })
        setConsignationmoins(cons.reduce((total, curr) => Number(total) + Number(curr.stminus), 0));
        setConsignationplus(cons.reduce((total, curr) => Number(total) + Number(curr.stplus), 0));

        const ckd = filter.filter((ck) => {
            return ck.statut === 'Non Monté';
        })
        setCkdmoins(ckd.reduce((total, curr) => Number(total) + Number(curr.stminus), 0));
        setCkdplus(ckd.reduce((total, curr) => Number(total) + Number(curr.stplus), 0));        
        
    }
    function calculateTotals() {
        setTotalstmoins(Number(disponiblemoins) + Number(reservemoins) + Number(consignationmoins) + Number(ckdmoins));
        setTotalstplus(Number(disponibleplus) + Number(reserveplus) + Number(consignationplus) + Number(ckdplus));
    }
    useEffect(() => {
        stockfilter();
        calculateTotals();
      }, [disponiblemoins, reservemoins, consignationmoins, ckdmoins, disponibleplus, reserveplus, consignationplus, ckdplus]);
    return(   
        <>
          <div className="title">
            <h1>Stock Matériel</h1>
          </div>
          <div className="under">
            <h5> Choissisez vos filtres</h5>
          </div>
          <div className="container">
            <div className="sales-filter">
              <div className="filter-section">
                <div className="filter-field">
                  <label className="blue-text">Groupement</label>
                  <select onChange={(e)=>{setGroupement(e.target.value)}}>
                    <option value=''>Tout</option>
                    {
                      groupementList.map((grp=>(
                        <option key={grp} value={grp}>{grp}</option>
                      )))
                    }
                  </select>
                </div>
                <div className="filter-field">
                  <label className="blue-text">Site</label>
                  <select onChange={(e)=>{setSite(e.target.value)}}>
                    <option value=''>Tout</option>
                    {
                      siteList.map((sit=>(
                        <option key={sit} value={sit}>{sit}</option>
                      )))
                    }
                  </select>
                </div>
                <div className="filter-field">
                  <label className="blue-text">Marque</label>
                  <select onChange={(e)=>{setMarque(e.target.value)}}>
                    <option value=''>Toutes</option>
                    {
                      marqueList.map((mrq=>(
                        <option key={mrq} value={mrq}>{mrq}</option>
                      )))
                    }
                  </select>
                </div>
                <div className="filter-field">
                  <label className="blue-text">Modèle</label>
                  <select onChange={(e)=>{setModele(e.target.value)}}>
                    <option value=''>Toutes</option>
                    {
                      modeleList.map((mdl=>(
                        <option key={mdl} value={mdl}>{mdl}</option>
                      )))
                    }
                  </select>
                </div>
                <div className="filter-field">
                  <button onClick={stockfilter}>Valider</button>
                </div>
              </div>
              <div className="sales-summary">
                <div className="rapport">
                  <h5> Stock Matériel</h5>
                </div>
                <table className="summary-table">
                    <thead>
                      <tr>
                        <th className="blue-text">Stock Matériel</th>
                        <th className="blue-text">Moins 30 j</th>
                        <th className="blue-text">Plus 30 j</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Disponible</td><td>{disponiblemoins}</td><td>{disponibleplus}</td>
                      </tr>
                      <tr>
                        <td>Réserve</td><td>{reservemoins}</td><td>{reserveplus}</td>
                      </tr>
                      <tr>
                        <td>Consignation</td><td>{consignationmoins}</td><td>{consignationplus}</td>
                      </tr>
                      <tr>
                        <td>CKD</td><td>{ckdmoins}</td><td>{ckdplus}</td>
                      </tr>
                      <tr>
                        <td>Total Stock</td><td>{totalstmoins}</td>
                        <td>{totalstplus}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </>

    )


}