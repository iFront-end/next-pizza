import { FC, ReactNode } from 'react'
import { Checkbox } from '../ui/checkbox'

export interface FilterCheckboxProps {
  text: string
  value: string
  endAdornment?: ReactNode
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  disabled?: boolean
}

export const FacetCheckbox: FC<FilterCheckboxProps> = ({ text, value, endAdornment, onCheckedChange, checked, disabled }) => {
  const ID = `checkbox-${String(value)}`

  return (
    <div className="flex items-center gap-x-2">
      <Checkbox
        onCheckedChange={ onCheckedChange }
        checked={ checked }
        value={ value }
        disabled={ disabled }
        className="rounded-[8px] w-6 h-6"
        id={ ID }
      />
      <label htmlFor={ ID } className="leading-none cursor-pointer flex-1">
        { text }
      </label>
      { endAdornment }
    </div>
  );
};
