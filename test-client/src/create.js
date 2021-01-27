import React, {Component} from 'react';
import { gql, useMutation } from '@apollo/client';

class Create extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.props.reset();
    }


    render(){
        let Artist, songTitle, infoType, infoA, infoB, actv, idx;
        const createData = gql`
        mutation{
            createMusic(
                ${'Artist: "' + Artist.value + '"'},
                ${songTitle !== null ? 'songTitle: "' + songTitle.value + '"' : ''},
                ${srchInfo !== null ? 
                    'info: {' + 
                    (srchInfo.value === 'album' ? 'album: "' + infoA.value + '",' : 'hometown: "' + infoA.value + '",') +
                    (srchInfo.value === 'album' ? 'release: "' + infoB.value + '",' : 'birth: "' + infoB.value + '"') +
                    '},' : ''},
                ${actv.value !== '' ? 'actv:' + actv.value : ''},
                ${idx.value !== '' ? 'idx:' + idx.value : ''},
            )
          }
        `;
        const [addTodo, {data}] = useMutation(createData);
        return (
                <form className="srchForm" onSubmit={e => {
                    e.preventDefault();
                    addTodo({ variables: {
                        Artist: Artist.value,
                        songTitle: songTitle.value,
                        info: srchInfo.value === 'album' ? { album: infoA.value, release: infoB.value } : { hometown: infoA.value, birth: infoB.value},
                        actv: actv.value,
                        idx: idx.value
                    }});
                    this.props.reset();
                }}>
                    <div>
                        <input ref={node => {Artist = node; }} type="text" name="Artist"   id="srchArtist" placeholder="Artist"/>
                        <input ref={node => {songTitle = node; }} type="text" name="songTitle"  id="srchSongTitle" placeholder="songTitle"/>
                    </div>
                    <div>
                        <select ref={node => {infoType = node; }} name="infoType" id="srchInfo">
                            <option value="" selected>info type</option>
                            <option value="album">곡 정보</option>
                            <option value="hometown">가수 정보</option>
                        </select>
                        <input ref={node => {infoA = node; }} type="text" name="infoA" id="infoA" placeholder="album / hometown"/>
                        <input ref={node => {infoB = node; }} type="text" name="infoB" id="infoB" placeholder="release / birth"/>
                    </div>
                    <div>
                        <select ref={node => {actv = node; }} name="actv" id="srchActv">
                            <option value="" selected>actv</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <input ref={node => {idx = node; }} type="text" name="idx"  id="srchIdx" placeholder="idx"/>
                    </div>
                    <button type="submit">Create</button>
                </form>       
        );
    }
}



export default Create;