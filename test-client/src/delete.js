import React from 'react';
import { gql, useMutation } from '@apollo/client';

function Delete(props) {   
    let identifier;
    const deleteData = gql`
    mutation DeleteMusic($id:String!){
        removeMusic(
            id: $id
        ){
            id,
            info{
                ... on Artist{
                hometown,
                birth
                }
                ... on Song{
                album,
                release
                }
            },
            Artist,
            songTitle,
            actv,
            idx
            }
      }
    `;
    const [deleteTodo] = useMutation(deleteData);
    return (
            <form className="srchForm" onSubmit={e => {
                e.preventDefault();
                deleteTodo({ variables: {
                    id: identifier.value,
                }});
                console.log(props.refresh);
                props.reset();
            }}>
                <div>
                    <input ref={node => {identifier = node; }} type="text" name="identifier" id="srchId" placeholder="ID"/>
                </div>
                <button type="submit">Delete</button>
            </form>       
    ); 
}

export default Delete;