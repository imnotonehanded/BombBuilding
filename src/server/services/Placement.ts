import { OnStart, Service } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { GlobalEvents } from "shared/network";

@Service()
export class PlacementService implements OnStart {
	onStart(): void {
		GlobalEvents.server.place.connect((player: Player, pos: CFrame, size: Vector3) => {
			const temp_part = new Instance("Part");
			temp_part.Parent = Workspace;
			temp_part.Size = size;
			temp_part.CFrame = pos;
			temp_part.Anchored = true;
			temp_part.Name = "placed";
		});
	}
}
