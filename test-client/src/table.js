import React from "react";
import { useQuery } from '@apollo/client';

function Table(props){
    const {loading, error, data} = useQuery(props.readData);
    if(loading) return 'Loading...';
    if(error) return `Error ${error.message}`;
    const len = data.queryMusic.length;
    return (
        <div>
            <table className="query-table">
                <thead>
                    <tr>
                        <th rowSpan="2">NO</th>
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
                            <td>{len - i}</td>
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