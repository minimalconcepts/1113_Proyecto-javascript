package com.agencia.museomotor.controllers;

/**
 * Controlador del modulo aviones.
 * Expone las vistas de aviacion comercial y de combate.
 */
public class AvionController extends BaseController {

    public String comerciales() {
        return view("aviones/comerciales.html");
    }

    public String combate() {
        return view("aviones/combate.html");
    }
}
