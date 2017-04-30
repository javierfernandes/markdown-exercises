# Lists

For each excersice create a file with a single default function.
The function parameters depend on the excercise.
For example it could receive a single array/list

# Map

Given a list of numbers get a list of their doubles.
For example

```js test
// test
fn([1, 2, 3, 4]).should.deep.equal([2, 4, 6, 8])
```

# Ejercicio seres vivos

Vamos a trabajar con una lista de objetos.
Estos objetos tienen un cierto significado, cada uno representa una categoría de los seres vivos (como vimos
en biografía, en el cole, vio ?)
El chiste es que esto es por naturaleza un **arbol**. Sin embargo en nuestro ejercicio vamos a tener las categorías
**normalizadas**, es decir como __aplanadas__, cada una es un elemento de la lista.

// TODO

Ejemplo

[
 { titulo: ‘Seres Vivos’, nivel: 0 },

 { titulo: ‘Animales’, nivel: 1, padre: ‘Seres Vivos’ },
 { titulo: ‘Vegetales’, nivel: 1, padre: ‘Seres Vivos’ },
 { titulo: ‘Minerales’, nivel: 1, padre: ‘Seres Vivos’ },

 
 { titulo: ‘Vertebrados’, nivel: 2, padre: ‘Animales’ },
 { titulo: ‘Invertebrados’, nivel: 2, padre: ‘Animales’ },

 { titulo: ‘Peces’, nivel: 3, padre: ‘Vertebrados’ },
 { titulo: ‘Reptiles’, nivel: 3, padre: ‘Vertebrados’ },
 { titulo: ‘Anfibios’, nivel: 3, padre: ‘Vertebrados’ },
 { titulo: ‘Aves’, nivel: 3, padre: ‘Vertebrados’ },
 { titulo: ‘Mamiferos’, nivel: 3, padre: ‘Vertebrados’ },
]

Dos versiones del ejercicios de acuerdo al “formato” de objeto salida esperado.

# Estructurada

Primero una opción un poco más “estructurada”

{ 
   titulo: ‘Seres Vivos’,
   hijos: [
        {
		‘
   ]
}

# Menos Verbosa

Algo así

```
