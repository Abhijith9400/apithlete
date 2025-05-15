
// Mock member data - This would be fetched from an API in a real application
export const mockMembers = [
  { id: "A12345", name: "John Smith", membership: "Premium", status: "active" as const, qrData: "apiathlete-member-A12345" },
  { id: "B67890", name: "Sarah Johnson", membership: "Standard", status: "active" as const, qrData: "apiathlete-member-B67890" },
  { id: "C13579", name: "Michael Brown", membership: "Premium", status: "inactive" as const, qrData: "apiathlete-member-C13579" },
  { id: "D24680", name: "Emma Wilson", membership: "Premium", status: "active" as const, qrData: "apiathlete-member-D24680" },
  { id: "E35791", name: "David Lee", membership: "Standard", status: "active" as const, qrData: "apiathlete-member-E35791" },
  { id: "F46802", name: "Lisa Garcia", membership: "Premium", status: "active" as const, qrData: "apiathlete-member-F46802" },
  { id: "G57913", name: "Robert Taylor", membership: "Standard", status: "inactive" as const, qrData: "apiathlete-member-G57913" },
];

// Export the list of active member QR codes for testing purposes
export const getTestMemberQrCodes = () => {
  return mockMembers
    .filter(member => member.status === "active")
    .map(member => ({
      id: member.id,
      name: member.name,
      qrData: member.qrData
    }));
};

export interface Member {
  id: string;
  name: string;
  membership: string;
  status: "active" | "inactive";
  qrData: string;
}

export const findMemberByQrData = (qrData: string): Member | undefined => {
  return mockMembers.find(m => m.qrData === qrData);
};

// New function to find member by ID
export const findMemberById = (id: string): Member | undefined => {
  return mockMembers.find(m => m.id.toLowerCase() === id.toLowerCase());
};
