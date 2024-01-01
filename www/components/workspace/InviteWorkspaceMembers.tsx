import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useInviteWorksapceMembers } from "@/services";
import { Role } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCogIcon, UserIcon, UserSearchIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { components } from "react-select";
import SelectAsync from "react-select/async";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  users: z.number().array().min(1, "Please chose some user(s) to invite them."),
  role: z.nativeEnum(Role),
  message: z.string(),
});

export type InviteMembers = z.infer<typeof formSchema>;

const InviteWorkspaceMembers = ({
  worksapce,
  openTrigger,
}: {
  worksapce?: App.Models.Workspace;
  openTrigger: JSX.Element;
}) => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const { inviteWorkspaceMembers, isLoading } = useInviteWorksapceMembers();

  const form = useForm<InviteMembers>({
    defaultValues: {
      users: [],
      role: Role.MEMBER,
      message: "Join this worksapce and let's work together.",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: InviteMembers) => {
    if (!worksapce) return;

    inviteWorkspaceMembers(
      { workspaceId: worksapce.id, data },
      {
        onSuccess() {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{openTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("invite-to-workspace-title")}</DialogTitle>
          <DialogDescription className="text-xs">
            {t("invite-to-workspace-subtitle")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="users"
              render={() => (
                <FormItem>
                  <FormControl>
                    <SelectAsync
                      isMulti
                      //@ts-ignore
                      getOptionValue={(value) => value}
                      //@ts-ignore
                      getOptionLabel={({ label, user }) =>
                        `${label} - ${user.email}`
                      }
                      classNames={{
                        control: (state) =>
                          cn(
                            "rounded-md !bg-background",
                            state.isFocused
                              ? "!border-2 !outline-none !shadow-none !border-ring"
                              : "!border-2 !border-transparent"
                          ),
                        container: (state) =>
                          "!border !border-input rounded-md",
                        multiValue: (state) =>
                          "!rounded !font-medium !uppercase !text-xs !bg-accent",
                        multiValueLabel: (state) => "!text-foreground",
                        multiValueRemove: (state) => "!hover:bg-red-500",
                        placeholder: (state) =>
                          "!text-sm !text-muted-foreground",
                        menu: (state) => "!bg-background !border-border",
                        menuList: (state) => "!divide-y",
                        noOptionsMessage: (state) =>
                          "!text-muted-foreground !text-sm !font-medium",
                        option: (state) =>
                          cn(
                            "!bg-transparent !hover:bg-accent !text-xs !font-semibold",
                            state.isFocused && "!bg-accent"
                          ),
                      }}
                      name="users"
                      placeholder="Email or username"
                      onChange={(value) => {
                        //@ts-ignore
                        const users = value.map<number>(({ user }) => user.id);
                        form.setValue("users", users);
                      }}
                      filterOption={(option) =>
                        //@ts-ignore
                        !form.watch("users").includes(option.value.user.id)
                      }
                      noOptionsMessage={() => t("invite-members-no-options")}
                      components={{
                        DropdownIndicator: (props) => (
                          <components.DropdownIndicator {...props}>
                            <UserIcon size={16} />
                          </components.DropdownIndicator>
                        ),
                        Option: (props) => {
                          //@ts-ignore
                          const value = props.value;
                          const { name, email } = value.user as App.Models.User;
                          return (
                            <div
                              className="flex cursor-pointer items-center gap-2 p-2 text-xs font-medium transition-colors hover:bg-accent focus:bg-accent"
                              {...props}
                              onClick={() => props.selectOption(value)}
                            >
                              <Avatar className="h-8 w-8 object-cover">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                  {name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="divide-x">
                                <span className="pr-2 uppercase">{name}</span>
                                <span className="pl-2 text-muted-foreground">
                                  {email}
                                </span>
                              </div>
                            </div>
                          );
                        },
                      }}
                      // TODO: debounce api request
                      loadOptions={(search) =>
                        searchUsers(search).then((users) =>
                          users.map((user) => ({
                            label: user.name,
                            user,
                          }))
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.ADMIN}>
                        <div className="flex items-center gap-2">
                          <UserCogIcon size={16} /> <span>{Role.ADMIN}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={Role.MEMBER}>
                        <div className="flex items-center gap-2">
                          <UserIcon size={16} /> <span>{Role.MEMBER}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value={Role.VIEWER}>
                        <div className="flex items-center gap-2">
                          <UserSearchIcon size={16} />{" "}
                          <span>{Role.VIEWER}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t(
                        "worksapce-invitation-message-placeholder"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" className="w-full" disabled={isLoading}>
              {t("send-invitation")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const searchUsers = async (search: string): Promise<App.Models.User[]> => {
  if (!search) return [];

  const response = await api.get(`/users/${search}`);

  return response.data.data;
};

export default InviteWorkspaceMembers;
