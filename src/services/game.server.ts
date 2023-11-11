import { KnitServer as Knit } from "@rbxts/knit";
import Attributes from "@rbxts/attributes";
import { Players, Workspace } from "@rbxts/services";

declare global {
	interface KnitServices {
		GameService: typeof GameService;
	}
}
const GameService = Knit.CreateService({
	Name: "GameService",
});

export = GameService;
