const { faker } = require('@faker-js/faker');
const { Ticket } = require('./Ticket');

class Faker {
  constructor() {
    this.messages = [];
    this.timer = null;
  }

  start() {
    const delay = Math.floor(Math.random() * 10000) + 1000;

    this.timer = setTimeout(() => {
      this.addMessage();
    }, delay);
  }

  addMessage() {
    const from = faker.internet.email();
    const subject = faker.hacker.phrase();
    const body = faker.lorem.paragraph();

    const message = new Ticket(from, subject, body);

    this.messages.push(message);

    if (this.messages.length > 5) {
      this.messages = [];
      clearTimeout(this.timer);
    }
  }
}

module.exports = Faker;
