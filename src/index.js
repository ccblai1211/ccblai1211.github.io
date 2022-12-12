import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// const testList = ["ps2", "gcq", "npm"];

// function DropDownItem(){
//     return(<li className='dropdownItem'>"test"</li>)
// }
// function listItems(){
//     var listitems = testList.map((d)=> <li className='dropdownItem' key = {d}>{d}</li>);
//     return (listitems);
// }

// class DropDown extends React.Component{
//     render(){
//         return(

//         <div className ='dropdown'>
//             <button>menu</button>
//             <ul>
//                 {listItems()}
//             </ul>
//             <button>menu</button>
//         </div>);
//     }
// }



// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<DropDown />);