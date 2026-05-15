package com.agencia.museomotor.controllers;

/**
 * Controlador del modulo autos.
 * Conecta cada ruta con su plantilla HTML correspondiente.
 */
public class AutoController extends BaseController {

    public String calle() {
        return view("autos/calle.html");
    }

    public String deportivos() {
        return view("autos/deportivos.html");
    }

    public String superdeportivos() {
        return view("autos/superdeportivos.html");
    }

    public String hyperCars() {
        return view("autos/hyper-cars.html");
    }

    public String gt3() {
        return view("autos/gt3.html");
    }

    public String conceptCars() {
        return view("autos/concept-cars.html");
    }
}
