import React from 'react'

function CommentsItem(props) {
    return (
        <div> 
        <h4> {props.comment} </h4><span> {props.rate} stars</span>
        </div>
    )
}

export default CommentsItem
