import { ContentId, SystemContentIds } from "../../contentId";
import { SystemAboutView } from "./systemAboutView";
import { SystemNavigationView } from "./systemNavigationView";
import { SystemOptionsView } from "./systemOptionsView";
import { SystemWelcomeView } from "./systemWelcomeView";

export function SystemView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  switch (contentId.id) {
    case SystemContentIds.About:
      return <SystemAboutView contentId={contentId} />;
    case SystemContentIds.NavigationEfficiency:
      return <SystemNavigationView contentId={contentId} />;
    case SystemContentIds.Options:
      return <SystemOptionsView contentId={contentId} />;
    case SystemContentIds.Welcome:
      return <SystemWelcomeView contentId={contentId} />;
  }
}
