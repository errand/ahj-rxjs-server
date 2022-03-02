const { v4: uuidv4 } = require('uuid');

class Ticket {
  constructor(from, subject, body) {
    this.id = uuidv4();
    this.from = from;
    this.subject = subject;
    this.body = body;
    this.received = Date.now();
  }
}

module.exports = { Ticket };
