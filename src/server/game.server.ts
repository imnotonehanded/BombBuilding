import { Players, Workspace } from "@rbxts/services";
import { KnitServer as Knit } from "@rbxts/knit";

Knit.OnStart().await();
const GameService = Knit.GetService("GameService");

Players.PlayerAdded.Connect((p: Player) => {
	const newGui = new Instance("ScreenGui");
	newGui.Parent = p.FindFirstChild("PlayerGui");
	newGui.Name = "StatusGui";
	const newLabel = new Instance("TextLabel");
	newLabel.Parent = newGui;
	newLabel.Name = "StatusText";
	newLabel.Text = GameService.Status;
	newLabel.Position = new UDim2(0.4, 0, 0, 0);
	newLabel.Size = new UDim2(0.2, 0, 0.1, 0);
	newLabel.TextScaled = true;
	newLabel.BackgroundTransparency = 1;
});

Workspace.button.ClickDetector.MouseClick.Connect(() => {
	GameService.StartGame();
});
