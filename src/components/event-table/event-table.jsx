import React from 'react';

class EventTable extends React.Component{
    render() {
        const {renderHeader, dataCol, renderFooter} = this.props;

        const header = renderHeader ? 
        (<header className="event-app-header">{renderHeader()}</header>): null;
        const footer = footer ? 
        (<tfooter className="event-app-footer">{renderFooter()}</tfooter>): null;
        return(
            <section className='event-app'>
                {header}
                <table className="event-app-table">
                <thead>
                    <tr>
                        {dataCol.map((col, index) => (
                            <th key={`${col}`}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
                {footer}
                </table>
 
            </section>
        )
    }
}