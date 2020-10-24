import React from 'react'
import { ImStarFull } from 'react-icons/im'

function CommentsItem(props) {
    
   function showStars(x){
       let arr = []
       let i = 0
       while (i < x){
           arr.push(<ImStarFull />)
           i++
       }
       return arr;
   }
    return (
        <div> 
        <h4> {props.comment} </h4><span> {showStars(props.rate)}</span>
        </div>
    )
}

export default CommentsItem
