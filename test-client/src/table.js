import React from "react";
import { useQuery } from '@apollo/client';
import { readData } from './main';


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
                page: props.states.page,
                and: props.states.and !== "" ? props.states.and === "true" ? true : false : null
            }
        }
    });
    if(loading) return 'Loading...';
    if(error) return `Error ${error.message}`;
    if(refresh !== props.states.refresh) {
        console.log(props.states.refresh);
        refresh = !refresh;
        refetch();
    }
    //const len = data.queryMusic.length;
    
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
                    {data.queryMusic.map((query, i) => (
                        <tr key={query.id}>
                            <td>{query.id}</td>
                            <td>{query.Artist}</td>
                            <td>{query.songTitle}</td>
                            <td>{query.actv ? 'True' : 'false'}</td>
                            <td>{query.idx}</td>
                            <td>{query.info.album ? query.info.album : query.info.hometown}</td>
                            <td>{query.info.release ? query.info.release : query.info.birth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;