import BoardBanner from "@/components/board/board-banner";
import type { BoardSettingsSection } from "@/components/board/board-settings-sections";
import Loader from "@/components/shared/loader";
import { useBoard, useWorkspace } from "@/services";
import { IBoard } from "@/types/models";
import { SettingsIcon } from "lucide-react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  activeSection: BoardSettingsSection;
  pageTitle: string;
  children: (board: IBoard) => ReactNode;
};

const BoardSettingsShell = ({ activeSection, pageTitle, children }: Props) => {
  const router = useRouter();

  const workspaceIdParam = router.query.workspaceId;
  const boardIdParam = router.query.boardId;
  const workspaceId =
    router.isReady &&
    typeof workspaceIdParam === "string" &&
    workspaceIdParam.length > 0
      ? workspaceIdParam
      : null;
  const boardId =
    router.isReady &&
    typeof boardIdParam === "string" &&
    boardIdParam.length > 0
      ? boardIdParam
      : null;

  if (!router.isReady || workspaceId == null || boardId == null) {
    return (
      <div className="py-8">
        <Loader />
      </div>
    );
  }

  return (
    <BoardSettingsShellContent
      workspaceId={workspaceId}
      boardId={boardId}
      activeSection={activeSection}
      pageTitle={pageTitle}
    >
      {children}
    </BoardSettingsShellContent>
  );
};

function BoardSettingsShellContent({
  workspaceId,
  boardId,
  activeSection,
  pageTitle,
  children,
}: {
  workspaceId: string;
  boardId: string;
  activeSection: BoardSettingsSection;
  pageTitle: string;
  children: (board: IBoard) => ReactNode;
}) {
  const { workspace } = useWorkspace(workspaceId);
  const { board } = useBoard(workspaceId, boardId);

  return (
    <>
      <div>
        <BoardBanner board={board} settingsActiveSection={activeSection} />
        <div className="py-4">
          <span className="mb-4 flex items-center">
            <SettingsIcon size={20} className="mr-2" />
            <h2 className="text-lg font-semibold">{pageTitle}</h2>
          </span>
          <div className="pl-4">{children(board)}</div>
        </div>
      </div>
      <NextSeo
        title={`${board.name} — ${pageTitle}`}
        description={board.description ?? board.name}
        openGraph={{
          title: board.name,
          description: board.description,
          images: workspace?.avatar
            ? [{ url: workspace.avatar, alt: board.name }]
            : undefined,
        }}
      />
    </>
  );
}

export default BoardSettingsShell;
