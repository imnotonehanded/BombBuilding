import { Controller, OnStart, OnInit, OnRender } from "@flamework/core";
import { GlobalEvents } from "shared/network";
import { GlobalFunctions } from "shared/network";
import { Workspace, Players, ContextActionService } from "@rbxts/services";
import { CalcPlacementCFrame, CalcMatrixCord } from "shared/placement-calculator";
import { Create3DMatrix } from "shared/matrix-generator";

let playing = false;
let block: Part;
const mouse: Mouse = Players.LocalPlayer.GetMouse();
let currentMatrix = Create3DMatrix();

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
					const matrixCord = CalcMatrixCord(Players.LocalPlayer, block.Size, mouse.Hit.Position, 0);
					if (mouse.Target && mouse.Target.Name === "placed") {
						switch (mouse.TargetSurface) {
							case Enum.NormalId.Top: {
								print(
									`X: ${matrixCord.X - 1} Y: ${
										math.floor(mouse.Target.CFrame.mul(new CFrame(0, 4, 0)).Y) / 4 - 1
									} Z: ${matrixCord.Y - 1}`,
								);
								currentMatrix[matrixCord.X - 1][
									math.floor(mouse.Target.CFrame.mul(new CFrame(0, 4, 0)).Y) / 4 - 1
								][matrixCord.Y - 1] = 1;
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, 4, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Left: {
								print("left");
								print(
									`X: ${matrixCord.X - 1} Y: ${
										math.floor(mouse.Target.CFrame.mul(new CFrame(-4, 0, 0)).Y) / 4 - 1
									} Z: ${matrixCord.Y - 1}`,
								);
								currentMatrix[matrixCord.X - 1][
									math.floor(mouse.Target.CFrame.mul(new CFrame(-4, 0, 0)).Y) / 4 - 1
								][matrixCord.Y - 1] = 1;
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(-4, 0, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Right: {
								print(
									`X: ${matrixCord.X} Y: ${
										math.floor(mouse.Target.CFrame.mul(new CFrame(4, 0, 0)).Y) / 4 - 1
									} Z: ${matrixCord.Y - 1}`,
								);
								currentMatrix[matrixCord.X - 1][
									math.floor(mouse.Target.CFrame.mul(new CFrame(4, 0, 0)).Y) / 4 - 1
								][matrixCord.Y - 1] = 1;
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(4, 0, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Bottom: {
								print(
									`X: ${matrixCord.X - 1} Y: ${
										math.floor(mouse.Target.CFrame.mul(new CFrame(0, -4, 0)).Y) / 4 - 1
									} Z: ${matrixCord.Y - 1}`,
								);
								currentMatrix[matrixCord.X - 1][
									math.floor(mouse.Target.CFrame.mul(new CFrame(0, -4, 0)).Y) / 4 - 1
								][matrixCord.Y - 1] = 1;
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, -4, 0)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Back: {
								print(
									`X: ${matrixCord.X - 1} Y: ${
										math.floor(mouse.Target.CFrame.mul(new CFrame(0, 0, 4)).Y) / 4 - 1
									} Z: ${matrixCord.Y - 1}`,
								);
								currentMatrix[matrixCord.X - 1][
									math.floor(mouse.Target.CFrame.mul(new CFrame(0, 0, 4)).Y) / 4 - 1
								][matrixCord.Y - 1] = 1;
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, 0, 4)),
									block.Size,
								);
								break;
							}
							case Enum.NormalId.Front: {
								print(
									`X: ${matrixCord.X - 1} Y: ${
										math.floor(mouse.Target.CFrame.mul(new CFrame(0, 0, -4)).Y) / 4 - 1
									} Z: ${matrixCord.Y - 1}`,
								);
								currentMatrix[matrixCord.X - 1][
									math.floor(mouse.Target.CFrame.mul(new CFrame(0, 0, -4)).Y) / 4 - 1
								][matrixCord.Y - 1] = 1;
								GlobalEvents.client.place.fire(
									mouse.Target.CFrame.mul(new CFrame(0, 0, -4)),
									block.Size,
								);
								break;
							}
						}
					} else {
						print(`X: ${matrixCord.X - 1} Y: ${math.floor(cf.Y) / 4 - 1} Z: ${matrixCord.Y - 1}`);
						currentMatrix[matrixCord.X - 1][math.floor(cf.Y) / 4 - 1][matrixCord.Y - 1] = 1;
						GlobalEvents.client.place.fire(cf, block.Size);
					}

					print(currentMatrix);
				}
			};
			ContextActionService.BindAction("place", onPlace, false, Enum.UserInputType.MouseButton1);
		});
		GlobalEvents.client.gameended.connect(() => {
			playing = false;
			currentMatrix = Create3DMatrix();
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
