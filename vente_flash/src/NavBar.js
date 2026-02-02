// import { Link } from "react-router-dom";
// import './NavBar.css';

// export default function NavBar(){

//     return(
//         <>
//             <div className="sidebar">
//                 <div>.</div>
//                 <nav>
//                     <ul>
//                     <li>
//                         <Link to='/GetFlash'>Vente Flash</Link>
//                     </li>
//                     <li>
//                         <Link to='/VenteJrnl'>Vente Journalieres</Link>
//                     </li>
//                     <li>
//                         <Link to='/GetStock'>Stock</Link>
//                     </li>
//                     </ul>
//                 </nav>
//             </div>

//         </>
//     )
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from './Logo_Auto_Hall.jpg';
export default function NavBar() {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  }

  return (
    <div className="sidebar">
        <img src={Image} alt="img"></img>
      <nav>
        <ul>
            <Link to='/GetFlash'>
                <li className={selected === 0 ? 'selected' : ''} onClick={() => handleClick(0)}>
                    Vente Flash
                </li>
          </Link>
          <Link to='/VenteJrnl'>
                <li className={selected === 1 ? 'selected' : ''} onClick={() => handleClick(1)}>
                    Vente Journalières
                </li>
          </Link>
          <Link to='/GetStock'>
                <li className={selected === 2 ? 'selected' : ''} onClick={() => handleClick(2)}>
                    Stock Matériel
                </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
