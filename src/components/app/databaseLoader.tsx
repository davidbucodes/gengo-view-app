import { Styles } from "./style";

export function DatabaseLoader({
  loadingPercentage,
}: {
  loadingPercentage: number;
}) {
  return (
    <Styles.LoadingDatabase>
      <Styles.LoadingDatabaseHeader>GengoView</Styles.LoadingDatabaseHeader>
      <Styles.LoadingDatabaseText>
        Loading database...
      </Styles.LoadingDatabaseText>
      <Styles.BorderLinearProgress
        variant="determinate"
        value={loadingPercentage}
      />
    </Styles.LoadingDatabase>
  );
}
