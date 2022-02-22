import React from 'react';

import './event-app.styles.css';

class EventApp extends React.Component {
    constructor() {
        super();
        this.state = {
            events: []
        }
    }

    render() {
        return (
            <section className="event-app">
                <header className="event-app-header">
                    <button>Add Event</button>
                </header>
                <table className="event-app-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>test-1</td>
                            <td>test-1</td>
                            <td>test-1</td>
                            <td>test-1</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        )
    }

}

export default EventApp;