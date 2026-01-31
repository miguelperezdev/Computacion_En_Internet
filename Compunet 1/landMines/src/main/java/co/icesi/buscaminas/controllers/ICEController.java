package co.icesi.buscaminas.controllers;

import com.zeroc.Ice.Communicator;
import com.zeroc.Ice.ObjectAdapter;
import com.zeroc.Ice.Util;

import co.icesi.buscaminas.services.ServiceIceImpl;
import co.icesi.buscaminas.services.ServicesImpl;
import co.icesi.buscaminas.services.SubjectImpl;

public class ICEController {



    public void init(ServicesImpl servicesImpl, String[] configs){
        Communicator communicator = Util.initialize(configs);
        communicator.getProperties().setProperty("Ice.ThreadPool.Server.Size", "5");
        SubjectImpl imp = new SubjectImpl();
        ServiceIceImpl service = new ServiceIceImpl(servicesImpl, imp);
        ObjectAdapter adapter = communicator.createObjectAdapterWithEndpoints("IceService", "ws -h localhost -p 9099");

        adapter.add(service, Util.stringToIdentity("Service"));
        adapter.add(imp, Util.stringToIdentity("Subject"));
        adapter.activate();

        communicator.waitForShutdown();

    }
    
}
