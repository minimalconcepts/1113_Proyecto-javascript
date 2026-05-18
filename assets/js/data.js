/*
 * Datos principales del museo.
 * Cada objeto representa una pieza que se muestra en una ruta especifica.
 */
const LEARNING_BY_AREA = {
  autos: {
    level: "Intermedio",
    keyConcepts: ["Diseno", "Potencia", "Aerodinamica", "Uso"],
    questions: [
      "Que diferencia esta pieza de otra de su misma sala?",
      "Que papel tiene su diseno en el rendimiento?"
    ],
    funFact: "En autos de alto rendimiento, la aerodinamica puede ser tan importante como el motor.",
    summary: "Sirve para estudiar como se combinan marca, tecnologia y proposito en un vehiculo."
  },
  motos: {
    level: "Intermedio",
    keyConcepts: ["Cilindraje", "Peso", "Aceleracion", "Control"],
    questions: [
      "Que relacion hay entre peso y rendimiento?",
      "Por que la posicion del piloto cambia el comportamiento de la moto?"
    ],
    funFact: "En motos deportivas, pocos kilos de diferencia pueden cambiar mucho la respuesta.",
    summary: "Sirve para estudiar equilibrio, potencia y control en dos ruedas."
  },
  aviones: {
    level: "Intermedio",
    keyConcepts: ["Aerodinamica", "Motor", "Alcance", "Uso principal"],
    questions: [
      "Para que tipo de mision fue disenado?",
      "Que tecnologia lo diferencia de otros aviones?"
    ],
    funFact: "En aviacion, el diseno depende mucho de la mision: transporte, combate, velocidad o alcance.",
    summary: "Sirve para estudiar como la ingenieria cambia segun el objetivo del avion."
  }
};

const PENDING_SPECS = {
  creator: "Pendiente por investigar",
  power: "Pendiente por investigar",
  topSpeed: "Pendiente por investigar",
  records: "Pendiente por investigar",
  mainUse: "Pendiente por investigar",
  importance: "Pendiente por investigar"
};

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
          image: "assets/images/autos/calle/Ford-Mustang-Super-Cobra-Jet-1800.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Ford Performance",
            power: "Mas de 1.800 hp aprox.",
            mainUse: "Drag racing y demostracion de rendimiento electrico.",
            importance: "Muestra como el muscle car tambien puede evolucionar hacia tecnologia electrica extrema."
          },
          learning: LEARNING_BY_AREA.autos
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
          image: "assets/images/autos/deportivos/Aston-Martin-DB12.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Aston Martin",
            power: "Aprox. 671 hp",
            topSpeed: "Aprox. 325 km/h",
            mainUse: "Gran turismo deportivo de lujo.",
            importance: "Representa la mezcla entre lujo, rendimiento y uso de carretera."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Audi R8 V10",
          type: "Deportivo",
          year: "2021",
          detail: "$210,000",
          image: "assets/images/autos/deportivos/Audi-R8-V10.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Audi",
            power: "Motor V10, potencia segun version",
            topSpeed: "Mas de 300 km/h aprox.",
            mainUse: "Deportivo de calle con herencia de competicion.",
            importance: "Es reconocido por llevar un motor V10 atmosferico a un auto usable en calle."
          },
          learning: LEARNING_BY_AREA.autos
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
          image: "assets/images/autos/superdeportivos/Aston-Martin-Valhalla.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Aston Martin",
            power: "Sistema hibrido de alto rendimiento",
            mainUse: "Superdeportivo hibrido para carretera y pista.",
            importance: "Muestra la transicion de los superdeportivos hacia sistemas hibridos."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Zenvo TSR-S",
          type: "Superdeportivo",
          year: "2024",
          detail: "$1,800,000",
          image: "assets/images/autos/superdeportivos/Zenvo-TSR-S.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Zenvo Automotive",
            power: "Mas de 1.000 hp aprox.",
            mainUse: "Superdeportivo extremo de produccion limitada.",
            importance: "Destaca por su aerodinamica activa y enfoque radical."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Lamborghini Murcielago SV",
          type: "Superdeportivo",
          year: "2010",
          detail: "$1,000,000",
          image: "assets/images/autos/superdeportivos/Murciélago-SV.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Lamborghini",
            power: "Motor V12",
            topSpeed: "Mas de 330 km/h aprox.",
            mainUse: "Superdeportivo de alto rendimiento.",
            importance: "Es una version mas ligera y radical del Murcielago."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Lamborghini Reventon",
          type: "Superdeportivo",
          year: "2008",
          detail: "$2,000,000",
          image: "assets/images/autos/superdeportivos/Lamborghini-Reventon.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Lamborghini",
            power: "Motor V12",
            mainUse: "Superdeportivo exclusivo de produccion limitada.",
            importance: "Influyo en el lenguaje de diseno agresivo de Lamborghini moderno."
          },
          learning: LEARNING_BY_AREA.autos
        },
         {
          name: "ASTON MARTIN VULCAN",
          type: "Superdeportivo",
          year: "2008",
          detail: "$2,000,000",
          image: "assets/images/autos/superdeportivos/ASTON-MARTIN-VULCAN.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Aston Martin",
            power: "Motor V12 de alto rendimiento",
            mainUse: "Auto de pista de produccion limitada.",
            importance: "Representa el lado mas extremo de Aston Martin para circuito."
          },
          learning: LEARNING_BY_AREA.autos
        },
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
          image: "assets/images/autos/hyper-cars/Bugatti-beyron-super-sport.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Bugatti",
            power: "Mas de 1.000 hp",
            topSpeed: "Mas de 400 km/h aprox.",
            records: "Relacionado con la historia de records de velocidad de Bugatti.",
            mainUse: "Hyper car de velocidad extrema.",
            importance: "Representa la busqueda de velocidad maxima en autos de produccion."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Aston Martin Valkyrie",
          type: "Hyper car",
          year: "2021",
          detail: "$6,500,000",
          image: "assets/images/autos/hyper-cars/Aston-Martin-Valrkerye-AMR-PRO.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Aston Martin",
            power: "Motor hibrido de alto rendimiento",
            mainUse: "Hyper car inspirado en tecnologia de competicion.",
            importance: "Acerca tecnologia de pista y aerodinamica extrema al mundo de hyper cars."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Koenigsegg Jesko Attack",
          type: "Hyper car",
          year: "2024",
          detail: "$3,000,000",
          image: "assets/images/autos/hyper-cars/Koenigsegg-Jesko-Attack.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Koenigsegg",
            power: "Mas de 1.200 hp segun version y combustible",
            mainUse: "Hyper car de pista y velocidad extrema.",
            importance: "Destaca por innovacion tecnica, aerodinamica y rendimiento extremo."
          },
          learning: LEARNING_BY_AREA.autos
        },
        {
          name: "Pagani Zonda Lewis Hamilton",
          type: "Hyper car",
          year: "2014",
          detail: "$11,500,000",
          image: "assets/images/autos/hyper-cars/Pagani-Zonda-Lewis-Hamilton.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Pagani",
            power: "Motor AMG V12 segun version",
            mainUse: "Hyper car artesanal y de coleccion.",
            importance: "Representa el valor de diseno, artesania y exclusividad en hyper cars."
          },
          learning: LEARNING_BY_AREA.autos
        }
      ]
    },
    "/autos/gt3": {
      area: "Autos",
      title: "GT3",
      description: "Autos preparados para competicion de gran turismo.",
      folder: "assets/images/autos/gt3",
      items: [
          {
          name: "Aston-Martin-Vantage-GT3",
          type: "GT3",
          year: "2016",
          detail: "$3,500,000",
          image: "assets/images/autos/gt3/Aston-Martin-Vantage-GT3.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Aston Martin Racing",
            mainUse: "Competicion GT3.",
            importance: "Sirve para estudiar autos preparados para carreras de gran turismo."
          },
          learning: LEARNING_BY_AREA.autos
        },
      ]
    },
    "/autos/concept-cars": {
      area: "Autos",
      title: "Concept cars",
      description: "Prototipos y estudios de diseno automotriz.",
      folder: "assets/images/autos/concept-cars",
      items: [  
        {
          name: "Saleen-S5S-Raptor",
          type: "Concept cars",
          year: "2016",
          detail: "$3,500,000",
          image: "assets/images/autos/concept-cars/Saleen-S5S-Raptor.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Saleen",
            mainUse: "Prototipo y estudio de diseno.",
            importance: "Permite estudiar ideas de diseno antes de llegar a produccion."
          },
          learning: LEARNING_BY_AREA.autos
        },]
    },
    "/motos/calle": {
      area: "Motos",
      title: "Motos de calle",
      description: "Motocicletas para movilidad diaria y carretera.",
      folder: "assets/images/motos/calle",
      items: [
        {
          name: "TVS-Apache-200-4V",
          type: "calle",
          year: "2020",
          image: "assets/images/motos/calle/TVS-Apache-200-4V.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "TVS Motor Company",
            mainUse: "Moto de calle y movilidad deportiva ligera.",
            importance: "Sirve para estudiar motos accesibles con enfoque deportivo."
          },
          learning: LEARNING_BY_AREA.motos
        }
      ]
    },
    "/motos/alto-cilindraje": {
      area: "Motos",
      title: "Motos de alto cilindraje",
      description: "Motos premium de alto rendimiento.",
      folder: "assets/images/motos/alto-cilindraje",
      items: [
           {
          name: "Honda-CBX-1000",
          type: "alto cilindraje ",
          year: "2016",
          detail: "$3,500,000",
          image: "assets/images/motos/alto-cilindraje/Honda-CBX-1000.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Honda",
            power: "Motor de seis cilindros en linea",
            mainUse: "Moto clasica de alto cilindraje.",
            importance: "Es recordada por su motor llamativo y su valor historico."
          },
          learning: LEARNING_BY_AREA.motos
        },
        {
          name: "Susuki-Hayabusa-supercharged",
          type: "alto cilindraje",
          year: "2016",
          detail: "$3,500,000",
          image: "assets/images/motos/alto-cilindraje/Susuki-Hayabusa-supercharged.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Suzuki",
            power: "Alto rendimiento; datos exactos segun preparacion",
            mainUse: "Velocidad y alto cilindraje.",
            importance: "La Hayabusa es una referencia popular de velocidad en motocicletas."
          },
          learning: LEARNING_BY_AREA.motos
        },
      ]
    },
    "/motos/gp": {
      area: "Motos",
      title: "Motos GP",
      description: "Prototipos de competicion para campeonatos de velocidad.",
      folder: "assets/images/motos/gp",
      items: [
        {
          name: "Susuki-Hayabusa-supercharged",
          type: "Motocicleta / GP",
          year: "2020",
          detail: "Suzuki Ecstar",
          image: "assets/images/motos/gp/Susuki-Hayabusa-supercharged.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Suzuki",
            mainUse: "Competicion y alto rendimiento.",
            importance: "Permite comparar motos de enfoque deportivo con motos de calle."
          },
          learning: LEARNING_BY_AREA.motos
        },
        {
          name: "Yamaha-YZR-M1-Movistar-Valentino Rossi",
          type: "Motocicleta / GP",
          year: "2020",
          detail: "Yamaha M1",
          image: "assets/images/motos/gp/Yamaha-YZR-M1-Movistar-Valentino Rossi.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Yamaha",
            mainUse: "MotoGP y competicion de alto nivel.",
            importance: "Esta asociada con la historia moderna de MotoGP y pilotos legendarios."
          },
          learning: LEARNING_BY_AREA.motos
        },
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
          image: "assets/images/aviones/comerciales/Airbus-A-380.jpg",
          specs: {
            ...PENDING_SPECS,
            creator: "Airbus",
            power: "Cuatro motores turbofan",
            topSpeed: "Aprox. 900 km/h en crucero",
            records: "Reconocido como uno de los aviones de pasajeros mas grandes del mundo.",
            mainUse: "Transporte comercial de pasajeros de gran capacidad.",
            importance: "Representa la aviacion comercial de alta capacidad y largo alcance."
          },
          learning: LEARNING_BY_AREA.aviones
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
          image: "assets/images/aviones/combate/F-35-Lightning-II.jpg",
          specs: {
            creator: "Lockheed Martin",
            power: "Motor Pratt & Whitney F135",
            topSpeed: "Aprox. Mach 1.6",
            records: "Uno de los cazas furtivos mas usados por aliados de Estados Unidos.",
            mainUse: "Ataque, defensa aerea, reconocimiento y guerra en red.",
            importance: "Representa la guerra moderna basada en sensores, informacion y coordinacion."
          },
          learning: {
            level: "Intermedio",
            keyConcepts: ["Stealth", "Sensores avanzados", "Multirrol", "Guerra en red"],
            questions: [
              "Que diferencia al F-35 de un caza tradicional?",
              "Por que sus sensores son tan importantes?",
              "En que se diferencia del F-22 Raptor?"
            ],
            funFact: "El casco del piloto muestra informacion avanzada y ayuda a interpretar datos del entorno.",
            summary: "El F-35 es clave porque combina sigilo, sensores, ataque y coordinacion digital."
          },
          history: [
            "El F-35 Lightning II es uno de los aviones de combate mas avanzados del mundo. Fue desarrollado por Lockheed Martin a partir del programa Joint Strike Fighter, iniciado en los anos 90 para crear un caza moderno, versatil y capaz de reemplazar varios aviones militares anteriores.",
            "Su importancia esta en que combina tecnologia furtiva, sensores avanzados y capacidad multirrol. Puede participar en misiones de ataque, defensa aerea, reconocimiento y coordinacion con otros sistemas militares, lo que lo convierte en una pieza clave de la guerra moderna basada en informacion.",
            "El F-35 cuenta con tres versiones principales: el F-35A para pistas convencionales, el F-35B para despegue corto y aterrizaje vertical, y el F-35C para operaciones desde portaaviones. Esta variedad permite que diferentes fuerzas armadas lo usen segun sus necesidades.",
            "Comparado con el F-22 Raptor, el F-35 es mas versatil y esta pensado como una plataforma todo en uno. El F-22, tambien desarrollado por Lockheed Martin junto a Boeing, esta mas especializado en superioridad aerea, con gran maniobrabilidad, velocidad y sigilo para dominar combates aire-aire.",
            "La diferencia clave es sencilla: el F-35 Lightning II representa un caza moderno y multifuncion, mientras que el F-22 Raptor es un caza mas especializado para combate aereo puro. Por eso el F-35 se exporta a paises aliados, mientras que el F-22 no se vende fuera de Estados Unidos."
          ]
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
