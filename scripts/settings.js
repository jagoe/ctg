import Ctg from "./ctg.js";

export default function registerSettings() {
    game.settings.register(Ctg.ID, "mode", {
        scope: "world",
        config: false,
        type: String,
        default: "initiative",
        onChange: mode => {
            Ctg.log(false, `Mode changed to "${mode}"`);

            // If enabled, sort combatant turns
            if (game.settings.get(Ctg.ID, "sortCombatants")) {
                game.combat.turns = game.combat.turns.sort(Ctg.sortCombatants);
            }

            // Setup the turns again
            game.combat.setupTurns();
            // Re-render the combat tracker
            ui.combat?.render(true);

            // Call hook for mode update
            Hooks.call("ctgModeUpdate", mode);
        },
    });

    game.settings.register(Ctg.ID, "groupSkipping", {
        name: "ctg.settings.groupSkipping.name",
        hint: "ctg.settings.groupSkipping.hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        onChange: value => {
            ui.combat?.render(true);
            game.combat?.update({ turn: 0 });

            if (value && !game.settings.get(Ctg.ID, "sortCombatants"))
                ui.notifications.warn(`${Ctg.ID} ${game.i18n.localize("ctg.notifications.groupSkippingWorksBetterWithSorting")}`);
        },
    });

    game.settings.register(Ctg.ID, "openToggles", {
        name: "ctg.settings.openToggles.name",
        hint: "ctg.settings.openToggles.hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
    });

    game.settings.register(Ctg.ID, "sortCombatants", {
        name: "ctg.settings.sortCombatants.name",
        hint: "ctg.settings.sortCombatants.hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
    });

    game.settings.register(Ctg.ID, "onlyShowGroupsForGM", {
        name: "ctg.settings.onlyShowGroupsForGM.name",
        hint: "ctg.settings.onlyShowGroupsForGM.hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => {
            ui.combat?.render(true);
        },
    });

    game.settings.register(Ctg.ID, "noGroupHidden", {
        name: "ctg.settings.noGroupHidden.name",
        hint: "ctg.settings.noGroupHidden.hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => {
            ui.combat?.render(true);
        },
    });
    game.settings.register(Ctg.ID, "noGroupPCs", {
        name: "ctg.settings.noGroupPCs.name",
        hint: "ctg.settings.noGroupPCs.hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        onChange: () => {
            ui.combat?.render(true);
        },
    });
}