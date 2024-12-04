import React from "react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserPlus } from "lucide-react";

interface BrandUserMenuProps {
  onInvite: () => void;
}

const BrandUserMenu: React.FC<BrandUserMenuProps> = ({ onInvite }) => {
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onInvite}>
        <UserPlus className="h-4 w-4 mr-2" />
        Invite People
      </DropdownMenuItem>
      {/* Add more consumer-specific menu items here */}
    </>
  );
};

export default BrandUserMenu;
