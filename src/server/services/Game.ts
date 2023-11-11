import { OnStart, Service } from "@flamework/core";
import { Workspace, Players, ReplicatedStorage } from "@rbxts/services";
import { Networking } from "@flamework/networking";
import { GlobalEvents } from "shared/network";
import { GlobalFunctions } from "shared/network";

export let playing = false;

@Service()
export class GameService implements OnStart {
	onStart(): void {
		Players.PlayerAdded.Connect((p: Player) => {
			const newGui = new Instance("ScreenGui");
			newGui.Parent = p.FindFirstChild("PlayerGui");
			newGui.Name = "StatusGui";
			const newLabel = new Instance("TextLabel");
			newLabel.Parent = newGui;
			newLabel.Name = "StatusText";
			//newLabel.Text = GameService.Status;
			newLabel.Position = new UDim2(0.4, 0, 0, 0);
			newLabel.Size = new UDim2(0.2, 0, 0.1, 0);
			newLabel.TextScaled = true;
			newLabel.BackgroundTransparency = 1;
		});

		Workspace.button.ClickDetector.MouseClick.Connect(() => {
			this.StartGame();
		});
	}
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
		GlobalEvents.server.gamestarted.fire(Players.GetPlayers());
		playing = true;
	}
}
