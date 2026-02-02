import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VenteJrn } from "../Actions/VenteAction";
import './flash.css';
import moment from 'moment';




export default function VenteJrnl(){

    const ventejrn = useSelector((state)=>state.VenteReducer.jrn)
    const [date, setDate] = useState();
    const [groupement, setGroupement] = useState();
    const [site, setSite] = useState();
    const [marque, setMarque] = useState();
    const [modele, setModele] = useState();
    const [volume, setVolume] = useState('0.00');
    const [ca, setCa] = useState('0.00');
    const [marge, setMarge] = useState('0.00');
    const [prixmyn, setPrixmyn] = useState('0.00');
    const [tauxmrg, setTauxmrg] = useState('0.00');

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(VenteJrn());
    }, []);

    const groupementSet = new Set();
    const siteSet = new Set();
    const marqueSet = new Set();
    const modeleSet = new Set();

    ventejrn.forEach((jrn) => {
      groupementSet.add(jrn.groupe);
      siteSet.add(jrn.site);
      marqueSet.add(jrn.marque);
      modeleSet.add(jrn.modele);
    });

    const groupementList = Array.from(groupementSet);
    const siteList = Array.from(siteSet);
    const marqueList = Array.from(marqueSet);
    const modeleList = Array.from(modeleSet);

    function datafilter(){
        const filter = ventejrn.filter(function(ventejrn){
        const datt = moment(ventejrn.date_time).format('YYYY-MM-DD')
        if (groupement && ventejrn.groupe !== groupement) {
          return false;
        }
        if (site && ventejrn.site !== site) {
            return false;
        }
        if (marque && ventejrn.marque !== marque) {
            return false;
        }
        if (modele && ventejrn.modele !== modele) {
            return false;
        }
        if (date && datt !== date) {
            return false;
        }
        return ventejrn.groupe === groupement || ventejrn.site === site || ventejrn.modele === modele
                  || ventejrn.marque === marque || datt === date;

        })
               
        const vol = filter.reduce((acc, curr) => {
          return acc + parseFloat(curr.qt);
        }, 0).toFixed(2);
        setVolume(vol);
        
        const ca = filter.reduce((acc, curr) => {
          return acc + parseFloat(curr.ca);
        }, 0).toFixed(2);
        setCa(ca);
    
        const marge = filter.reduce((acc, curr) => {
            return acc + parseFloat(curr.marge);
        }, 0).toFixed(2);
        setMarge(marge);

        if (vol==0){
          setVolume('0.00');
        }

        if (ca==0){
            setPrixmyn('0.00');
        } else {
            let prix = (ca/vol).toFixed(2)
            setPrixmyn(prix);
        }

        if (marge==0){
            setTauxmrg('0.00');
        } else {
            let taux = (marge/ca).toFixed(2)
            setTauxmrg(taux);
        }

    }
    return(   
        <>
          <div className="title">
            <h1 >Vente Journalières</h1>
          </div>
          <div className="under">
            <h5> Choissisez vos filtres</h5>
          </div>
          <div className="container">
            <div className="sales-filter">
              <div className="filter-section">
                <div className="filter-field">
                  <label className="blue-text">Journée</label>
                  <input type="date" onChange={e=>{setDate(e.target.value)}}/>
                </div>
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
                  <button onClick={datafilter}>Valider</button>
                </div>
              </div>
              <div className="sales-summary">
                <div className="rapport">
                  <h5> Rapport des ventes</h5>
                </div>
                <table className="summary-table">
                    <thead>
                      <tr>
                        <th className="blue-text">Vente</th>
                        <th className="blue-text">Journalières</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Volume</td><td>{volume}</td>
                      </tr>
                      <tr>
                        <td>CA (KDH)</td><td>{ca}</td>
                      </tr>
                      <tr>
                        <td>Marge (KDH)</td><td>{marge}</td>
                      </tr>
                      <tr>
                        <td>Prix moyen (KDH)</td><td>{prixmyn}</td>
                      </tr>
                      <tr>
                        <td>Taux de marge</td><td>{tauxmrg}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>  
          
        </>

    )


}