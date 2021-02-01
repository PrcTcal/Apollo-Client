import React, {useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { readData } from './main';

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
    const [updateTodo, { data }] = useMutation(updateData,{
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
    //if(data != null) props.reset();
    return (
            <form className="srchForm" onSubmit={e => {
                e.preventDefault();
                if(identifier.value === '') {
                    alert('ID를 입력해주세요');
                } else if(Artist.value === '' && songTitle.value === '' && infoType.value === '' && infoA.value === '' && infoB.value === '' && actv.value === '' && idx.value === '') {
                    alert('업데이트할 필드를 하나 이상 지정해주세요.');
                } else {
                    updateTodo({ variables: {
                        id: identifier.value,
                        Artist: Artist.value !== "" ? Artist.value : null,
                        songTitle: songTitle.value !== "" ? songTitle.value : null,
                        info: infoType.value !== "" ? infoType.value === 'album' ? { album: infoA.value, release: infoB.value } : { hometown: infoA.value, birth: infoB.value} : null,
                        actv: actv.value !== "" ? actv.value === "true" ? true : false : null,
                        idx: idx.value !== "" ? Number(idx.value) : null
                    }});
                }    
            }}>
                <div>
                    <input ref={node => {identifier = node; }} type="text" name="identifier" id="srchId" placeholder="ID"/>
                </div>
                <div>
                    <input ref={node => {Artist = node; }} type="text" name="Artist"   id="srchArtist" placeholder="Artist"/>
                    <input ref={node => {songTitle = node; }} type="text" name="songTitle"  id="srchSongTitle" placeholder="songTitle"/>
                </div>
                <div className="info">
                    <select ref={node => {infoType = node; }} defaultValue="" name="infoType" id="srchInfo">
                        <option value="">info type</option>
                        <option value="album">곡 정보</option>
                        <option value="hometown">가수 정보</option>
                    </select>
                    <input ref={node => {infoA = node; }} type="text" name="infoA" id="infoA" placeholder="album / hometown"/>
                    <input ref={node => {infoB = node; }} type="text" name="infoB" id="infoB" placeholder="release / birth"/>
                 </div>
                <div>
                    <select ref={node => {actv = node; }} defaultValue="" name="actv" id="srchActv">
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