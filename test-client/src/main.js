import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { gql } from '@apollo/client';
import Table from './table';
import Create from './create';
import Read from './read';
import Update from './update';
import Delete from './delete';
import { ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

  const initialState = {
    id: '',
    Artist: '',
    songTitle: '',
    actv: '',
    idx: '',
    stype: '',
    dir: '',
    and: '',
    srchInfo:'',
    infoA:'',
    infoB:'',
  }

  const readData = gql`
        query QueryMusic($Artist: String, $songTitle: String, $info:infoInput, $actv:Boolean, $idx: Int, $settings: Setting){
            queryMusic(
                Artist: $Artist,
                songTitle: $songTitle,
                info: $info,
                actv: $actv,
                idx: $idx
                settings: $settings
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

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            Artist: '',
            songTitle: '',
            actv: '',
            idx: '',
            stype: '',
            dir: '',
            and: '',
            srchInfo: '',
            infoA:'',
            infoB:'',
            refresh: false
        };
        this.reset = this.reset.bind(this);
        this.addRead = this.addRead.bind(this);
        this.addCreate = this.addCreate.bind(this);
        this.addUpdate = this.addUpdate.bind(this);
        this.addDelete = this.addDelete.bind(this);
        this.handleCreateChange = this.handleCreateChange.bind(this);
        this.handleReadChange = this.handleReadChange.bind(this);
    }
    reset(){
        console.log('reset : ' + this.state.refresh);
        this.setState({refresh: !this.state.refresh});
        //this.setState(initialState);
    }

    handleCreateChange(Artist, songTitle, actv, idx, srchInfo, infoA, infoB){
        this.setState({Artist:Artist});
        this.setState({songTitle:songTitle});
        this.setState({actv:actv});
        this.setState({idx:idx});
        this.setState({srchInfo:srchInfo});
        this.setState({infoA:infoA});
        this.setState({infoB:infoB});
    }

    handleReadChange(Artist, songTitle, actv, idx, stype, dir, and){
        this.setState({Artist:Artist});
        this.setState({songTitle:songTitle});
        this.setState({actv:actv});
        this.setState({idx:idx});
        this.setState({stype:stype});
        this.setState({dir:dir});
        this.setState({and:and});
    }

    addCreate(){
        //this.reset();
        ReactDOM.render(
            <ApolloProvider client={client}>
            <Create refresh={this.state.refresh} reset={this.reset} readData={readData}/>
            </ApolloProvider>,
            document.getElementById('form-space')
        );
    }

    addRead(){
        //this.reset();
        ReactDOM.render(
            <Read 
                handleReadChange={this.handleReadChange}
                reset={this.reset}
            />, 
            document.getElementById('form-space')
        );
    }

    addUpdate(){
        ReactDOM.render(
            <ApolloProvider client={client}>
            <Update refresh={this.state.refresh} reset={this.reset} />
            </ApolloProvider>,
            document.getElementById('form-space')
        );
    }

    addDelete(){
        ReactDOM.render(
            <ApolloProvider client={client}>
            <Delete refresh={this.state.refresh} reset={this.reset}/>
            </ApolloProvider>,
            document.getElementById('form-space')
        );
    }

    render(){/*
        const readData = gql`
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
        }`;*/
        return (
            <div>
                <span className="CRUD-span">
                    <button onClick={this.addCreate}>Create</button>
                    <button onClick={this.addRead}>Read</button>
                    <button onClick={this.addUpdate}>Update</button>
                    <button onClick={this.addDelete}>Delete</button>
                </span>
                <div id="form-space"></div>
                <div id="space">
                    <Table states={this.state} refresh={this.state.refresh} setCheck={this.setCheck} readData={readData}/>
                </div>
            </div>  
        );
    }
}



export default Main;