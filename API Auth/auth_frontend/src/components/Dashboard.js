import React from 'react';

const Dashboard = props => {
    return ( 
        <div>
            <div>
                <h1>Hello, Dashboard</h1>
                <h1>Sataus: {props.loggedInStatus}</h1>
            </div>
        </div>
    )
}

export default Dashboard;