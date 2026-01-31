import com.zeroc.Ice.*; 

public class SuscriberI implements Demo.Suscriber {

    @Override
    public void onUpdate(String msg, Current current){
	System.out.println(msg);
    }
}
