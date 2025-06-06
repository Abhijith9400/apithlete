import React, { useEffect, useState } from 'react';
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the type of each entry from backend
interface HistoryEntry {
  id: number;
  memberId: string;
  memberName: string;
  type: 'check-in' | 'check-out';
  timestamp: string;
}

const CheckInHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance/all');
      const result = await response.json();

      const transformed: HistoryEntry[] = [];

      result.attendance.forEach((record: any, index: number) => {
        // Push check-in
        transformed.push({
          id: index * 2,
          memberId: record.membershipID,
          memberName: record.fullName,
          type: 'check-in',
          timestamp: `${record.date}T${record.loginTime}`
        });

        // Push check-out (if exists)
        if (record.logoutTime) {
          transformed.push({
            id: index * 2 + 1,
            memberId: record.membershipID,
            memberName: record.fullName,
            type: 'check-out',
            timestamp: `${record.date}T${record.logoutTime}`
          });
        }
      });

      // Optional: sort by latest first
      transformed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setHistory(transformed);
    } catch (error) {
      console.error('Error fetching check-in history:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchHistory();
}, []);


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
                <TableHead className="text-right">
                  <Calendar className="inline mr-1 h-4 w-4" />
                  Date
                </TableHead>
                <TableHead className="text-right">
                  <Clock className="inline mr-1 h-4 w-4" />
                  Time
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : history.length === 0 ? (
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
                      {entry.type === 'check-in' ? (
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
