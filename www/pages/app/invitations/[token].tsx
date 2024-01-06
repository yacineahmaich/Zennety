import { AppLayout } from "@/components/layouts";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { route } from "@/lib/routes";
import { useAcceptInvitation, useInvitation } from "@/services";
import { NextPageWithLayout } from "@/types/next";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CheckIcon, XIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const AcceptInvitation: NextPageWithLayout = () => {
  const router = useRouter();
  const { token } = router.query as { token: string };
  const { invitation } = useInvitation(token);
  const { acceptInvitation, isLoading } = useAcceptInvitation();

  if (!invitation) return;

  const onAccept = () => {
    acceptInvitation(
      { token: invitation.token },
      {
        onSuccess() {
          if (invitation.relatedType === "App\\Models\\Workspace") {
            router.push(route("workspace", invitation.related.id));
          }
          if (invitation.relatedType === "App\\Models\\Board") {
            router.push(route("board", invitation.related.id));
          }
        },
      }
    );
  };

  return (
    <div className="flex justify-center">
      <Card className="space-y-4 p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9 ring-2 ring-foreground ring-offset-2 ring-offset-background transition-all hover:shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-sm">
            {invitation?.invitedBy.name} invited to join
            <span className="ml-1 rounded-lg bg-accent p-1 font-medium">
              {invitation?.related.name}
            </span>
          </h2>
        </div>
        <p className="text-sm">{invitation?.message}</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={onAccept}
            disabled={isLoading}
          >
            <CheckIcon size={16} className="mr-1" /> Accept
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <XIcon size={16} className="mr-1" /> Reject
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const getServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

AcceptInvitation.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default AcceptInvitation;
