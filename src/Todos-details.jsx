import React from 'react';
import { useParams } from 'react-router-dom';

const TodosDetails = () => {
   const params =  useParams();
   console.log(params);
   
    return (
        <div>
            Hello Details
        </div>
    );
}

export default TodosDetails;
