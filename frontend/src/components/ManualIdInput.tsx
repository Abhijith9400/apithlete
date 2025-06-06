import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ManualIdProps {
  onSuccessCheckIn: (member: {
    fullName: string;
    membershipID: string;
    date: string;
    loginTime: string;
  }) => void;
}

const ManualId: React.FC<ManualIdProps> = ({ onSuccessCheckIn }) => {
  const [memberIdInput, setMemberIdInput] = useState("");
  const [checking, setChecking] = useState(false);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedId = memberIdInput.trim();

    if (!trimmedId) {
      toast.error("Please enter a member ID");
      return;
    }

    setChecking(true);

    try {
      const response = await fetch(`http://localhost:5000/api/attendance/checkin/${trimmedId}`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.member) {
        toast.error(result.message || "Member not found or check-in failed!");
        return;
      }

      toast.success(`✅ ${result.member.fullName} (${result.member.membershipID}) successfully checked in!`);

      // Notify parent component about the new check-in
      onSuccessCheckIn({
        fullName: result.member.fullName,
        membershipID: result.member.membershipID,
        date: result.date, // ensure backend sends these or parse from timestamp
        loginTime: result.loginTime,
      });

      setMemberIdInput("");
    } catch (err) {
      console.error("Error during check-in:", err);
      toast.error("Something went wrong during check-in.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <form onSubmit={handleCheckIn} className="flex gap-2 items-center mb-6">
      <label htmlFor="memberId" className="sr-only">
        Member ID
      </label>
      <input
        id="memberId"
        type="text"
        placeholder="Enter Member ID"
        value={memberIdInput}
        onChange={(e) => setMemberIdInput(e.target.value)}
        disabled={checking}
        className="border px-4 py-2 rounded flex-grow"
        autoComplete="off"
        aria-required="true"
        aria-disabled={checking}
      />
      <button
        type="submit"
        disabled={checking}
        className="bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {checking ? "Checking..." : "Submit"}
      </button>
    </form>
  );
};

export default ManualId;
