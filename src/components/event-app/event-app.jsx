import React from 'react';
import {getAllEvents, addNewEvent, deleteEvent, editEvent} from '../../services/event.api';
import moment from 'moment';

import './event-app.styles.css';

class EventApp extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            newEvent: {eventName:'', startDate: moment(Date.now()).format('YYYY-MM-DD'), endDate: moment(Date.now()).format('YYYY-MM-DD')},
            isShowAddEventRow: false
        }
    }

    fetchAllEvents = () => {
        getAllEvents().then((res) => {
            const data = res.map(e => ({...e, startDate: moment(parseInt(e.startDate)).format('YYYY-MM-DD'), endDate: moment(parseInt(e.endDate)).format('YYYY-MM-DD')}))
            this.setState({events: data});
        });
    }

    handleAddEvent=(e)=>{
        this.setState({isShowAddEventRow: true});
    }

    handleOnChange=(e)=> {
        const input = e.target;
        this.setState({
            newEvent: {...this.state.newEvent, [input.name]: input.value}
        });
    }

    handleClose=() =>{
        this.setState({
            isShowAddEventRow: false,
            newEvent: {eventName:'', startDate: moment(Date.now()).format('YYYY-MM-DD'), endDate: moment(Date.now()).format('YYYY-MM-DD')},
        })
    }

    handleSaveAndNew =()=>{
        const {eventName, startDate, endDate} = this.state.newEvent;
        const newEvent = {eventName, startDate: ''+ new Date(startDate).getTime(), endDate: ''+ new Date(endDate).getTime()}
        if(eventName && new Date(startDate).getTime() <= new Date(endDate).getTime()){
            addNewEvent(newEvent).then(data => {
                this.handleClose();
                this.fetchAllEvents();
            })
        } else {
            alert('invalid');
        }
    }

    handleDelete=(event)=> {
        deleteEvent(event.id).then(data=> {
            this.fetchAllEvents();
        })
    }

    handleEdit=(editEvent)=> {
        const newEvents = this.state.events.map(event=> {
            if(event.id === editEvent.id) {
                return {...event, isEditing: true}
            } else{
                return event;
            }
        })

        this.setState({events: newEvents});

    }

    handleUpdate =(event)=>{
        const {id, eventName, startDate, endDate} = event;
        const editedEvent = {id, eventName, startDate: ''+ new Date(startDate).getTime(), endDate: ''+new Date(endDate).getTime()};
        if(eventName && new Date(startDate).getTime() <= new Date(endDate).getTime()){
            editEvent(editedEvent).then(data => {
                this.handleCancel(editedEvent);
            })
        } else {
            alert('invalid');
        }
    }

    handleCancel=(editEvent)=>{
        const newEvents = this.state.events.map(event=> {
            if(event.id === editEvent.id) {
                return {...event, isEditing: false}
            } else{
                return event;
            }
        })

        this.setState({events: newEvents});
    }

    handleOnChangeEditEvent=(e, editEvent)=> {
        const input = e.target;
        const newEvents = this.state.events.map(event=> {
            if(event.id === editEvent.id) {
                return {...event, [input.name]: input.value}
            } else{
                return event;
            }
        })

        this.setState({events: newEvents});
    }

    componentDidMount() {
        this.fetchAllEvents();
    }

    render() {
        return (
            <section className="event-app">
                <header className="event-app-header">
                    <button onClick={this.handleAddEvent}>Add Event</button>
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
                        {this.state.events?.map(event => {
                            if (event.isEditing) {
                                return (
                                <tr key={event.id}>
                                    <td><input type="text" value={event.eventName} name="eventName" onChange={(e) => this.handleOnChangeEditEvent(e, event)}/></td>
                                    <td><input type="date" value={event.startDate} name="startDate" onChange={(e) => this.handleOnChangeEditEvent(e, event)}/></td>
                                    <td><input type="date" value={event.endDate} name="endDate" onChange={(e) => this.handleOnChangeEditEvent(e, event)}/></td>
                                    <td>
                                        <button className="btn" onClick={()=>this.handleUpdate(event)}>Update</button>
                                        <button className="btn" onClick={()=>this.handleCancel(event)}>Cancel</button>
                                    </td>
                                </tr>
                                )
                            } else {
                                return (
                                <tr key={event.id}>
                                    <td><input type="text" value={event.eventName} disabled/></td>
                                    <td><input type="text" value={event.startDate} disabled/></td>
                                    <td><input type="text" value={event.endDate} disabled/></td>
                                    <td>
                                        <button className="btn" onClick={()=>this.handleEdit(event)}>Edit</button>
                                        <button className="btn" onClick={()=>this.handleDelete(event)}>Delete</button>
                                    </td>
                                </tr>
                                )
                            }
                        })
                        }
                        {
                            this.state.isShowAddEventRow ? 
                            <tr>
                                <td><input type="text" value={this.state.newEvent.eventName} name="eventName" onChange={this.handleOnChange}/></td>
                                <td><input type="date" value={this.state.newEvent.startDate} name="startDate" onChange={this.handleOnChange}/></td>
                                <td><input type="date" value={this.state.newEvent.endDate} name="endDate" onChange={this.handleOnChange}/></td>
                                <td>
                                    <button className="btn" onClick={this.handleSaveAndNew}>Save</button>
                                    <button className="btn"onClick={this.handleClose}>Close</button>
                                </td>
                            </tr> : null
                        }
                    </tbody>
                </table>
            </section>
        )
    }

}

export default EventApp;