import { KnitServer as Knit } from "@rbxts/knit";
import { ServerStorage } from "@rbxts/services";
const modules = (ServerStorage.FindFirstChild("Services") as Folder).GetDescendants();
for (const module of modules) {
	if (module.IsA("ModuleScript")) {
		require(module);
	}
}
Knit.Start()
	.then(() => print("[KNIT] Started on server"))
	.catch(warn);
