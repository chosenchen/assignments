import React from 'react';
import {getAllEvents} from '../../services/event.api';

import './event-app.styles.css';

class UpComingEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            newEvent: {eventName:'', startDate: new Date(), endDate: new Date()},
            isShowAddEventRow: false
        }
    }

    fetchAllEvents = () => {
        getAllEvents().then((res) => {
            const data = res.map(e => ({...e, startDate: new Date(e.startDate), endDate: new Date(e.endDate)}))
            this.setState({events: data});
          });
    }

    handleAddEvent=(e)=>{
        console.log(e);
        this.setState({isShowAddEventRow: true});
    }

    handleOnChange=(e)=> {
        const input = e.target;
        console.log(input.name, input.value);
        this.setState({
            newEvent: {...this.state.newEvent, [input.name]: input.value}
        });
    }

    componentDidMount() {
        this.fetchAllEvents();
    }

    render() {
        return (
            <section className="event-app">
                <header className="event-app-header">
                    UpComing Event
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
                        {this.state.events?.map(event => (
                            <tr key={event.id}>
                                <td><input type="text" value={event.eventName} disabled/></td>
                                <td><input type="text" value={event.startDate} disabled/></td>
                                <td><input type="text" value={event.endDate} disabled/></td>
                                <td>
                                    <button className="btn">Edit</button>
                                    <button className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {
                            this.state.isShowAddEventRow ? <tr>
                                <td><input type="text" value={this.state.newEvent?.eventName} name="eventName" onChange={this.handleOnChange}/></td>
                                <td><input type="date" value={this.state.newEvent?.startDate} name="startDate" onChange={this.handleOnChange}/></td>
                                <td><input type="date" value={this.state.newEvent?.endDate} name="endDate"onChange={this.handleOnChange}/></td>
                                <td>
                                    <button className="btn">Save</button>
                                    <button className="btn">Close</button>
                                </td>
                            </tr> : null
                        }
                    </tbody>
                </table>
            </section>
        )
    }

}

export default UpComingEvents;