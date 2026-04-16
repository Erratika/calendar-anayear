import { calendarAnayear } from "./calendar/CalendarAnayear";

Hooks.once("setup", () => {
  if (!game?.system || game.system.id !== "dnd5e") return;

  // Ensure CONFIG exists
  const dnd5eConfig = CONFIG.DND5E ?? (CONFIG.DND5E = {});

  // Ensure calendars exists
  const calendars = dnd5eConfig.calendars ?? {};

  // ✅ Use imported calendar
  const calendar = calendarAnayear;

  // 🔒 Safety: validate minimal shape
  if (!calendar?.id || !calendar?.label) {
    console.error("Invalid calendar definition:", calendar);
    return;
  }

  // Avoid duplicate registration
  if (!calendars[calendar.id]) {
    dnd5eConfig.calendars = {
      ...calendars,
      [calendar.id]: calendar
    };

    console.log("Registered calendar:", calendar.id);
  }

  // Patch dropdown choices
  const setting = game.settings.settings.get("dnd5e.calendarConfig");

  if (setting?.config) {
    const choices = setting.config.choices ?? {};

    if (!choices[calendar.id]) {
      setting.config.choices = {
        ...choices,
        [calendar.id]: calendar.label
      };

      console.log("Added calendar to dropdown:", calendar.id);
    }
  } else {
    console.warn("calendarConfig setting not found or not ready");
  }
});