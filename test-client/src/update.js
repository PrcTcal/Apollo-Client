import React from 'react';
import { gql, useMutation } from '@apollo/client';

function Update(props) {   
    let identifier, Artist, songTitle, infoType, infoA, infoB, actv, idx;
    const updateData = gql`
    mutation UpdateMusic($id:String!, $Artist:String, $songTitle:String, $info:infoInput, $actv:Boolean, $idx: Int){
        updateMusic(
            id: $id,
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
    const [updateTodo] = useMutation(updateData);
    return (
            <form className="srchForm" onSubmit={e => {
                e.preventDefault();
                updateTodo({ variables: {
                    id: identifier.value,
                    Artist: Artist.value !== "" ? Artist.value : null,
                    songTitle: songTitle.value !== "" ? songTitle.value : null,
                    info: infoType.value !== "" ? infoType.value === 'album' ? { album: infoA.value, release: infoB.value } : { hometown: infoA.value, birth: infoB.value} : null,
                    actv: actv.value !== "" ? actv.value === "true" ? true : false : null,
                    idx: idx.value !== "" ? Number(idx.value) : null
                }});
                console.log(props.refresh);
                props.reset();
            }}>
                <div>
                    <input ref={node => {identifier = node; }} type="text" name="identifier" id="srchId" placeholder="ID"/>
                </div>
                <div>
                    <input ref={node => {Artist = node; }} type="text" name="Artist"   id="srchArtist" placeholder="Artist"/>
                    <input ref={node => {songTitle = node; }} type="text" name="songTitle"  id="srchSongTitle" placeholder="songTitle"/>
                </div>
                <div>
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
                <button type="submit">Update</button>
            </form>       
    ); 
}

export default Update;