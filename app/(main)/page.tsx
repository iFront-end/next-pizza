import { Title } from "@/components/shared/title"
import { Container } from "@/components/shared/container"
import { Facets, Listing, TopBar } from "@/components/shared"
import {FC, ReactElement, Suspense} from "react";
import {GetSearchParams} from "@/lib/find-pizzas";

type Props = {
  searchParams: Promise<GetSearchParams>
}

const HomePage: FC<Props> = async ({ searchParams }: { searchParams: Promise<GetSearchParams> }): Promise<ReactElement> => {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="2xl" className="font-extrabold mb-5" />
      </Container>
      <TopBar />
      <Container className="mt-9">
        <div className="flex items-start gap-x-12">
          <Suspense>
            <Facets className="w-[244px]"/>
          </Suspense>
          <Listing className="pt-7" searchParams={ await searchParams } />
        </div>
      </Container>
    </>
  )
}

export default HomePage
