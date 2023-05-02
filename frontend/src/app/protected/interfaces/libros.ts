import { Author } from "./author";

export interface Libros {
    _id: string
    nombre: string,
    sku: number,
    author: Author,
    precio: number,
    disponibilidad: boolean,
    sinopsis?: string,
    cantidad: number
}

export interface GetLibro {
    total: string;
    books: Libros[]
}

export interface FormLibro {
    nombre: string,
    author:string,
    disponibilidad: boolean,
    precio: number,
    sinopsis: string
}