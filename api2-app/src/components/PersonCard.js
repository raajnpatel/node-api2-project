import React from 'react';

const PersonCard = ({person, detailsPerson}) => {
    return (
        <div>
            <p>ID: {person.id}</p>
            <h2>Name: {person.title}</h2>
            <br/>
            <button onClick={() => detailsPerson(person.id)}>Details</button>
            <br/><br/>
        </div>
    )
};

export default PersonCard;
