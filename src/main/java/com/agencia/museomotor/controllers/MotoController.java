package com.agencia.museomotor.controllers;

/**
 * Controlador del modulo motos.
 * Mantiene separadas las vistas de calle, alto cilindraje y GP.
 */
public class MotoController extends BaseController {

    public String calle() {
        return view("motos/calle.html");
    }

    public String altoCilindraje() {
        return view("motos/alto-cilindraje.html");
    }

    public String gp() {
        return view("motos/gp.html");
    }
}
