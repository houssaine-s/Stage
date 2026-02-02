import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VenteFlash } from "../Actions/VenteAction";
import './flash.css';




export default function GetFlash(){

    const getflash = useSelector((state)=>state.VenteReducer.data)
    const [groupement, setGroupement] = useState();
    const [site, setSite] = useState();
    const [marque, setMarque] = useState();
    const [volume, setVolume] = useState('0.00');
    const [ca, setCa] = useState('0.00');
    const [marge, setMarge] = useState('0.00');

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(VenteFlash());
    }, []);

    const groupementSet = new Set();
    const siteSet = new Set();
    const marqueSet = new Set();

    getflash.forEach((flsh) => {
      groupementSet.add(flsh.groupe);
      siteSet.add(flsh.site);
      marqueSet.add(flsh.marque);
    });

    const groupementList = Array.from(groupementSet);
    const siteList = Array.from(siteSet);
    const marqueList = Array.from(marqueSet);

    function datafilter(){
        const filter = getflash.filter(function(flash){
          const now = Date.now();
          const flashTime = new Date(flash.date_time).getTime();
          const diffInMinutes = Math.round((now - flashTime) / (1000 * 60));

          if (diffInMinutes <= 20) {
            console.log('Flash is less than 20 minutes old');
          } else {
            console.log('Flash is more than 20 minutes old');
          }
          if (groupement && flash.groupe !== groupement) {
            return false;
          }
          if (site && flash.site !== site) {
              return false;
          }
          if (marque && flash.marque !== marque) {
              return false;
          }
            return flash.groupe === groupement || flash.site === site || flash.marque === marque

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
    }
    return(   
        <>
          <div className="title">
            <h1>Vente Flash</h1>
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
                  <button onClick={datafilter}>Actualiser</button>
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
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </>

    )


}