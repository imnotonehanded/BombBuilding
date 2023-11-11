import { KnitClient as Knit } from "@rbxts/knit";
import { ReplicatedStorage } from "@rbxts/services";

const controllers = (ReplicatedStorage!.FindFirstChild(`Controllers`) as Folder).GetDescendants();

for (const controller of controllers) {
	if (controller.IsA("ModuleScript")) {
		require(controller);
	}
}
Knit.Start()
	.then(() => print("[KNIT] Started on client"))
	.catch(warn);
