/*
 * Datos principales del museo.
 * Cada objeto representa una pieza que se muestra en una ruta especifica.
 */
window.MUSEUM_DATA = {
  sections: [
    {
      id: "autos",
      title: "Autos",
      description: "Colecciones de autos separados por uso, rendimiento y concepto.",
      routes: [
        { path: "/autos/calle", label: "Calle" },
        { path: "/autos/deportivos", label: "Deportivos" },
        { path: "/autos/superdeportivos", label: "Superdeportivos" },
        { path: "/autos/hyper-cars", label: "Hyper cars" },
        { path: "/autos/gt3", label: "GT3" },
        { path: "/autos/concept-cars", label: "Concept cars" }
      ]
    },
    {
      id: "motos",
      title: "Motos",
      description: "Motocicletas de calle, alto cilindraje y competicion GP.",
      routes: [
        { path: "/motos/calle", label: "Calle" },
        { path: "/motos/alto-cilindraje", label: "Alto cilindraje" },
        { path: "/motos/gp", label: "GP" }
      ]
    },
    {
      id: "aviones",
      title: "Aviones",
      description: "Aeronaves comerciales y de combate organizadas por sala.",
      routes: [
        { path: "/aviones/comerciales", label: "Comerciales" },
        { path: "/aviones/combate", label: "Combate" }
      ]
    },
    {
      id: "pilotos",
      title: "Pilotos",
      description: "Personajes famosos para conectar maquinas con historia humana.",
      routes: [
        { path: "/pilotos", label: "Pilotos famosos" }
      ]
    },
    {
      id: "fundadores",
      title: "Fundadores",
      description: "Creadores y figuras clave detras de marcas historicas.",
      routes: [
        { path: "/fundadores", label: "Creadores de marcas" }
      ]
    }
  ],

  routes: {
    "/autos/calle": {
      area: "Autos",
      title: "Autos de calle",
      description: "Vehiculos pensados para circular en vias publicas.",
      folder: "assets/images/autos/calle",
      items: [
        {
          name: "Ford Super Cobra Jet 1800 Mustang",
          type: "Muscle / calle",
          year: "2024",
          detail: "$5,000,000",
          image: "assets/images/autos/calle/ford-super-cobra-jet.jpg"
        }
      ]
    },
    "/autos/deportivos": {
      area: "Autos",
      title: "Autos deportivos",
      description: "Modelos con rendimiento alto y uso posible en calle.",
      folder: "assets/images/autos/deportivos",
      items: [
        {
          name: "Aston Martin DB12",
          type: "Deportivo",
          year: "2024",
          detail: "$320,000",
          image: "assets/images/autos/deportivos/aston-martin-db12.jpg"
        },
        {
          name: "Audi R8 V10",
          type: "Deportivo",
          year: "2021",
          detail: "$210,000",
          image: "assets/images/autos/deportivos/audi-r8-v10.jpg"
        }
      ]
    },
    "/autos/superdeportivos": {
      area: "Autos",
      title: "Superdeportivos",
      description: "Autos exclusivos con altas prestaciones.",
      folder: "assets/images/autos/superdeportivos",
      items: [
        {
          name: "Aston Martin Valhalla",
          type: "Superdeportivo",
          year: "2024",
          detail: "$920,000",
          image: "assets/images/autos/superdeportivos/aston-martin-valhalla.jpg"
        },
        {
          name: "Zenvo TSR-S",
          type: "Superdeportivo",
          year: "2024",
          detail: "$1,800,000",
          image: "assets/images/autos/superdeportivos/zenvo-tsr-s.jpg"
        },
        {
          name: "Lamborghini Murcielago SV",
          type: "Superdeportivo",
          year: "2010",
          detail: "$1,000,000",
          image: "assets/images/autos/superdeportivos/lamborghini-murcielago-sv.jpg"
        },
        {
          name: "Lamborghini Reventon",
          type: "Superdeportivo",
          year: "2008",
          detail: "$2,000,000",
          image: "assets/images/autos/superdeportivos/lamborghini-reventon.jpg"
        }
      ]
    },
    "/autos/hyper-cars": {
      area: "Autos",
      title: "Hyper cars",
      description: "Vehiculos de rendimiento extremo y produccion limitada.",
      folder: "assets/images/autos/hyper-cars",
      items: [
        {
          name: "Bugatti Beyron Super Sport +1600HP",
          type: "Hyper car",
          year: "2016",
          detail: "$3,500,000",
          image: "assets/images/autos/hyper-cars/bugatti-beyron-super-sport.jpg"
        },
        {
          name: "Aston Martin Valkyrie",
          type: "Hyper car",
          year: "2021",
          detail: "$6,500,000",
          image: "assets/images/autos/hyper-cars/aston-martin-valkyrie.jpg"
        },
        {
          name: "Koenigsegg Jesko Attack",
          type: "Hyper car",
          year: "2024",
          detail: "$3,000,000",
          image: "assets/images/autos/hyper-cars/koenigsegg-jesko-attack.jpg"
        },
        {
          name: "Pagani Zonda Lewis Hamilton",
          type: "Hyper car",
          year: "2014",
          detail: "$11,500,000",
          image: "assets/images/autos/hyper-cars/pagani-zonda-lewis-hamilton.jpg"
        }
      ]
    },
    "/autos/gt3": {
      area: "Autos",
      title: "GT3",
      description: "Autos preparados para competicion de gran turismo.",
      folder: "assets/images/autos/gt3",
      items: []
    },
    "/autos/concept-cars": {
      area: "Autos",
      title: "Concept cars",
      description: "Prototipos y estudios de diseno automotriz.",
      folder: "assets/images/autos/concept-cars",
      items: []
    },
    "/motos/calle": {
      area: "Motos",
      title: "Motos de calle",
      description: "Motocicletas para movilidad diaria y carretera.",
      folder: "assets/images/motos/calle",
      items: []
    },
    "/motos/alto-cilindraje": {
      area: "Motos",
      title: "Motos de alto cilindraje",
      description: "Motos premium de alto rendimiento.",
      folder: "assets/images/motos/alto-cilindraje",
      items: []
    },
    "/motos/gp": {
      area: "Motos",
      title: "Motos GP",
      description: "Prototipos de competicion para campeonatos de velocidad.",
      folder: "assets/images/motos/gp",
      items: [
        {
          name: "Suzuki GSX-RR",
          type: "Motocicleta / GP",
          year: "2020",
          detail: "Suzuki Ecstar",
          image: "assets/images/motos/gp/suzuki.jpg"
        }
      ]
    },
    "/aviones/comerciales": {
      area: "Aviones",
      title: "Aviones comerciales",
      description: "Aeronaves de transporte de pasajeros o carga.",
      folder: "assets/images/aviones/comerciales",
      items: [
        {
          name: "Airbus A380",
          type: "Avion de pasajeros",
          year: "2005",
          detail: "Aerolineras comerciales",
          image: "assets/images/aviones/comerciales/Airbus-A380.jpg"
        }
      ]
    },
    "/aviones/combate": {
      area: "Aviones",
      title: "Aviones de combate",
      description: "Aeronaves militares de defensa, ataque o reconocimiento.",
      folder: "assets/images/aviones/combate",
      items: [
        {
          name: "F-35 Lightning II",
          type: "Caza multiusos",
          year: "2010",
          detail: "Servicio militar moderno",
          image: "assets/images/aviones/combate/F-35.jpg"
        }
      ]
    }
  },

  pilots: [
    {
      name: "Ayrton Senna",
      area: "Automovilismo",
      highlight: "Tres veces campeon mundial de Formula 1.",
      description: "Reconocido por su velocidad, precision bajo lluvia y estilo de manejo intenso."
    },
    {
      name: "Lewis Hamilton",
      area: "Automovilismo",
      highlight: "Uno de los pilotos mas ganadores de la Formula 1.",
      description: "Destaca por su consistencia, tecnica y larga trayectoria en la elite del automovilismo."
    },
    {
      name: "Valentino Rossi",
      area: "Motociclismo",
      highlight: "Figura historica de MotoGP.",
      description: "Famoso por su carisma, control de carrera y rivalidades memorables."
    },
    {
      name: "Marc Marquez",
      area: "Motociclismo",
      highlight: "Campeon multiple de MotoGP.",
      description: "Conocido por su estilo agresivo, inclinaciones extremas y capacidad para recuperar la moto."
    },
    {
      name: "Chuck Yeager",
      area: "Aviacion",
      highlight: "Primer piloto confirmado en romper la barrera del sonido.",
      description: "Piloto de pruebas estadounidense clave en la historia de la aviacion moderna."
    },
    {
      name: "Amelia Earhart",
      area: "Aviacion",
      highlight: "Pionera de la aviacion mundial.",
      description: "Recordada por sus vuelos historicos y por abrir camino a nuevas generaciones de aviadores."
    }
  ],

  founders: [
    {
      name: "Enzo Ferrari",
      brand: "Ferrari",
      area: "Autos",
      year: "1947",
      description: "Fundador de Ferrari, una de las marcas mas reconocidas por su historia en competicion y superdeportivos."
    },
    {
      name: "Ferruccio Lamborghini",
      brand: "Lamborghini",
      area: "Autos",
      year: "1963",
      description: "Creador de Automobili Lamborghini, marca italiana famosa por sus deportivos radicales y diseno agresivo."
    },
    {
      name: "Horacio Pagani",
      brand: "Pagani",
      area: "Autos",
      year: "1992",
      description: "Fundador de Pagani Automobili, conocida por hyper cars artesanales con fibra de carbono y gran detalle artistico."
    },
    {
      name: "Soichiro Honda",
      brand: "Honda",
      area: "Motos y autos",
      year: "1948",
      description: "Fundador de Honda Motor Company, una marca clave en motocicletas, automoviles y competicion."
    },
    {
      name: "Michio Suzuki",
      brand: "Suzuki",
      area: "Motos",
      year: "1909",
      description: "Fundador de Suzuki, empresa que comenzo en telares y evoluciono hasta motos, autos y competicion."
    },
    {
      name: "William Boeing",
      brand: "Boeing",
      area: "Aviones",
      year: "1916",
      description: "Fundador de Boeing, una de las companias aeronauticas mas influyentes en aviacion comercial y militar."
    },
    {
      name: "Henri Ziegler",
      brand: "Airbus",
      area: "Aviones",
      year: "1970",
      description: "Figura clave en la creacion de Airbus, consorcio europeo que transformo la aviacion comercial moderna."
    }
  ]
};
