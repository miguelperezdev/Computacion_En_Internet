
class Subscriber extends Game.Observer{

    notifyMessage(msg){
        console.log("Mesaje de server: ",msg)
    }

}

export default new Subscriber();