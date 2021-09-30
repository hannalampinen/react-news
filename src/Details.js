import React from 'react'

export default function Details(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <img src={props.image}></img>
            <p>{props.description}</p>
            <a href='#' onClick={props.close}>Back to news</a>
        </div>
    )
}

