import { Request, Response } from "express";
import { Book } from "../models/book";
import { PostAuthorsDTO } from "../dtos/postAuthors.dto";
import { Usuario } from "../interface/usuarios";
import { Author } from "../models/author";



export const findBooks = async(req: Request, res: Response) => {
    const [total, books] = await Promise.all([
        Book.countDocuments(),
        Book.find().populate('author'),//populate llena la data en base a una relacion
    ]);
    res.json({ total, books })
};

export const findBookID = async(req: Request, res: Response) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate('author', 'nombre');
    res.json(book)
}

export const postBook = async(req: Request, res: Response) => {
    const { nombre, sku, usuario, author, ...body } = req.body;

    const existeBookDB = await Book.findOne({$or:[{nombre}, {sku}]});
    
    if(existeBookDB) {
        if(existeBookDB?.nombre === nombre){
            return res.status(400).json({
                msg: `El libro: ${existeBookDB?.nombre}, ya existe`
            });
        } else {
            return res.status(400).json({
                msg: `El SKU: ${existeBookDB?.sku}, ya existe`
            });
        }
    };

    const user: Usuario = (req as any).usuario;
    const data: PostAuthorsDTO = {
        ...body,
        author: author,
        nombre: nombre.toUpperCase(),
        sku,
        usuario: user._id 
    };

    const book = new Book(data);
    const savedBook = await book.save();
    const populatedBook = await Book.findOne({ _id: savedBook._id }).populate('author')
    res.json(populatedBook);
};

export const putBook = async(req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if( data.nombre ){
            data.nombre = data.nombre.toUpperCase();
        }
        const book = await Book.findByIdAndUpdate(id, data, {new:true}).populate('author');
        res.json(book);  
        
    } catch (error) {
        throw new Error('Error en el ID del Autor')
    }    

};

export const deleteBook = async(req: Request, res: Response) => {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id, {new:true})
    res.status(200).json(deleteBook)
}