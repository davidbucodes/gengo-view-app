import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionModel, SessionUtils } from "../utils/sessionUtils";
import { KeyValueStorage } from "../../utils/KeyValueStorage";

const SESSIONS_KEY = "SESSIONS_KEY";

export interface SavedSessionsState {
  savedSessions: SessionModel[];
}

function saveSessionsToStorage(sessions: SessionModel[]) {
  const sessionsDump = SessionUtils.dumpSessions({ sessions });
  KeyValueStorage.set(SESSIONS_KEY, sessionsDump);
}

if (!KeyValueStorage.isValueTruthy(SESSIONS_KEY)) {
  saveSessionsToStorage([]);
}

function loadSessionsFromStorage(): SessionModel[] {
  const sessionsFromStorage = SessionUtils.readSessionsDump({
    sessionsDump: KeyValueStorage.get(SESSIONS_KEY),
  });
  return sessionsFromStorage;
}

const initialState: SavedSessionsState = {
  savedSessions: loadSessionsFromStorage(),
};

export const slice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    saveSession: (
      state,
      action: PayloadAction<{
        session: SessionModel;
      }>
    ) => {
      const { session } = action.payload;
      if (session.contentIdGroups.some(group => group.length)) {
        state.savedSessions.unshift(session);
        saveSessionsToStorage(state.savedSessions);
      }
    },
    clearAllSessions: state => {
      state.savedSessions = [];
      saveSessionsToStorage(state.savedSessions);
    },
    setSessions: (
      state,
      action: PayloadAction<{
        sessions: SessionModel[];
      }>
    ) => {
      const { sessions } = action.payload;
      state.savedSessions = sessions;
      saveSessionsToStorage(state.savedSessions);
    },
    deleteSession: (
      state,
      action: PayloadAction<{
        sessionId: SessionModel["id"];
      }>
    ) => {
      state.savedSessions = state.savedSessions.filter(
        session => session.id !== action.payload.sessionId
      );
      saveSessionsToStorage(state.savedSessions);
    },
    renameSession: (
      state,
      action: PayloadAction<{
        sessionId: SessionModel["id"];
        newSessionName: string;
      }>
    ) => {
      const session = state.savedSessions.find(
        session => session.id === action.payload.sessionId
      );
      session.name = action.payload.newSessionName;
      saveSessionsToStorage(state.savedSessions);
    },
  },
});

export const {
  saveSession,
  clearAllSessions,
  setSessions,
  deleteSession,
  renameSession,
} = slice.actions;

export default slice.reducer;
