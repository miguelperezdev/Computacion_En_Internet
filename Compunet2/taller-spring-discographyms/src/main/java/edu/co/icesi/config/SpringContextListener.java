package edu.co.icesi.config;

import edu.co.icesi.util.SpringApplicationContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@WebListener
public class SpringContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ApplicationContext context = new AnnotationConfigApplicationContext("edu.co.icesi");
        SpringApplicationContext.setApplicationContext(context);
        System.out.println("Spring context initialized successfully."); // Para verificar en logs
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // cleanup
    }
}