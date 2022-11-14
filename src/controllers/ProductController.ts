import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { productsCollection } from '../config/collections';

const NAMESPACE = 'Products Controller';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create product called');

    const data = req.body;

    if (Array.isArray(data))
        return res.status(422).json({
            message: 'Product should not be array!'
        });

    if (!Object.keys(data).length)
        return res.status(422).json({
            message: 'Body is empty!'
        });

    await productsCollection
        .add(data)
        .then(() => {
            return res.status(201).json({
                message: 'Product Created!',
                product: data
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

const createBulkProducts = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create bulk products called');

    const data = req.body;

    if (!Array.isArray(data))
        return res.status(422).json({
            message: 'Products must be in array form!'
        });

    if (!data.length)
        return res.status(422).json({
            message: 'Body array is empty!'
        });

    try {
        data.forEach(async (product) => {
            await productsCollection.add(product);
        });
        return res.status(201).json({
            message: 'Bulk products created!',
            products: data
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get all products called');

    // @ts-ignore
    let all_products = [];

    await productsCollection
        .get()
        .then((products) => {
            // @ts-ignore
            const tempDoc = [];
            products.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() });
            });
            // @ts-ignore
            all_products = [...tempDoc];
        })
        .then(() => {
            return res.status(201).json({
                // @ts-ignore
                products: [...all_products]
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message
            });
        });
};

export default { createProduct, createBulkProducts, getAllProducts };
