import connectMongoDB from "@/libs/mongodb";
import ProductModel from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const { id } = params;
    const {newName: name, newImage: image, newPrice: price, newCategory: category} = await request.json();
    await ProductModel.findByIdAndUpdate(id, { name, image, price, category });
    return NextResponse.json({ message: "Product updated" }, {status: 200});
}

export async function GET(request, {params}) {
    const { id } = params;
    await connectMongoDB();
    const product = await ProductModel.findOne({ _id: id });
    return NextResponse.json({ product }, { status: 200 });
}