import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCustomerProfile } from '@/hooks/customer.hooks'
import { useAuth } from '@/store/auth.store'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Calendar, Check, Key, Mail, Phone, User } from 'lucide-react'

export const Route = createFileRoute('/customer/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const {initials, fullname, email} = useAuth()
  const {data: customer} = useGetCustomerProfile()
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
  {/* Header Section */}
  <div className="mb-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
      Customer Profile
    </h1>
    <Separator className="mt-3 bg-gray-200" />
  </div>

  {/* Profile Card */}
  <Card className="p-6 sm:p-8 shadow-sm rounded-lg">
    <div className="flex flex-col items-center gap-8">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-32 w-32 sm:h-40 sm:w-40 bg-secondary-50">
          <AvatarFallback className="text-4xl sm:text-5xl font-semibold text-secondary-shade-normal bg-secondary-50 rounded-lg">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Info */}
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {fullname}
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{email}</span>
            {customer?.data.is_email_verified && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <Check className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {customer?.data.phone_number && (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customer.data.phone_number}</span>
            </div>
          )}

          {customer?.data.date_of_birth && (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>DOB: {customer.data.date_of_birth.split('T')[0]}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
          <Link to="/customer/profile/update" className="w-full sm:w-auto">
            <Button className="w-full hover:bg-secondary-shade-normal bg-secondary-color hover:cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
          <Link to="/customer/update-password" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-secondary-shade-normal text-secondary-shade-normal hover:bg-secondary-50 hover:cursor-pointer hover:text-secondary-shade-normal">
              <Key className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Card>
</div>
  )
}
