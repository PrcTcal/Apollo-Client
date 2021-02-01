import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { gql } from '@apollo/client';
import Table from './table';
import Create from './create';
import Read from './read';
import Update from './update';
import Delete from './delete';
import Pagination from './pagination';
import { ApolloProvider} from '@apollo/client';
import {ApolloClient, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

  export const readData = gql`
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
            page: 1,
            and: '',
            srchInfo: '',
            infoA:'',
            infoB:'',
            refresh: false,
            length: 0
        };
        this.reset = this.reset.bind(this);
        this.initPage = this.initPage.bind(this);
        this.setPage = this.setPage.bind(this);
        this.addRead = this.addRead.bind(this);
        this.addCreate = this.addCreate.bind(this);
        this.addUpdate = this.addUpdate.bind(this);
        this.addDelete = this.addDelete.bind(this);
        this.handleCreateChange = this.handleCreateChange.bind(this);
        this.handleReadChange = this.handleReadChange.bind(this);
    }
    reset(){
        this.setState({refresh: !this.state.refresh});
    }
    initPage(){
        this.setState({page: 1});
    }
    setPage(num){
        this.setState({page: num});
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
        ReactDOM.render(
            <ApolloProvider client={client}>
            <Create states={this.state} reset={this.reset} />
            </ApolloProvider>,
            document.getElementById('form-space')
        );
    }

    addRead(){
        ReactDOM.render(
            <Read 
                handleReadChange={this.handleReadChange}
                reset={this.reset}
                initPage={this.initPage}
            />, 
            document.getElementById('form-space')
        );
    }

    addUpdate(){
        ReactDOM.render(
            <ApolloProvider client={client}>
            <Update states={this.state} reset={this.reset} />
            </ApolloProvider>,
            document.getElementById('form-space')
        );
    }

    addDelete(){
        ReactDOM.render(
            <ApolloProvider client={client}>
            <Delete states={this.state} reset={this.reset}/>
            </ApolloProvider>,
            document.getElementById('form-space')
        );
    }

    render(){
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
                    <Table states={this.state} setPage={this.setPage} />
                    <Pagination page={this.state.page} setPage={this.setPage}/>
                </div>
            </div>  
        );
    }
}



export default Main;