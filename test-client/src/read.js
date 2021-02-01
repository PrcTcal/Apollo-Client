import React, {Component} from 'react';


class Read extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleReadChange(
            document.getElementById('srchArtist').value,
            document.getElementById('srchSongTitle').value,
            document.getElementById('srchActv').value,
            document.getElementById('srchIdx').value,
            document.getElementById('stype').value,
            document.getElementById('dir').value,
            document.getElementById('and').value
        );
        this.props.reset();
        this.props.initPage();
    }


    render(){
        return (
                <form className="srchForm" onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="Artist"   id="srchArtist" placeholder="Artist"/>
                        <input type="text" name="songTitle"  id="srchSongTitle" placeholder="songTitle"/>
                    </div>
                    <div>
                        <select defaultValue="" name="actv" id="srchActv">
                            <option value="">actv</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <input type="text" name="idx"  id="srchIdx" placeholder="idx"/>
                    </div>
                    <div>
                        <select defaultValue="" name="stype" id="stype" className="settings">
                            <option value="">정렬 기준</option>
                            <option value="Artist">Artist</option>
                            <option value="songTitle">songTitle</option>
                            <option value="idx">idx</option>
                        </select>
                        <select name="dir" defaultValue=""  id="dir" className="settings">
                            <option value="">정렬 순서</option>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                        <select name="and" defaultValue="" id="and" className="settings">
                            <option value="">And/Or</option>
                            <option value="true">AND</option>
                            <option value="false">OR</option>
                        </select>
                    </div>
                    <button type="submit">search</button>
                </form>       
        );
    }
}



export default Read;