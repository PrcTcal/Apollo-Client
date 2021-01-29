import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { readData } from './main';

function Create(props) {       
    let Artist, songTitle, infoType, infoA, infoB, actv, idx;
    const createData = gql`
    mutation CreateMusic($Artist:String!, $songTitle:String, $info:infoInput, $actv:Boolean, $idx: Int){
        createMusic(
            Artist: $Artist,
            songTitle: $songTitle,
            info: $info,
            actv: $actv,
            idx: $idx
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
    const [addTodo, {data}] = useMutation(createData,{
        refetchQueries: [{
            query: readData,
            variables: {
                settings: {
                    stype: "idx",
                    dir: "ASC",
                    and: false
                }
            },
        }],
    });
    if(data != null) props.reset();
    return (
            <form className="srchForm" onSubmit={e => {
                e.preventDefault();
                addTodo({ variables: {
                    Artist: Artist.value,
                    songTitle: songTitle.value,
                    info: infoType.value === 'album' ? { album: infoA.value, release: infoB.value } : { hometown: infoA.value, birth: infoB.value},
                    actv: actv.value === "true" ? true : false,
                    idx: Number(idx.value)
                }
            });
            }}>
                <div>
                    <input ref={node => {Artist = node; }} type="text" name="Artist"   id="srchArtist" placeholder="Artist"/>
                    <input ref={node => {songTitle = node; }} type="text" name="songTitle"  id="srchSongTitle" placeholder="songTitle"/>
                </div>
                <div className="info">
                    <select ref={node => {infoType = node; }} name="infoType" id="srchInfo">
                        <option value="">info type</option>
                        <option value="album">곡 정보</option>
                        <option value="hometown">가수 정보</option>
                    </select>
                    <input ref={node => {infoA = node; }} type="text" name="infoA" id="infoA" placeholder="album / hometown"/>
                    <input ref={node => {infoB = node; }} type="text" name="infoB" id="infoB" placeholder="release / birth"/>
                 </div>
                <div>
                    <select ref={node => {actv = node; }} name="actv" id="srchActv">
                        <option value="">actv</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    <input ref={node => {idx = node; }} type="text" name="idx"  id="srchIdx" placeholder="idx"/>
                </div>
                <button type="submit">Create</button>
            </form>       
    ); 
}

export default Create;