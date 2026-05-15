package com.agencia.museomotor.routes;

import com.agencia.museomotor.config.AppConfig;
import com.agencia.museomotor.controllers.HomeController;

/**
 * Rutas de portada.
 * Agrupa las URLs generales del museo.
 */
public class HomeRoutes {

    private final AppConfig appConfig;
    private final HomeController homeController;

    public HomeRoutes(AppConfig appConfig, HomeController homeController) {
        this.appConfig = appConfig;
        this.homeController = homeController;
    }

    public void register() {
        appConfig.get("/", homeController::index);
    }
}
