package com.agencia.museomotor.routes;

import com.agencia.museomotor.config.AppConfig;
import com.agencia.museomotor.controllers.AvionController;

/**
 * Rutas del ala de aviones.
 * Separa aviacion comercial y militar en endpoints independientes.
 */
public class AvionRoutes {

    private final AppConfig appConfig;
    private final AvionController avionController;

    public AvionRoutes(AppConfig appConfig, AvionController avionController) {
        this.appConfig = appConfig;
        this.avionController = avionController;
    }

    public void register() {
        appConfig.get("/aviones/comerciales", avionController::comerciales);
        appConfig.get("/aviones/guerra", avionController::guerra);
    }
}
