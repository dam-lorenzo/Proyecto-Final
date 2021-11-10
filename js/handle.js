// Modulo con funciones secundarias que agilizan 

export function _keys(item){
    /**
     * obtiene todos las keys de un object.
     */
    return Object.keys(item)
}

export function remove(array, item){
    /**
     * Elimina el item del array si es que el item esta en el array
     */
    const ind = array.indexOf(item) != -1
    if(ind > -1){
        array.splice(ind, 1)
    }
}

export function removeItems(array, items){
    /**
     * Elimina todos los items (debe ser un array tambien) dados del array.
     */
    for(const item of items){
        remove(array, item)
    }
}

export function isNum(val){
    /**
     * Verifica si el valor dado es un numero o no
     */
    return !isNaN(val)
}

export function _range(end, start = 0, step = 1){
    /**
     * Funciona como el range de python. Genera una lista de numeros hasta el numero end (no incluido),
     * se le puede pasar opcionalmente el inicio, y el paso de los numeros.
     */
    let number = start
    const ret = []
    while (!(number == end)){
        ret.push(number)
        number += step
    }
    return ret
}

export function isIn(array, item){
    /**
     * Verifica que el item este en el array
     */
    if (array.indexOf(item) != -1){
        return true
    }
    else {
        return false
    }
}

