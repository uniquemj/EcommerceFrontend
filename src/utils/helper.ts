import { OrderStatus,} from "@/types/order.types"

export const upperCase = (word: string) =>{
    return word[0].toUpperCase() + word.slice(1)
}

export const getInitialName = (word: string):string =>{
    const wordArray = word.split(" ")
    const result = wordArray[0][0].toUpperCase()+wordArray[1][0].toUpperCase()
    return result
}

export const getFormalStatus = (order_status: string):string=>{
      const orderStatus = Object.entries(OrderStatus)
      const statusIndex = orderStatus.find((pair)=>pair[1] === order_status)
      const obtainStatus = statusIndex?.[0]
      return obtainStatus as string
}