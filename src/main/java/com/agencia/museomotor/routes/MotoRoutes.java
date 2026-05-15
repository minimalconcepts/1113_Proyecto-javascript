package com.agencia.museomotor.routes;

import com.agencia.museomotor.config.AppConfig;
import com.agencia.museomotor.controllers.MotoController;

/**
 * Rutas del ala de motos.
 * Permite ampliar categorias sin tocar otros modulos.
 */
public class MotoRoutes {

    private final AppConfig appConfig;
    private final MotoController motoController;

    public MotoRoutes(AppConfig appConfig, MotoController motoController) {
        this.appConfig = appConfig;
        this.motoController = motoController;
    }

    public void register() {
        appConfig.get("/motos/calle", motoController::calle);
        appConfig.get("/motos/alto-cilindraje", motoController::altoCilindraje);
        appConfig.get("/motos/gp", motoController::gp);
    }
}
