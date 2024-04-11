import manifest from "@neos-project/neos-ui-extensibility";
import Editor from "./Editor";

manifest("Carbon.Tailwind:Spacing", {}, (globalRegistry) => {
    const editorsRegistry = globalRegistry.get("inspector").get("editors");

    editorsRegistry.set("Carbon.Tailwind/Spacing", {
        component: Editor,
    });
});
