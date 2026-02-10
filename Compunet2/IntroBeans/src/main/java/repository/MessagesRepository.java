package repository;

import java.util.ArrayList;

public class MessagesRepository {

    //Resuelve el problema de registrar datos y extraerlos

        private ArrayList<String> messages = new ArrayList<>();{}

        public void addMessages(String message){
        messages.add(message);
    }

    public void addName(String name){
            messages.add(name);
    }

        public ArrayList<String> getMessages() {
    return messages;
    }
}
