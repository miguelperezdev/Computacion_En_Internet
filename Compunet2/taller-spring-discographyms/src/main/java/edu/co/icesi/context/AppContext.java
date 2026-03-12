package edu.co.icesi.context;

import edu.co.icesi.config.AppConfig;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AppContext {

    private static final ApplicationContext context =
            new AnnotationConfigApplicationContext(AppConfig.class);


    private AppContext() {}

    public static ApplicationContext getContext() {
        return context;
    }

}
