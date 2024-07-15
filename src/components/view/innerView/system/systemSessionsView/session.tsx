import { Delete, Edit, OpenInNew } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { openTab } from "../../../../../store/slices/tabsSlice";
import {
  deleteSession as deleteSessionAction,
  renameSession as renameSessionAction,
} from "../../../../../store/slices/sessionsSlice";
import { SessionModel } from "../../../../../store/utils/sessionUtils";
import { formatToJapaneseDate } from "../../../../../utils/formatToJapaneseDate";
import { Button } from "../../../../common/button/button";
import { ContentIdBadge } from "../../../../common/contentIdBadge/contentIdBadge";
import { Styles } from "./style";

export function Session({ session }: { session: SessionModel }) {
  const dispatch = useAppDispatch();

  function openSessionGroupTabs(index: number) {
    session.contentIdGroups[index].forEach(contentId => {
      dispatch(openTab({ contentId }));
    });
  }

  function openSessionTabs() {
    session.contentIdGroups.flat().forEach(contentId => {
      dispatch(openTab({ contentId }));
    });
  }

  function deleteSession() {
    dispatch(deleteSessionAction({ sessionId: session.id }));
  }

  function renameSession() {
    const newSessionName = prompt("New session name:", session.name);
    if (newSessionName) {
      dispatch(renameSessionAction({ sessionId: session.id, newSessionName }));
    }
  }

  return (
    <Styles.SessionWrapper>
      <Styles.SessionTitle>
        <Styles.SessionTitleText>
          {session.name ? session.name + " " : ""}
          <Styles.SessionDateTime>
            {formatToJapaneseDate(new Date(session.timestamp))}
          </Styles.SessionDateTime>
        </Styles.SessionTitleText>
        <Styles.ActionButtonsWrapper>
          <Button onClick={renameSession} tooltip="Rename session">
            <Edit />
          </Button>
          <Button onClick={deleteSession} tooltip="Delete session">
            <Delete />
          </Button>
          <Button onClick={openSessionTabs} tooltip="Open session tabs">
            <OpenInNew />
          </Button>
        </Styles.ActionButtonsWrapper>
      </Styles.SessionTitle>
      {session.contentIdGroups.map((group, index) => (
        <Styles.ContentIdsGroupContainer
          key={index}
          setBorder={session.contentIdGroups.length > 1}
        >
          {group.map((contentId, index) => (
            <Styles.ContentId
              key={index}
              onClick={event => {
                event.stopPropagation();
                dispatch(openTab({ contentId }));
              }}
              onAuxClick={() => {
                dispatch(openTab({ contentId }));
              }}
            >
              <ContentIdBadge tabContentType={contentId.type} />
              {contentId.label}
            </Styles.ContentId>
          ))}
          {session.contentIdGroups.length > 1 ? (
            <Button
              onClick={() => openSessionGroupTabs(index)}
              tooltip="Open group tabs"
            >
              <OpenInNew />
            </Button>
          ) : (
            ""
          )}
        </Styles.ContentIdsGroupContainer>
      ))}
    </Styles.SessionWrapper>
  );
}
