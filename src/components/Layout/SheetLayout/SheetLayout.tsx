
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'

interface SheetLayoutProps{
    header: string,
    description: string,
    button: React.ReactNode,
    children: React.ReactNode
}

const SheetLayout = ({header, description, button, children}: SheetLayoutProps) => {
  return (
    <div>
        <Sheet>
                <SheetTrigger asChild>
                  {button}
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle>{header}</SheetTitle>
                    <SheetDescription>
                      {description}
                    </SheetDescription>
                  </SheetHeader>
                  {children}
                </SheetContent>
              </Sheet>
    </div>
  )
}

export default SheetLayout