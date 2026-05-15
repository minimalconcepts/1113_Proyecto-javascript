package com.agencia.museomotor.routes;

import com.agencia.museomotor.config.AppConfig;
import com.agencia.museomotor.controllers.AutoController;

/**
 * Rutas del ala de autos.
 * Cada URL apunta a un metodo especifico del controlador de autos.
 */
public class AutoRoutes {

    private final AppConfig appConfig;
    private final AutoController autoController;

    public AutoRoutes(AppConfig appConfig, AutoController autoController) {
        this.appConfig = appConfig;
        this.autoController = autoController;
    }

    public void register() {
        appConfig.get("/autos", autoController::index);
        appConfig.get("/autos/calle", autoController::calle);
        appConfig.get("/autos/deportivos", autoController::deportivos);
        appConfig.get("/autos/superdeportivos", autoController::superdeportivos);
        appConfig.get("/autos/hyper-cars", autoController::hyperCars);
        appConfig.get("/autos/gt3", autoController::gt3);
        appConfig.get("/autos/concept-cars", autoController::conceptCars);
    }
}
