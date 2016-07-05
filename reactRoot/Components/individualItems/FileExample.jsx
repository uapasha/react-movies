import React from 'react';

export default class FileExample extends React.Component {
    render(){
        return<div>
            <h2>Requirements:</h2>
            <p>Format: <strong>.txt</strong></p>
            <p>Fields: <strong>Title, Release, Format, Stars</strong></p>
            <p>Example:</p>
            <div className="rawText">
                <p>Title: Charade\n</p>
                <p>Release Year: 1953\n</p>
                <p>Format: DVD\n</p>
                <p>Stars: Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy\n</p>
                <p>\n</p>
                <p>Title: Cool Hand Luke\n</p>
                <p>Release Year: 1967\n</p>
                <p>Format: VHS\n</p>
                <p>Stars: Paul Newman, George Kennedy, Strother Martin\n</p>
                <p>\n</p>
                <p>Title: Butch Cassidy and the Sundance Kid\n</p>
                <p>Release Year: 1969\n</p>
                <p>Format: VHS\n</p>
                <p>Stars: Paul Newman, Robert Redford, Katherine Ross\n</p>
            </div>
        </div>
    }
}