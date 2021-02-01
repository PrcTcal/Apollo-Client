import React, {useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { readData } from './main';

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
    const [deleteTodo, {data}] = useMutation(deleteData,{
        refetchQueries: [{
            query: readData,
            variables: {
                Artist: props.states.Artist !== "" ? props.states.Artist : null,
                songTitle: props.states.songTitle !== "" ? props.states.songTitle : null,
                info: props.states.srchInfo !== "" ? props.states.srchInfo === 'album' ? { album: props.states.infoA, release: props.states.infoB } : { hometown: props.states.infoA, birth: props.states.infoB} : null,
                actv: props.states.actv !== "" ? props.states.actv === "true" ? true : false : null,
                idx: props.states.idx !== "" ? Number(props.states.idx) : null,
                settings: {
                    stype: props.states.stype !== "" ? props.states.stype : null,
                    dir: props.states.dir !== "" ? props.states.dir : null,
                    and: props.states.and !== "" ? props.states.and === "true" ? true : false : null
                }
            },
        }],
    });
    useEffect(() => {
        if(data != null) props.reset();
    });
    return (
            <form className="srchForm" onSubmit={e => {
                e.preventDefault();
                if(identifier.value === ''){
                    alert('ID를 입력해주세요.');
                } else {
                    deleteTodo({ variables: {
                        id: identifier.value,
                    }});
                } 
            }}>
                <div>
                    <input ref={node => {identifier = node; }} type="text" name="identifier" id="srchId" placeholder="ID"/>
                </div>
                <button type="submit">Delete</button>
            </form>       
    ); 
}

export default Delete;