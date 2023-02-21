import { Area, ViewDragArea } from "./tabsGroup";

function inRange(num: number, rangeStart: number, rangeEnd: number) {
  return num >= rangeStart && num <= rangeEnd;
}
export function getViewDragArea(
  event: React.DragEvent<HTMLDivElement>
): ViewDragArea {
  const { currentTarget, clientX, clientY } = event;

  const viewWidth = currentTarget.offsetWidth;
  const viewHeight = currentTarget.offsetHeight;

  const viewArea: Area = {
    topLeftX: currentTarget.offsetLeft,
    topLeftY: currentTarget.offsetTop,
    bottomRightX: currentTarget.offsetLeft + viewWidth,
    bottomRightY: currentTarget.offsetTop + viewHeight,
  };

  const leftDropArea: Area = {
    topLeftX: viewArea.topLeftX,
    topLeftY: viewArea.topLeftY,
    bottomRightX: viewArea.topLeftX + viewWidth / 3,
    bottomRightY: viewArea.bottomRightY,
  };

  const rightDropArea: Area = {
    topLeftX: viewArea.topLeftX + Math.ceil(viewWidth / 3) * 2,
    topLeftY: viewArea.topLeftY,
    bottomRightX: viewArea.bottomRightX,
    bottomRightY: viewArea.bottomRightY,
  };

  const topDropArea: Area = {
    topLeftX: viewArea.topLeftX,
    topLeftY: viewArea.topLeftY,
    bottomRightX: viewArea.bottomRightX,
    bottomRightY: viewArea.topLeftY + viewHeight / 3,
  };

  const bottomDropArea: Area = {
    topLeftX: viewArea.topLeftX,
    topLeftY: viewArea.topLeftY + Math.ceil(viewHeight / 3) * 2,
    bottomRightX: viewArea.bottomRightX,
    bottomRightY: viewArea.bottomRightY,
  };

  const areas: Record<ViewDragArea, Area> = {
    right: rightDropArea,
    left: leftDropArea,
    bottom: bottomDropArea,
    top: topDropArea,
    all: viewArea,
  };

  let areaName: ViewDragArea;
  for (areaName in areas) {
    const area = areas[areaName];
    if (
      inRange(clientX, area.topLeftX, area.bottomRightX) &&
      inRange(clientY, area.topLeftY, area.bottomRightY)
    ) {
      return areaName;
    }
  }
}
