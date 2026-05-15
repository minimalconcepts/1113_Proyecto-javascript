package com.agencia.museomotor.controllers;

/**
 * Controlador del modulo aviones.
 * Expone las vistas de aviacion comercial y militar.
 */
public class AvionController extends BaseController {

    public String comerciales() {
        return view("aviones/comerciales.html");
    }

    public String guerra() {
        return view("aviones/guerra.html");
    }
}
