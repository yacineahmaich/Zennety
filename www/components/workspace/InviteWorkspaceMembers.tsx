import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useInviteWorksapceMembers } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { components } from "react-select";
import Select from "react-select/async";
import { z } from "zod";
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
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  users: z.number().array().min(1, "Please some user(s) to invite them."),
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
  const { inviteWorkspaceMembers, isLoading } = useInviteWorksapceMembers();

  const form = useForm<InviteMembers>({
    defaultValues: {
      users: [],
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
          toast({
            title: "Invitations sent successufully",
            description: "Waiting for users to accept your invitation",
          });
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{openTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("invite-to-worksapce-title")}</DialogTitle>
          <DialogDescription className="text-xs">
            {t("invite-to-worksapce-subtitle")}
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
                    <Select
                      isMulti
                      //@ts-ignore
                      getOptionValue={({ label, user }) =>
                        `${label} - ${user.email}`
                      }
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
                        menu: (state) => "!bg-background !border",
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
                      components={{
                        DropdownIndicator: (props) => (
                          <components.DropdownIndicator {...props}>
                            <UserIcon size={16} />
                          </components.DropdownIndicator>
                        ),
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
