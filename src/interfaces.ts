interface IProduct {
    id:number;
    name: string;
    price: number;
    weight: number;
    calories: number | null | undefined;
    section: string;
    expirationDate: Date;
}



export { IProduct } 