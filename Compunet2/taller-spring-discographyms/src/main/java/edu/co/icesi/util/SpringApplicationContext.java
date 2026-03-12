package edu.co.icesi.util;

import org.springframework.context.ApplicationContext;

public class SpringApplicationContext {
    private static ApplicationContext context;

    public static void setApplicationContext(ApplicationContext applicationContext) {
        context = applicationContext;
    }

    public static ApplicationContext getApplicationContext() {
        return context;
    }
}