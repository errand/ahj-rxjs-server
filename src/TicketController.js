const { Ticket } = require('./Ticket');
const { faker } = require('@faker-js/faker');

class TicketController {
  constructor() {
    this.tickets = [];
  }

  allTickets() {
    return this.tickets;
  }

  createRandomTicket() {
    const from = faker.internet.email();
    const subject = faker.hacker.phrase();
    const body = faker.lorem.paragraph();
    // eslint-disable-next-line no-plusplus
    const ticket = new Ticket(from, subject, body);
    this.tickets.push(ticket);
    return this.tickets;
  }

  createTicket(object) {
    const data = JSON.parse(object);

    const ticket = new Ticket(data.from, data.subject, data.body);
    this.tickets.push(ticket);

    return ticket;
  }

  getIndexId(id) {
    const index = this.tickets.findIndex((elem) => elem.id === id);
    return index;
  }

  getTicketById(id) {
    const ticket = this.tickets.find((elem) => elem.id === id);
    return ticket;
  }

  deleteTicket(id) {
    const item = this.getIndexId(id);
    return !!this.tickets.splice(item, 1);
  }
}

module.exports = TicketController;
