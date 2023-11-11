import { KnitServer as Knit } from "@rbxts/knit";
import Roact from "@rbxts/roact";
import { Players, Workspace, ReplicatedStorage } from "@rbxts/services";
declare global {
	interface KnitServices {
		GameService: typeof GameService;
	}
}
const GameService = Knit.CreateService({
	Name: "GameService",
	Client: {},
	Status: "Starting game in 20",
	CurrentlyPlaying: false,

	StartGame() {
		const players = Players.GetPlayers();
		for (const player of players) {
			const temp_canvas = ReplicatedStorage.canvas.Clone();
			const char: Model = player.Character || player.CharacterAdded.Wait()[0];
			temp_canvas.Name = `${player.Name}_canvas`;
			temp_canvas.Parent = Workspace.canvas;
			const slot = Workspace.slots.GetChildren()[players.indexOf(player)];
			if (slot && slot.IsA("Part")) {
				temp_canvas.MoveTo(slot.Position);
				char.MoveTo(slot.Position.add(new Vector3(0, 5, 0)));
			}
		}
	},
});

export = GameService;
