import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetCompletedOrderStat } from "@/hooks/order.hooks"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

export const description = "A line chart showing order statistics"

const chartConfig = {
  totalQuantity: {
    label: "Order Quantity",
    color: "var(--chart-1)",
  },
  totalSale: {
    label: "Total Sale",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function DashboardLineChart() {
  const { data: orderSummaryData } = useGetCompletedOrderStat()

  // Format the date for better display
  const formattedData = orderSummaryData?.data?.map(item => ({
    ...item,
    shortDate: item._id, // or format as needed: item._id.split('-').slice(1).join('/')
  }))

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Order Statistics</CardTitle>
        <CardDescription>Order quantity and sales by date</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="_id"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Line
                type="monotone"
                dataKey="totalQuantity"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Quantity"
              />
              <Line
                type="monotone"
                dataKey="totalSale"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Total Sale"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}