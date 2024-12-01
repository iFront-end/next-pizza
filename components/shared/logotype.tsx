import {FC, memo, ReactElement} from 'react'
import { cn } from '@/lib/utils'
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string
}

const mLogo: FC<Props> = ({ className }): ReactElement => {
  return (
    <Link href="/" className={ cn(className) }>
      <Image src="/logo.svg" alt="Next Pizza"
             priority={true} width={202} height={51} />
    </Link>
  )
}

export const Logo = memo(mLogo)