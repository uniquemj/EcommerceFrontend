import  { useState } from 'react'
import { useCreateAddress, useGetActiveAddress, useGetAddressListOfCustomer, useUpdateActiveAddress } from '@/hooks/shipment.hooks';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import ShipmentDisplay from './ShipmentDisplay';
import { SheetClose } from '../ui/sheet';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';
import ShipmentForm from './ShipmentForm';
import type { AddressType } from '@/validations/shipment.validate';

export function AddressSelectionSheet() {
  const { data: addresses, refetch: refetchAddresses } = useGetAddressListOfCustomer({ page: 0, limit: 0 });
  const { data: activeAddress } = useGetActiveAddress();
  const { mutate: updateActiveAddress, isPending: isUpdating } = useUpdateActiveAddress();
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();
  
  const [selectedAddressId, setSelectedAddressId] = useState(activeAddress?.data?._id || '');
  const [showNewForm, setShowNewForm] = useState(false);

  const handleSave = () => {
    if (selectedAddressId) {
      updateActiveAddress(selectedAddressId);
    }
  };

  const handleCreateAddress = (newAddressData: AddressType) => {
    createAddress(newAddressData, {
      onSuccess: (data) => {
        refetchAddresses();
        setSelectedAddressId(data.data._id);
        setShowNewForm(false);
      }
    });
  };

  if (showNewForm) {
    return (
      <div className="space-y-4 px-space-24 py-space-24">
        <Button 
          variant="ghost" 
          onClick={() => setShowNewForm(false)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={12}/> Back to addresses
        </Button>
        
        <ShipmentForm 
          onSuccess={handleCreateAddress}
          isLoading={isCreating}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-space-24 py-space-24">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Select Shipping Address</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <RadioGroup
        value={selectedAddressId}
        onValueChange={setSelectedAddressId}
        className="space-y-3 max-h-[400px] overflow-y-auto"
      >
        {addresses?.data?.map((address) => (
          <div key={address._id} className="flex items-center space-x-3">
            <RadioGroupItem 
              value={address._id} 
              id={`address-${address._id}`}
              className='border-secondary-color'
            />
            <Label htmlFor={`address-${address._id}`} className="w-full cursor-pointer">
              <div className={`p-4 border rounded-lg ${
                selectedAddressId === address._id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-gray-200'
              }`}>
                <ShipmentDisplay shipmentInfo={address} />
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <SheetClose asChild>
        <Button 
          onClick={handleSave}
          disabled={isUpdating || !selectedAddressId}
          className="w-full mt-4"
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Use This Address'
          )}
        </Button>
      </SheetClose>
    </div>
  );
}


export default AddressSelectionSheet