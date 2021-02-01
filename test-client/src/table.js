import React from "react";
import { useQuery } from '@apollo/client';
import { readData } from './main';
import Pagination from './pagination';

let refresh = false;

function Table(props){
    
    const {loading, error, data, refetch} = useQuery(readData,{
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
        }
    });        
    if(loading) return 'Loading...'; 
    if(error) return `Error ${error.message}`; 
    if(refresh !== props.states.refresh) {
        refresh = !refresh;
        refetch();
    }
    
    if(data.queryMusic.length === 0 && props.states.page === 1){
        return (
            <div>
                <table className="query-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">id</th>
                            <th rowSpan="2">Artist</th>
                            <th rowSpan="2">songTitle</th>
                            <th rowSpan="2">actv</th>
                            <th rowSpan="2">idx</th>
                            <th colSpan="2">info</th>
                        </tr>
                        <tr>
                            <th>album | hometown</th>
                            <th>release | birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
                <table className="query-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">no</th>
                            <th rowSpan="2">id</th>
                            <th rowSpan="2">Artist</th>
                            <th rowSpan="2">songTitle</th>
                            <th rowSpan="2">actv</th>
                            <th rowSpan="2">idx</th>
                            <th colSpan="2">info</th>
                        </tr>
                        <tr>
                            <th>album | hometown</th>
                            <th>release | birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.queryMusic.map((query, i) => (
                            i < props.states.page * 5  && i >= (props.states.page - 1) * 5? 
                            <tr key={query.id}>
                                <td>{i}</td>
                                <td>{query.id}</td>
                                <td>{query.Artist}</td>
                                <td>{query.songTitle}</td>
                                <td>{query.actv ? 'True' : 'false'}</td>
                                <td>{query.idx}</td>
                                <td>{query.info.album ? query.info.album : query.info.hometown}</td>
                                <td>{query.info.release ? query.info.release : query.info.birth}</td>
                            </tr>
                            :
                            null
                        ))}
                    </tbody>
                </table>
                <Pagination page={props.states.page} setPage={props.setPage} length={
                    data.queryMusic.length % 5 === 0 ? parseInt(data.queryMusic.length / 5) : parseInt(data.queryMusic.length / 5) + 1
                }/>
            </div>
        );
    }
    
}

export default Table;