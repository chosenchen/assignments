const baseURL = 'http://localhost:3000';
const path = 'events';

export const getAllEvents = () =>
  fetch([baseURL, path].join('/')).then((response) => response.json());