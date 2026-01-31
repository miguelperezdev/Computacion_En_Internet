import subscriber from './subscriber.js';



export class IceDelegatge {
  constructor() {
    this.communicator = Ice.initialize();
  }
  async init() {
    if (this.printer) {
      return;
    }
    const hostname = 'localhost';
    const proxy = this.communicator.stringToProxy(
      `Service:ws -h ${hostname} -p 9099`
    );
    this.printer = await Game.GameServicesPrx.checkedCast(proxy);

    const proxySubject = this.communicator.stringToProxy(
      `Subject:ws -h ${hostname} -p 9099`
    );

    this.subject = await Game.SubjectPrx.checkedCast(proxySubject);

    const adapter = await this.communicator.createObjectAdapter('');
    
    const conn = this.subject.ice_getCachedConnection();
    conn.setAdapter(adapter);
    

    const callbackPrx = Game.ObserverPrx.uncheckedCast(
      adapter.addWithUUID(subscriber)
    );


    await this.subject.attachObserver(callbackPrx);
  }

  async getBoard() {
    if (!this.printer) {
      await this.init();
    }
    const resp = await this.printer.getBoard();
    return resp;
  }

  async selectCell(i, j) {
    if (!this.printer) {
      await this.init();
    }
    const resp = {};
    try {
      const win = await this.printer.selectCell(i, j);
      resp.win = win;
      resp.gameEnd = win;
    } catch (e) {
      resp.win = false;
      resp.gameEnd = true;
    }
    resp.board = await this.printer.getBoard();
    return resp;
  }

  async resetBoard() {
    if (!this.printer) {
      await this.init();
    }
    await this.printer.resetGame();
    return await this.printer.getBoard();
  }
}
const intance = new IceDelegatge();
export default intance;
