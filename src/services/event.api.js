const baseURL = 'http://localhost:9000';
const path = 'events';

export const getAllEvents = () =>
  fetch([baseURL, path].join('/')).then((response) => response.json());


export const addNewEvent = (newEvent) =>
  fetch([baseURL, path].join('/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newEvent),
  }).then((response) => response.json());


  export const deleteEvent = (id) =>
  fetch([baseURL, path, id].join('/'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }).then((response) => response.json());

  export const editEvent = (event) =>
  fetch([baseURL, path, event.id].join('/'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(event),
  }).then((response) => response.json());