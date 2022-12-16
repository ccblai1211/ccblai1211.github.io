import React, { useState, useEffect ,useRef} from "react";
import "./App.css";

const testList = ["ps2", "gcq", "npm"];

function DropDown({itemList, cate, precedence}){
    const [selectedItem, setSelectedItem] = useState(itemList[0]);
    const [expanded, setExpanded] = useState(false);
    
    var menuRef = useRef()

    useEffect(()=>{
        var handler = (e)=>{
            if (!menuRef.current.contains(e.target)){
                setExpanded(false);
            }
        }
        document.addEventListener("mousedown", handler);

        return ()=>{document.removeEventListener("mousedown", handler)}
    });
    return (
        <div className = "question" style={{'zIndex': precedence}}>
            <p>{cate}</p>
            <div className="dropdown" ref = {menuRef}>
            <button className="dropdownButton"
                    onClick={()=>{setExpanded(!expanded)}}
                    style = {{"borderBottomColor": expanded?"transparent":"black"}} >{selectedItem}</button>
                
            <ListItems expanded = {expanded} setSelectedItem = {setSelectedItem} setExpanded = {setExpanded} menuRef = {menuRef}/>
                
            </div>
        </div>
    );
}

// class DropDown extends React.Component {
//     constructor(props) {
//       super(props);
//       this.precedence = props.precedence;
//       this.category = props.cate;
//       this.state = {
//         selectedItems: props.itemList[0],
//         expanded: false,
//       };
//     }
    
//     render() {
//       return (
        
//         <div className = "question" style={{'zIndex':this.precedence}}>
//           <p>{this.category}</p>
//           <div className="dropdown">
//             <button className="dropdownButton"
//                     onClick={()=>{this.setState({expanded:!this.state.expanded});}}
//                     style = {{"borderBottom": this.state.expanded?"none":"2px solid"}} >{this.state.selectedItems}</button>
             
//             <ListItems/>
              
//           </div>
//         </div>
//       );
//     }
// }
const ListItems = ({expanded, setSelectedItem, setExpanded, menuRef}) =>{
    
    return (<div className="dropdownMenu" style={{"visibility":expanded?"visible":"hidden" }}
    >
            {testList.map((d) => <button key = {d} value = {d}className="dropdownItem" onClick={(e) =>{setSelectedItem(e.target.value);
            setExpanded(false);}}>{d}</button>)}
        </div>);
}

export default DropDown;

// style={{"visibility":this.state.expanded?"visible":"hidden" }}