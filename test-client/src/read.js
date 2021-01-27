import React, {Component} from 'react';
import { gql } from '@apollo/client';
import Table from './table';
import { ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

class Read extends Component{
    constructor(props){
        super(props);
        this.state = {
            Artist: '',
            songTitle: '',
            actv: '',
            idx: '',
            stype: '',
            dir: '',
            and: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({Artist: document.getElementById('srchArtist').value});
        this.setState({songTitle: document.getElementById('srchSongTitle').value});
        this.setState({actv: document.getElementById('srchActv').value});
        this.setState({idx: document.getElementById('srchIdx').value});
        this.setState({stype: document.getElementById('stype').value});
        this.setState({dir: document.getElementById('dir').value});
        this.setState({and: document.getElementById('and').value});
        event.preventDefault();
    }


    render(){
        const srchData = gql`
        query {
            queryMusic(
            ${this.state.Artist !== '' ? 'Artist: "' + this.state.Artist + '"' : ''},
            ${this.state.songTitle !== '' ? 'songTitle: "' + this.state.songTitle + '"' : ''},
            ${this.state.actv !== '' ? 'actv:' + this.state.actv : ''},
            ${this.state.idx !== '' ? 'idx:' + this.state.idx : ''},
            settings: {
                ${this.state.stype !== '' ? 'stype: ' + this.state.stype : ''},
                ${this.state.dir !== '' ? 'dir: ' + this.state.dir : ''},
                ${this.state.and !== '' ? 'and: ' + this.state.and : ''}
            }
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
        }`;
        return (
            <div>
                <form className="srchForm" onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="Artist"   id="srchArtist" placeholder="Artist"/>
                        <input type="text" name="songTitle"  id="srchSongTitle" placeholder="songTitle"/>
                    </div>
                    <div>
                        <select name="actv" id="srchActv">
                            <option value="" selected>actv</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <input type="text" name="idx"  id="srchIdx" placeholder="idx"/>
                    </div>
                    <div>
                        <select name="stype" id="stype" className="settings">
                            <option value="" selected>정렬 기준</option>
                            <option value="Artist">Artist</option>
                            <option value="songTitle">songTitle</option>
                            <option value="idx">idx</option>
                        </select>
                        <select name="dir"   id="dir" className="settings">
                            <option value="" selected>정렬 순서</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                        <select name="and"  id="and" className="settings">
                            <option value="" selected>And/Or</option>
                            <option value="true">AND</option>
                            <option value="false">OR</option>
                        </select>
                    </div>
                    <button type="submit">search</button>
                </form>
                <div id="space">
                    <ApolloProvider client={client}><Table srchData={srchData}/></ApolloProvider>
                </div>
            </div>  
        );
    }
}



export default Read;