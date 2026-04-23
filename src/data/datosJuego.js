const habilidades = [

    {
        id: 1,
        nombre: 'Espadazo',
        descripcion: 'Un ataque poderoso con la espada.',
        incremento_ataque: 10,
        incremento_defensa: 0,
        incremento_estamina: -5,
    },

    {
        id: 2,
        nombre: 'Escudo de Hierro',
        descripcion: 'Aumenta la defensa del guerrero.',
        incremento_ataque: 0,
        incremento_defensa: 15,
        incremento_estamina: -3,
    },
    {
        id: 3,
        nombre: 'Mega vergon',
        descripcion: 'Aumenta el daño de la pipichetada.',
        incremento_ataque: 25,
        incremento_defensa: 0,
        incremento_estamina: -8,
    },
    {
        id: 4,
        nombre: 'Rayo homosexualizador',
        descripcion: 'Dispara un rayo homosexualizador.',
        incremento_ataque: 50,
        incremento_defensa: -10,
        incremento_estamina: -15,
    },
    {
        id: 5,
        nombre: 'Caparazón de armadillo',
        descripcion: 'Te da un boost en defensa temporal.',
        incremento_ataque: -10,
        incremento_defensa: 50,
        incremento_estamina: -15,
    },
    {
        id: 6,
        nombre: 'Sócrates: El Sabio',
        descripcion: '"Si tu poder son las habilidades, qué eres tú sin ellas."',
        incremento_ataque: 25,
        incremento_defensa: 25,
        incremento_estamina: -30,
    },
    // Agrega al menos 4 habilidades más.

];

const personajes = [

    {
        id: 1,
        nombre: 'Gagh-Ar',
        tipo: 'guerrero',
        descripcion: 'Un valiente luchador con gran fuerza física.',
        ataque: 80, defensa: 70, estamina: 60,
        habilidades: [1, 2, 5],
    },

    {
        id: 2,
        nombre: 'Elyra',
        tipo: 'maga',
        descripcion: 'Hechicera con gran dominio de la energía mágica.',
        ataque: 65, defensa: 40, estamina: 90,
        habilidades: [2, 4],
    },

    {
        id: 3,
        nombre: 'JuanManuel',
        tipo: 'furro',
        descripcion: 'Furro con gran traje peludo.',
        ataque: 40, defensa: 60, estamina: 70,
        habilidades: [2,3],
    },
     {
        id: 4,
        nombre: 'La mamá de...',
        tipo: 'tanque',
        descripcion: 'Señora con mucho peso.',
        ataque: 25, defensa: 120, estamina: 50,
        habilidades: [2,5],
    },
     {
        id: 5,
        nombre: 'Wu',
        tipo: 'monje',
        descripcion: 'Monje sabio.',
        ataque: 60, defensa: 60, estamina: 120,
        habilidades: [6],
    },
     {
        id: 6,
        nombre: 'He-man',
        tipo: 'Exhibicionista',
        descripcion: 'Es un exhicibionista experto en la lucha.',
        ataque: 65, defensa: 40, estamina: 90,
        habilidades: [1,3,4],
    },
    // Agrega al menos 4 personajes más.
];


module.exports = { personajes, habilidades };