import { calendarAnayear } from "./calendar/CalendarAnayear";
Hooks.once("setup", () => {
  console.log("Anayear Calendar | Init");

  if (game?.system?.id !== "dnd5e") return;

  CONFIG.DND5E.calendars = {
    ...(CONFIG.DND5E.calendars ?? {}),
    [calendarAnayear.id]: calendarAnayear
  };

  console.log("Calendar injected early:", CONFIG.DND5E.calendars);
});