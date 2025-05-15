
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for check-in/check-out history
export const mockHistory = [
  { id: 1, memberId: "A12345", memberName: "John Smith", type: "check-in", timestamp: "2025-05-12T08:15:23" },
  { id: 2, memberId: "B67890", memberName: "Sarah Johnson", type: "check-in", timestamp: "2025-05-12T09:30:45" },
  { id: 3, memberId: "A12345", memberName: "John Smith", type: "check-out", timestamp: "2025-05-12T10:45:12" },
  { id: 4, memberId: "C13579", memberName: "Michael Brown", type: "check-in", timestamp: "2025-05-12T11:05:38" },
  { id: 5, memberId: "B67890", memberName: "Sarah Johnson", type: "check-out", timestamp: "2025-05-12T12:15:27" },
  { id: 6, memberId: "D24680", memberName: "Emily Davis", type: "check-in", timestamp: "2025-05-12T13:22:56" },
  { id: 7, memberId: "C13579", memberName: "Michael Brown", type: "check-out", timestamp: "2025-05-12T14:10:33" },
  { id: 8, memberId: "E97531", memberName: "Alex Wilson", type: "check-in", timestamp: "2025-05-12T15:05:19" },
];

interface CheckInHistoryProps {
  history?: typeof mockHistory;
}

const CheckInHistory: React.FC<CheckInHistoryProps> = ({ history = mockHistory }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-athdark">Member Activity History</h2>
        <Badge variant="outline" className="bg-athblue/10 text-athblue px-3 py-1">
          <Clock className="w-4 h-4 mr-1" />
          Today's Activity
        </Badge>
      </div>
      
      <div className="bg-white rounded-lg border shadow-md overflow-hidden">
        <ScrollArea className="h-[320px]">
          <Table>
            <TableHeader className="bg-gradient-to-r from-athblue/5 to-athblue/10">
              <TableRow>
                <TableHead className="w-[180px]">Member</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right"><Calendar className="inline mr-1 h-4 w-4" />Date</TableHead>
                <TableHead className="text-right"><Clock className="inline mr-1 h-4 w-4" />Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No activity recorded today
                  </TableCell>
                </TableRow>
              ) : (
                history.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-athblue/20 flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-athblue" />
                        </div>
                        <div>
                          <div className="font-medium">{entry.memberName}</div>
                          <div className="text-xs text-muted-foreground">{entry.memberId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {entry.type === "check-in" ? (
                        <Badge className="bg-athgreen text-white hover:bg-athgreen/90">Check In</Badge>
                      ) : (
                        <Badge className="bg-athred text-white hover:bg-athred/90">Check Out</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatTime(entry.timestamp)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CheckInHistory;
