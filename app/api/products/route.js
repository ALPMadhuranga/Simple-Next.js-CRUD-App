import connectMongoDB from "@/libs/mongodb";
import ProductModel from "@/models/ProductModel";
import { NextResponse } from "next/server";

// Get all products
export async function GET() {
    await connectMongoDB();
    const products = await ProductModel.find();
    return NextResponse.json({ products })
}

// create products
export async function POST(request) {
    const {name, image, price, category} = await request.json();
    await connectMongoDB();
    await ProductModel.create({ name, image, price, category});
    return NextResponse.json({message: "Product Created"}, {status: 201})
}

// Delete Product
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await ProductModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted"}, {status: 200})
}