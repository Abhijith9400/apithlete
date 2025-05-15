
import React, { useState } from "react";
import { toast } from "sonner";
import { findMemberById } from "@/services/memberService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdCard, ArrowRightCircle } from "lucide-react";

interface ManualIdInputProps {
  onMemberFound: (memberData: any, isCheckin: boolean) => void;
  checkedInMembers: Record<string, boolean>;
}

const ManualIdInput: React.FC<ManualIdInputProps> = ({ 
  onMemberFound, 
  checkedInMembers 
}) => {
  const [memberId, setMemberId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!memberId.trim()) {
      toast.error("Please enter a Member ID");
      return;
    }

    const member = findMemberById(memberId.trim());
    
    if (member) {
      if (member.status === "active") {
        // Check if member is already checked in
        const isCheckedIn = checkedInMembers[member.id] === true;
        
        if (isCheckedIn) {
          toast.success(`${member.name} checked out successfully`);
          onMemberFound(member, false); // false means check-out
        } else {
          toast.success(`${member.name} checked in successfully`);
          onMemberFound(member, true); // true means check-in
        }
      } else {
        toast.error(`Membership inactive: ${member.name}`);
      }
    } else {
      toast.error("Member ID not found");
    }

    // Clear input field after submission
    setMemberId("");
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg border border-athgray/20">
      <CardHeader className="bg-gradient-to-r from-athgreen/5 to-athgreen/10 pb-3">
        <CardTitle className="flex items-center gap-2 text-athgreen text-lg">
          <IdCard className="h-5 w-5" />
          <span>Manual Member ID Entry</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4 relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter Member ID (e.g. A12345)"
              className="flex-1 border-athgray/30 focus-visible:ring-athgreen/40"
              autoComplete="off"
            />
            <Button 
              type="submit"
              className="bg-athgreen hover:bg-athgreen/90 text-white"
            >
              <ArrowRightCircle className="w-4 h-4 mr-1" />
              Submit
            </Button>
          </div>
          <p className="text-xs text-athgray/80 mt-1">
            Enter a member ID to check in or check out
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManualIdInput;
