import React from "react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";

interface ConsumerUserMenuProps {
  onInvite: () => void;
}

const ConsumerUserMenu: React.FC<ConsumerUserMenuProps> = ({ onInvite }) => {
  const { logout } = useAuth();
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onInvite}>
        <UserPlus className="h-4 w-4 mr-2" />
        Invite People
      </DropdownMenuItem>
      {/* logout option */}
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={logout}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </DropdownMenuItem>
    </>
  );
};

export default ConsumerUserMenu;
