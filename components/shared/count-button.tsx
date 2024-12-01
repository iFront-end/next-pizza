import React from 'react';
import { cn } from '@/lib/utils';
import {Loader, Minus, Plus} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  onClick: (count: string) => void
  loading: boolean
  value?: number
  size?: 'sm' | 'lg'
  className?: string
}

export const CountButton: React.FC<Props> = ({ onClick, loading, className, value = 1, size = 'sm' }) => {
  const changeQuantity = (type: string) => {
    onClick(type)
  }

  return (
    <div className={
        cn('inline-flex items-center justify-center gap-3',
        {'opacity-60 pointer-events-none': loading}, className) }>
      <Button variant="outline"
              onClick={() => changeQuantity('minus') }
              disabled={ value === 1 } type='button'
              className={cn('p-0 hover:bg-primary hover:text-white',
                size === 'sm' ? 'w-[30px] h-[30px] rounded-sm' : 'w-[38px] h-[38px] rounded-se-md')}>
        <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
      </Button>
      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
      <Button
        variant="outline"
        onClick={() => changeQuantity('plus')}
        type='button'
        className={cn(
          'p-0 hover:bg-primary hover:text-white',
          size === 'sm' ? 'w-[30px] h-[30px] rounded-sm' : 'w-[38px] h-[38px] rounded-md',
        )}>
        <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
      </Button>
      { loading && <Loader className="w-5 h-5 animate-spin absolute" /> }
    </div>
  );
};
