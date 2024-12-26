import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { SelectCom, SelectType } from "./ShadcnComps";
import { UserActivity } from "@/types";
import {
  addActivity,
  getCurrentUser,
  updateOthers,
  updateSalary,
} from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

export default function AddSalary() {
  const [error, setError] = useState("");
  const userData = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [activity, setActivity] = useState<UserActivity>({
    id: userData.email,
    type: "salary",
    period: "",
    salary: 0,
    hours: 0,
    createdAt: "",
  });
  const [period, setPeriod] = useState<string>("weekly");

  useEffect(() => {}, []);

  const handleChange = (e: any) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!activity.salary) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      await addActivity({ ...activity, hours: period == "weekly" ? 40 : 160 });
      await updateSalary(userData.email, activity.salary);
      toast({
        title: "Successfully added!",
        variant: "success",
      });
      setError("");
    } catch (err) {
      setError("Failed to add activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[500px] m-auto p-10">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 font-sora">
          Salary
        </label>
        <div className="mt-1 ">
          <Input
            type="number"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 font-sora">
          Period
        </label>

        <SelectType setPeriod={setPeriod} options={["Weekly", "Monthly"]} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a9567] hover:bg-[#7CA079FF]"
      >
        {loading ? "Adding Salaring..." : "Add Salary"}
      </button>
    </form>
  );
}
export function AddOvertimeAllowance() {
  const [error, setError] = useState("");
  const userData = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [activity, setActivity] = useState<UserActivity>({
    id: userData.email,
    type: "overtime",
    period: "",
    salary: 0,
    hours: 0,
    createdAt: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!activity.rate || !activity.hours) {
      setError("Please fill all fields");
      return;
    }

    try {
      await addActivity({
        ...activity,
        salary: activity.rate * activity.hours,
      });
      await updateOthers(userData.email, {
        type: activity.type,
        hours: activity.hours,
        rate: activity.rate,
      });
      toast({
        title: "Successfully added!",
        variant: "success",
      });
      setError("");
    } catch (err) {
      setError("Failed to add activity");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: any) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[500px] m-auto p-10">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 font-sora">
          Type
        </label>
        <SelectCom
          setPeriod={setActivity}
          period={activity}
          options={["Overtime", "Night Shift"]}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 font-sora">
          Hourly Rate
        </label>
        <div className="mt-1 ">
          <Input
            className="font-sora"
            type="number"
            name="rate"
            placeholder="/hr"
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3 font-sora">
          Total Time
        </label>
        <div className="mt-1 ">
          <Input
            className="font-sora"
            type="number"
            name="hours"
            placeholder="hr"
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a9567] hover:bg-[#799F76FF]"
      >
        {loading ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  );
}
