package com.agencia.museomotor;

import com.agencia.museomotor.config.AppConfig;
import com.agencia.museomotor.routes.RouteConfig;

/**
 * Punto de entrada de la aplicacion.
 * Inicia el servidor HTTP y registra todas las rutas del museo.
 */
public class Main {

    public static void main(String[] args) {
        AppConfig appConfig = new AppConfig(8080);
        RouteConfig routeConfig = new RouteConfig(appConfig);

        routeConfig.registerRoutes();
        appConfig.start();
    }
}
