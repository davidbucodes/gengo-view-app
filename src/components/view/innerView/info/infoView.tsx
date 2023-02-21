import { ContentId, SystemContentIds } from "../../contentId";
import { InfoAboutView } from "./infoAboutView";
import { InfoNavigationView } from "./infoNavigationView";
import { InfoOptionsView } from "./infoOptionsView";
import { InfoWelcomeView } from "./infoWelcomeView";

export function InfoView({
  contentId,
}: {
  contentId: ContentId & { type: "info" };
}) {
  switch (contentId.id) {
    case SystemContentIds.About:
      return <InfoAboutView contentId={contentId} />;
    case SystemContentIds.NavigationEfficiency:
      return <InfoNavigationView contentId={contentId} />;
    case SystemContentIds.Options:
      return <InfoOptionsView contentId={contentId} />;
    case SystemContentIds.Welcome:
      return <InfoWelcomeView contentId={contentId} />;
  }
}
