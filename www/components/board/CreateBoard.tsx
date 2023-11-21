import { ImageIcon, MoreHorizontalIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const CreateBoard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircleIcon size={20} className="mr-2" /> Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Centralized board hub for streamlined collaboration.
          </DialogDescription>
        </DialogHeader>
        <h3 className="text-xs font-semibold text-gray-600">Background</h3>
        <div className="grid grid-cols-6 gap-3">
          <div className="aspect-square rounded-lg bg-red-400"></div>
          <div className="aspect-square rounded-lg bg-yellow-400"></div>
          <div className="aspect-square rounded-lg bg-blue-400"></div>
          <div className="aspect-square rounded-lg bg-pink-400"></div>
          <div className="aspect-square rounded-lg bg-purple-400"></div>
          <div className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-gray-200">
            <MoreHorizontalIcon size={16} />
          </div>
        </div>

        <label
          htmlFor="background-image"
          className="flex h-20 cursor-pointer items-center justify-center rounded-lg border border-border"
        >
          <ImageIcon size={20} className="text-muted-foreground" />
          <Input id="background-image" type="file" className="hidden" />
        </label>
        <h3 className="text-xs font-semibold text-gray-600">Name</h3>
        <Input placeholder="Workspace name" />
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
