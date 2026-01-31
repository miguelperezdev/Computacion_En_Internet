import com.zeroc.Ice.Current; 
import java.util.*; 
import Demo.*;
import Demo.SuscriberPrx;
import Demo.PublisherPrx;

public class PublisherI implements Demo.Publisher {

	private HashMap<String, SuscriberPrx> 
	    suscribers; 

	public PublisherI(){
	    suscribers = new HashMap<>(); 
	}

	@Override
	public void addSuscriber(String name, SuscriberPrx suscriber, Current current){
	    System.out.println("New Suscriber: ");
	    suscribers.put(name, suscriber); 
	}

	@Override
	public void removeSuscriber(String name, Current current){
	    suscribers.remove(name); 
	}

	public void notifySuscriber(String name,String msg){
	    SuscriberPrx suscriber = suscribers.get(name); 
	    suscriber.onUpdate(msg); 
	}
    }
