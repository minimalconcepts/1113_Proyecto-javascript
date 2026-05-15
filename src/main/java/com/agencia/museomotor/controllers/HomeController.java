package com.agencia.museomotor.controllers;

/**
 * Controlador de portada.
 * Su responsabilidad es devolver la vista principal del museo.
 */
public class HomeController extends BaseController {

    public String index() {
        return view("home/index.html");
    }
}
