'use client'

import {FC, ReactElement, useEffect, useState} from "react"
import { cn } from "@/lib/utils"
import { Title } from "@/components/shared"
import { FacetRange } from "@/components/shared"
import { FacetsGroup } from "@/components/shared"
import {Api} from "@/services/api-client";
import {FilterCheckboxProps} from "@/components/shared/facet-checkbox";

interface Props {
  className?: string
}

export const Facets: FC<Props> = ({ className }): ReactElement => {
  const [ingredients, setIngredients] = useState<FilterCheckboxProps[]>([])

  useEffect(() => {
    const getIngredients = async () => {
      return await Api.IngredientsService.GET();
    }
    getIngredients().then(data => {
      setIngredients(data.map(item => ({value: item.id.toString(), text: item.name})))
    })
  }, []);

  return (
    <div className={cn('', className)}>
      <Title text='Фильтрация' size="sm" className="mb-7 font-bold" />

      <FacetsGroup items={[
        { text: '20 см', value: '20' },
        { text: '30 см', value: '30' },
        { text: '40 см', value: '40' }
      ]} title="Размеры" name="sizes" />

      <div className="my-6 border-y border-gray-100 pt-6 pb-7">
        <Title text='Цена от и до' size="xs" className="mb-7 font-bold" />
        <FacetRange />
      </div>

      <FacetsGroup items={ ingredients }
                   searchPlaceholder='Поиск...'
                   title='Ингредиенты:' limit={ 6 }
                   name="ingredients" />
    </div>
  )
}