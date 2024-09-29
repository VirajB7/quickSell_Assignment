import React from 'react'
import './Card.css'
import DoneIcon from '../../icons/Done.svg';
import ToDo from '../../icons/To-do.svg';
import filledCircle from '../../icons/FilledCircle.png';
import SvgMapping from '../svgMapping/svgMapping';



  

const Card=({ticket,grouping,getUserName,getPriority })=> {
  return (
    <div id="main">
        <div className="card">
            <div className="card-top">
                <div >
                <p id="ticketID">{ticket.id}</p>
                </div>
                <div id="person-photo"> 
                    {/* TODO: User Image Daalni Hai */}
                  
                    {grouping !== "user" &&  <img src={SvgMapping[getUserName(ticket.userId)]} alt="User"/>}
                     </div>
            
            </div>
            <div className="card-middle">
               <div className="ticket-status">
                {/* TODO: Image daalni hai */}
                
                {grouping !== "status" && <img src={SvgMapping[ticket.status]} alt="Status"/>}</div> 
                <div className="middle-text"><h5>{ticket.title}</h5></div>
            </div>
            <div className="card-bottom">
                <div className="bottom1">
                    {/* TODO: Image daalni hai */}
                    {grouping !== "priority" && <img src={SvgMapping[getPriority(ticket.priority)]} alt="Priority"/>}   
                </div>
                <div className="bottom2">
                    {/* Ye wo waali image h jo feature Request k baaju me circle diya h */}
                    <img src={filledCircle} alt="filledCircle"/>
                    <p id="bottom2-p">{ticket.tag.join(", ")}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card