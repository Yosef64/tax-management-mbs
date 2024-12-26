import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserActivity } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getCurrentUser, setCurrentUser, updateTaxInfo } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
interface SelectProps {
  setPeriod: React.Dispatch<React.SetStateAction<any>>;
  period?: UserActivity;
  options: string[];
}

export function SelectCom({ setPeriod, period, options }: SelectProps) {
  return (
    <Select onValueChange={(value) => setPeriod({ ...period, type: value })}>
      <SelectTrigger className="w-[180px] font-sora">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem
              className="font-sora"
              key={index}
              value={(() => {
                const list = option.split(" ");
                const customString = list
                  .map((st, index) => {
                    if (index == 0) return st.toLowerCase();
                    return st;
                  })
                  .join("");
                return customString;
              })()}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectType({ setPeriod, options }: SelectProps) {
  return (
    <Select
      onValueChange={(value) => {
        setPeriod(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function EditTax() {
  const [tax, setTax] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const userData = getCurrentUser();
  const hanldeTaxEdit = async () => {
    setLoading(true);
    try {
      await updateTaxInfo(userData.email, tax);
      setOpen((open) => !open);
      window.location.href = "/dashboard";
    } catch (erro) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog modal={true} open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="text-[#6a9567] hover:text-[#6a9567]"
        >
          Edit Tax
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tax</DialogTitle>
          <DialogDescription>
            Make changes to tax rate. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-base font-sora">
              Tax Rate
            </Label>
            <Input
              id="name"
              type="number"
              defaultValue="0"
              placeholder="Rate"
              className="col-span-3"
              onChange={(e) => setTax(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        <DialogFooter>
          {/* <DialogClose asChild> */}
          <Button
            className="bg-red-600 hover:bg-red-400"
            onClick={() => {
              setOpen(false);
              setLoading(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={hanldeTaxEdit}
            className="bg-[#6a9567] hover:bg-[#7C9D7AFF]"
            type="submit"
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function LogoutDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    setCurrentUser({ name: "", email: "" });
    navigate("/");
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={handleOpen}
          className="bg-[#6a9567] hover:bg-[#7C9D7AFF]"
        >
          Log Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-sora">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-sora">
            This action cannot be undone. This will log you out by pressing the
            continue buttom
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#6a9567] hover:bg-[#82AC7FFF]"
            onClick={handleLogout}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
