import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonCard from "./PersonCard";

const PersonList = () => {
    const [personList, setPersonList] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:4444/api/posts`)
            .then(res => {
                console.log(res.data);
                setPersonList(res.data);
            })
            .catch(error => console.log(error.response));
    }, []);


  const detailsPerson = id => {
    axios
      .get(`http://localhost:4444/api/posts/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
    // axios
    //   .put(`http://localhost:4444/api/users/${id}`)
    //   .then(res => console.log(res) || setPersonList(res.data))
    //   .catch(err => console.log(err.response));
  };

    return(
        <div>
            <h1>The List</h1>
            {personList.map(person => {
                return(
                    <div>
                        <PersonCard
                            key={person.id}
                            person={person}
                            detailsPerson={detailsPerson}
                        />
                    </div>
                )
            })
            }
        </div>
    )
};

export default PersonList;
