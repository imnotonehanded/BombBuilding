import { Controller, OnStart, OnInit, OnRender } from "@flamework/core";
import { GlobalEvents } from "shared/network";
import { GlobalFunctions } from "shared/network";
import { Workspace, Players, ContextActionService } from "@rbxts/services";
import { CalcPlacementCFrame } from "shared/placement-calculator";

let playing = false;
let block: Part;
const mouse: Mouse = Players.LocalPlayer.GetMouse();

@Controller()
export class GameController implements OnStart, OnRender {
	onStart() {
		GlobalEvents.client.gamestarted.connect(() => {
			playing = true;
			block = new Instance("Part");
			block.Parent = Workspace;
			block.Anchored = true;
			block.Name = "jdsds";
			block.Size = new Vector3(4, 4, 4);
			block.CanCollide = false;
			block.Transparency = 0.5;
			const mouse = Players.LocalPlayer.GetMouse();
			mouse.TargetFilter = block;
			const onPlace = (actionName: string, userInputState: Enum.UserInputState, input: InputObject) => {
				if (userInputState === Enum.UserInputState.Begin) {
					const cf = CalcPlacementCFrame(Players.LocalPlayer, block.Size, mouse.Hit.Position, 0);
					if (mouse.Target && mouse.Target.Name === "placed") {
						switch (mouse.TargetSurface) {
							case Enum.NormalId.Top: {
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, 4, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Left: {
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(-4, 0, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Right: {
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(4, 0, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Bottom: {
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, -4, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Back: {
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, 0, 4)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Front: {
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, 0, -4)),
									block.Size,
								);
								break;
							}
						}
					} else {
						GlobalEvents.client.place.fire(cf, block.Size);
					}
				}
			};
			ContextActionService.BindAction("place", onPlace, false, Enum.UserInputType.MouseButton1);
		});
		GlobalEvents.client.gameended.connect(() => {
			playing = false;
			block.Destroy();
		});
	}
	onRender(dt: number): void {
		if (playing) {
			const cf = CalcPlacementCFrame(Players.LocalPlayer, block.Size, mouse.Hit.Position, 0);
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
		}
	}
}
