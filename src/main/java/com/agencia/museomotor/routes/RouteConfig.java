package com.agencia.museomotor.routes;

import com.agencia.museomotor.config.AppConfig;
import com.agencia.museomotor.controllers.AvionController;
import com.agencia.museomotor.controllers.AutoController;
import com.agencia.museomotor.controllers.HomeController;
import com.agencia.museomotor.controllers.MotoController;

/**
 * Registro central de rutas.
 * Mantiene el mapa general de URLs y delega cada peticion al controlador correcto.
 */
public class RouteConfig {

    private final AppConfig appConfig;

    public RouteConfig(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    public void registerRoutes() {
        HomeController homeController = new HomeController();
        AutoController autoController = new AutoController();
        MotoController motoController = new MotoController();
        AvionController avionController = new AvionController();

        new HomeRoutes(appConfig, homeController).register();
        new AutoRoutes(appConfig, autoController).register();
        new MotoRoutes(appConfig, motoController).register();
        new AvionRoutes(appConfig, avionController).register();
    }
}
