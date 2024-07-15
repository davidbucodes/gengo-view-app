import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { Button } from "../../../../common/button/button";
import { ContentId } from "../../../contentId";
import { Styles } from "../../../style";
import { Styles as SessionStyles } from "./style";
import {
  SessionModel,
  SessionUtils,
} from "../../../../../store/utils/sessionUtils";
import {
  clearAllSessions,
  saveSession,
  setSessions,
} from "../../../../../store/slices/sessionsSlice";
import { Session } from "./session";
import { downloadText } from "../../../../../utils/downloadText";
import { forIn } from "lodash";
import { Searchbox } from "../../../../common/searchbox/searchbox";

export function SystemSessionsView() {
  const dispatch = useAppDispatch();
  const [sessionName, setSessionName] = useState<string>("Untitled");
  const [filterSessionsText, setFilterSessionsText] = useState<string>("");
  const [filteredSessions, setFilteredSessions] = useState<SessionModel[]>([]);

  const currentTabGroups = useAppSelector(state => {
    return state.tabs.tabGroups;
  });

  const savedSessions = useAppSelector(state => {
    return state.sessions.savedSessions;
  });

  useEffect(() => {
    if (!filterSessionsText) {
      setFilteredSessions(savedSessions);
    } else {
      const filtered = (savedSessions || []).filter(session => {
        const isNameContainsFilterText = session.name
          .toLowerCase()
          .includes(filterSessionsText.toLowerCase());
        if (isNameContainsFilterText) {
          return true;
        }

        const isSomeLabelContaintsFilterText = session.contentIdGroups
          .flat()
          .some(contentId => contentId.label.includes(filterSessionsText));
        if (isSomeLabelContaintsFilterText) {
          return true;
        }

        return false;
      });
      setFilteredSessions(filtered);
    }
  }, [filterSessionsText, savedSessions]);

  function saveCurrentSession() {
    const currentSession = SessionUtils.sessionFromTabGroups({
      sessionName,
      tabGroups: currentTabGroups,
    });
    console.log(currentSession);
    dispatch(saveSession({ session: currentSession }));
  }

  function downloadSessions() {
    const sessionsDump = SessionUtils.dumpSessions({ sessions: savedSessions });
    downloadText("sessions", sessionsDump, "json");
  }

  function loadSessionsFromText(sessionsDump: string) {
    try {
      const parsedSessions = SessionUtils.readSessionsDump({ sessionsDump });
      dispatch(setSessions({ sessions: parsedSessions }));
    } catch (e) {
      console.error("Cannot parse sessions text");
    }
  }

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target?.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(selectedFile, "utf-8");
      fileReader.onload = loadEvent => {
        loadSessionsFromText(loadEvent.target.result.toString());
      };
    }
  }

  function clearSessions() {
    if (
      confirm("Clearing all of the sessions is unrevertable action. Proceed?")
    ) {
      dispatch(clearAllSessions());
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Styles.Header>Save current session</Styles.Header>
      <Styles.Line>
        Session name (optional):
        <Styles.Textbox
          value={sessionName}
          onChange={event => {
            setSessionName(event.target.value);
          }}
        />
        <Button onClick={saveCurrentSession}>Save</Button>
      </Styles.Line>
      <Styles.Header>
        Previous sessions
        <SessionStyles.ActionButtonsWrapper>
          <Button onClick={downloadSessions}>Download</Button>
          <label htmlFor="import-file">
            <Button>Load</Button>
            <input
              type="file"
              id="import-file"
              accept=".json"
              onChange={onFileInputChange}
              style={{ display: "none" }}
            />
          </label>
          <Button onClick={clearSessions}>Clear All</Button>
        </SessionStyles.ActionButtonsWrapper>
        <Styles.FilterTextbox
          placeholder="Filter sessions..."
          type="search"
          onChange={event => {
            setFilterSessionsText(event.target.value);
          }}
        />
      </Styles.Header>
      <SessionStyles.SessionsList>
        {filteredSessions.map(session => (
          <Session key={session.timestamp} session={session} />
        ))}
      </SessionStyles.SessionsList>
    </div>
  );
}
