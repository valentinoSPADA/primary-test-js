//personas va a ser el arreglo que se va a completar con las personas y sus direcciones...

const personas = []

// Aca me traigo la informacion basica de cada persona: nombre, apellido y id.

const list = async (persons) => {
    let responseA = await fetch('http://localhost/listPersonaA')
    let resA = await responseA.json()
    let responseB = await fetch('http://localhost/listPersonaB')
    let resB = await responseB.json()
    return persons = resA.concat(resB).flat()
}

// En completePersons hago todo lo que refiere a completar la direccion y dejar a cada persona (objeto que pertenece al arreglo)
// que quede con todas las propiedades necesarias para el uso de un user o admin en la app

const completePersons = async (persons) => {
    
    //Me traigo la lista de codigos postales
    
    let listaCPJSON = await fetch(`http://localhost/listaCP`)
    let listaCP = await listaCPJSON.json()


    let result = persons?.map(async (p) => {
        //Me traigo la direccion de un user
        try {
            let direcPersonaJSON = await fetch(`http://localhost/listaDireccionC?personaId=${p.id}`)
            let direcPersona = await direcPersonaJSON.json()

            // En este if, veo si el usuario tiene la propiedad calle, si tiene calle, va a comparar su calle, ciudad y provincia
            // con las calles, ciudades y provincias de la lista de codigos postales. Como filter devuelve un arreglo,
            // accedo a la propiedad [0] y a su prop codigoPostal. Con eso ya puedo completar al 100% la info del user

            if (direcPersona.hasOwnProperty('calle')) {
                let CP = listaCP?.filter(cp => cp.calle + cp.ciudad + cp.provincia === direcPersona.calle + direcPersona.ciudad + direcPersona.provincia)[0].codigoPostal
                const finalPerson = {
                    ...p, direccion: {
                        calleAltura: `${direcPersona.calle} ${direcPersona.altura}`,
                        ciudad: direcPersona.ciudad,
                        provincia: direcPersona.provincia,
                        codigoPostal: CP,
                        pais: direcPersona.pais
                    }
                }
                return finalPerson


                // Si el user no tiene propiedad 'Calle', se le ponen unos valores predeterminados
            } else {
                const finalPerson = {
                    ...p, direccion: {
                        calleAltura: `Calle Falsa 123`,
                        ciudad: "Azul",
                        provincia: "Buenos Aires",
                        codigoPostal: "1234",
                        pais: "Argentina"
                    }
                }
                return finalPerson

            }
        }
        catch (error) {
            console.log(error)
        }
    })
    return persons = result
}


// En esta funcion cargo todas las personas directamente. En este caso el parametro sera siempre el mismo
// depende lo que busque el cliente se puede modificar el parametro para que sea mas escalable y reutilizable

const cargarPersonas = async () => {
    await list(personas);
    await completePersons(personas);
}
