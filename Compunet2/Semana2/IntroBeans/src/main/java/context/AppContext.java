package context;

import org.springframework.context.ApplicationContext;

public class AppContext {
    private static AppContext instance = new AppContext();

    public static ApplicationContext getContext() {
    }
}
