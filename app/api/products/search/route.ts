import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || ''
  const productsAll = await prisma.product.findMany()
  /*const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive'
      }
    },
    take: 5
  })*/
  return NextResponse.json(productsAll.filter(product => product.name.toLowerCase().includes(query.toLowerCase())))
}