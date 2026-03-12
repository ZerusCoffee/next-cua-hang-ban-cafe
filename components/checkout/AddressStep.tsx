import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Address } from "@/types/address.type";
import { Home, MapPin, Phone, Plus, User } from "lucide-react";

interface AddressStepProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelect: (address: Address) => void;
  onAddNew: () => void;
}

export function AddressStep({
  addresses,
  selectedAddress,
  onSelect,
  onAddNew,
}: AddressStepProps) {
  return (
    <>
      <CardHeader className="bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl text-gray-900">
              Chọn địa chỉ giao hàng
            </CardTitle>
            <CardDescription>
              Chọn địa chỉ có sẵn hoặc thêm địa chỉ mới
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-4 mb-6">
          {addresses?.map((address) => (
            <div
              key={address.id}
              onClick={() => onSelect(address)}
              className={`relative overflow-hidden transition-all duration-300 rounded-lg border-2 cursor-pointer ${
                selectedAddress?.id === address.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
            >
              {address.is_default && (
                <Badge className="absolute top-2 right-2 bg-green-500">
                  Mặc định
                </Badge>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{address.full_name}</span>
                  <Phone className="h-4 w-4 text-gray-500 ml-2" />
                  <span className="text-gray-600">{address.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Home className="h-4 w-4 text-gray-500 mt-1" />
                  <p className="text-gray-700">{`${address.details}, ${address.ward}, ${address.province}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full border-2 border-dashed py-8"
          onClick={onAddNew}
        >
          <Plus className="h-5 w-5 mr-2" /> Thêm địa chỉ mới
        </Button>
      </CardContent>
    </>
  );
}
