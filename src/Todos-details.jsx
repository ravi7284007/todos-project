import React from 'react';
import { useParams } from 'react-router-dom';

const TodosDetails = () => {
   const params =  useParams();
   const data = JSON.parse(localStorage.getItem('Todos'))
    const filteredData = data.filter(todo => todo.id === params.id)
   
    return (
        <>
        {filteredData.length > 0 ?
        <div className='p-5 border-5 text-left mt-6 w-3xl'>
            <h2>{filteredData[0].todo}</h2>
            <p>{filteredData[0].description}</p>
            <p>{filteredData[0].date}</p>
        </div>
        :
        <p>No Todos Available...</p>
        }
        </>
    );
}

export default TodosDetails;
