import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	place(cf: CFrame, size: Vector3): void;
}

interface ServerToClientEvents {
	gamestarted(): void;
	gameended(): void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
