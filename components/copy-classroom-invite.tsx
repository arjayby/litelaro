"use client";

import { Copy, Hash, Link } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CopyClassroomInviteProps {
  code: string;
}

export function CopyClassroomInvite({ code }: CopyClassroomInviteProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied code to clipboard");
  };

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/invite/${code}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied invite URL to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Copy />
          Copy
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={handleCopyCode} className="cursor-pointer">
          <Hash />
          Copy Code
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyUrl} className="cursor-pointer">
          <Link />
          Copy Invite URL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
