import { KnitClient as Knit } from "@rbxts/knit";
import { ContextActionService, Players, RunService, Workspace } from "@rbxts/services";

Knit.OnStart().await();
const PlacementService = Knit.GetService("PlacementService");
const block = new Instance("Part");
block.Parent = Workspace;
block.Anchored = true;
block.Name = "jdsds";
block.Size = new Vector3(4, 4, 4);
block.CanCollide = false;
block.Transparency = 0.5;
const mouse = Players.LocalPlayer.GetMouse();
mouse.TargetFilter = block;
function onPlace(actionName: string, userInputState: Enum.UserInputState, input: InputObject) {
	if (userInputState === Enum.UserInputState.Begin) {
		const cf = PlacementService.CalcPlacementCFrame(block.Size, mouse.Hit.Position, 0);
		if (mouse.Target && mouse.Target.Name === "placed") {
			switch (mouse.TargetSurface) {
				case Enum.NormalId.Top: {
					PlacementService.Place(mouse.Target.CFrame.mul(new CFrame(0, 4, 0)), block.Size);
					break;
				}
				case Enum.NormalId.Left: {
					PlacementService.Place(mouse.Target.CFrame.mul(new CFrame(-4, 0, 0)), block.Size);
					break;
				}
				case Enum.NormalId.Right: {
					PlacementService.Place(mouse.Target.CFrame.mul(new CFrame(4, 0, 0)), block.Size);
					break;
				}
				case Enum.NormalId.Bottom: {
					PlacementService.Place(mouse.Target.CFrame.mul(new CFrame(0, -4, 0)), block.Size);
					break;
				}
				case Enum.NormalId.Back: {
					PlacementService.Place(mouse.Target.CFrame.mul(new CFrame(0, 0, 4)), block.Size);
					break;
				}
				case Enum.NormalId.Front: {
					PlacementService.Place(mouse.Target.CFrame.mul(new CFrame(0, 0, -4)), block.Size);
					break;
				}
			}
		} else {
			PlacementService.Place(cf, block.Size);
		}
	}
}
ContextActionService.BindAction("place", onPlace, false, Enum.UserInputType.MouseButton1);
RunService.RenderStepped.Connect(() => {
	const cf = PlacementService.CalcPlacementCFrame(block.Size, mouse.Hit.Position, 0);
	if (mouse.Target && mouse.Target.Name === "placed") {
		switch (mouse.TargetSurface) {
			case Enum.NormalId.Top: {
				block.CFrame = mouse.Target.CFrame.mul(new CFrame(0, 4, 0));
				break;
			}
			case Enum.NormalId.Left: {
				block.CFrame = mouse.Target.CFrame.mul(new CFrame(-4, 0, 0));
				break;
			}
			case Enum.NormalId.Right: {
				block.CFrame = mouse.Target.CFrame.mul(new CFrame(4, 0, 0));
				break;
			}
			case Enum.NormalId.Bottom: {
				block.CFrame = mouse.Target.CFrame.mul(new CFrame(0, -4, 0));
				break;
			}
			case Enum.NormalId.Back: {
				block.CFrame = mouse.Target.CFrame.mul(new CFrame(0, 0, 4));
				break;
			}
			case Enum.NormalId.Front: {
				block.CFrame = mouse.Target.CFrame.mul(new CFrame(0, 0, -4));
				break;
			}
		}
	} else {
		block.CFrame = cf;
	}
});

/*

-- create an object with the constructor
local placement = Placement.new(canvas)

local mouse = game.Players.LocalPlayer:GetMouse()
mouse.TargetFilter = placement.CanvasObjects

local tableModel = furniture.Table:Clone()
tableModel.Parent = mouse.TargetFilter

local rotation = 0

local function onRotate(actionName, userInputState, input)
	if (userInputState == Enum.UserInputState.Begin) then
		rotation = rotation + math.pi/2
	end
end

game:GetService("ContextActionService"):BindAction("rotate", onRotate, false, Enum.KeyCode.R)

game:GetService("RunService").RenderStepped:Connect(function(dt)
	local cf = placement:CalcPlacementCFrame(tableModel, mouse.Hit.p, rotation)
	tableModel:SetPrimaryPartCFrame(cf)
end)
*/
