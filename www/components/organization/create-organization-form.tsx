import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const createOrganizationFormSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(255).optional(),
});

export type CreateOrganizationFormValues = z.infer<
  typeof createOrganizationFormSchema
>;

type Props = {
  /** When false, form is disabled (e.g. submitting) */
  disabled?: boolean;
  /** Suggested default for name (e.g. `${user.name}'s Organization`) */
  nameDefault?: string;
  onSubmit: (values: CreateOrganizationFormValues) => void;
  submitLabel: string;
};

/**
 * Shared fields for creating an organization (onboarding modal + org switcher).
 */
export function CreateOrganizationForm({
  disabled,
  nameDefault,
  onSubmit,
  submitLabel,
}: Props) {
  const { t } = useTranslation("common");

  const form = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationFormSchema),
    defaultValues: {
      name: "My Organization",
    },
  });

  useEffect(() => {
    if (nameDefault) {
      form.setValue("name", nameDefault);
    }
  }, [nameDefault, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        id="create-organization-form"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("organization-name")}</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  disabled={disabled}
                  placeholder={t("organization-name-placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("organization-description-placeholder")}
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={disabled}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
